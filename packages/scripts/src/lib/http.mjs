import http from "node:http";
import https from "node:https";
import net from "node:net";
import tls from "node:tls";
import { sleep } from "./async.mjs";

const MAX_RETRIES = 2;

// 读取代理。Node 内置 fetch(undici) 默认不读 HTTP_PROXY / HTTPS_PROXY，
// 因此这里自己实现一个走代理的 https 请求层。仅支持 http:// 代理；
// https:// 代理需要额外的 TLS 层，暂不处理。
function getProxyUrl() {
  const raw =
    process.env.HTTPS_PROXY ||
    process.env.https_proxy ||
    process.env.HTTP_PROXY ||
    process.env.http_proxy;
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:") {
      console.warn(`[http] 仅支持 http:// 代理，忽略 ${url.protocol}//${url.host}`);
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

// 判断目标 host 是否命中 NO_PROXY。
function isNoProxy(hostname) {
  const raw = process.env.NO_PROXY || process.env.no_proxy;
  if (!raw) return false;
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .some((entry) => {
      if (entry === "*") return true;
      const normalized = entry.toLowerCase().replace(/^\./, "");
      const host = hostname.toLowerCase();
      if (normalized.includes(":")) return host === normalized.split(":")[0];
      return host === normalized || host.endsWith("." + normalized);
    });
}

// 通过 HTTP CONNECT 隧道访问 HTTPS 目标的自定义 Agent。
class ProxyHttpsAgent extends https.Agent {
  constructor(proxy) {
    super();
    this.proxy = proxy;
  }

  createConnection(options, callback) {
    const targetHost = options.host;
    const targetPort = options.port || 443;
    const proxyHost = this.proxy.hostname;
    const proxyPort = Number(this.proxy.port) || 80;
    const socket = net.connect({ host: proxyHost, port: proxyPort });
    let settled = false;

    const fail = (err) => {
      if (settled) return;
      settled = true;
      callback(err);
    };

    socket.once("connect", () => {
      socket.write(
        `CONNECT ${targetHost}:${targetPort} HTTP/1.1\r\n` +
          `Host: ${targetHost}:${targetPort}\r\n` +
          `Proxy-Connection: keep-alive\r\n\r\n`,
      );
    });

    let buffer = "";
    const onData = (chunk) => {
      buffer += chunk.toString("latin1");
      const end = buffer.indexOf("\r\n\r\n");
      if (end === -1) return;
      socket.removeListener("data", onData);
      const statusLine = buffer.slice(0, end).split("\r\n")[0] || "";
      const status = Number(statusLine.split(" ")[1]);
      if (status !== 200) {
        socket.destroy();
        fail(new Error(`代理 CONNECT 失败: ${statusLine}`));
        return;
      }
      const tlsSocket = tls.connect({ socket, servername: targetHost });
      tlsSocket.once("error", fail);
      tlsSocket.once("secureConnect", () => {
        settled = true;
        callback(null, tlsSocket);
      });
    };

    socket.on("data", onData);
    socket.once("error", fail);
  }
}

/**
 * 创建一个 GET 取 JSON 的客户端（带代理支持与重试）。
 * 429/5xx 会按 retryDelayMs 的倍数退避重试，单次请求超过 timeoutMs 视为超时。
 */
export function createJsonClient({
  userAgent,
  timeoutMs = 30_000,
  retryDelayMs = 300,
  maxRetries = MAX_RETRIES,
}) {
  function requestJson(url, retries = maxRetries) {
    return new Promise((resolve, reject) => {
      const attempt = (remaining) => {
        const target = new URL(url);
        const proxy = getProxyUrl();
        const useProxy =
          proxy && target.protocol === "https:" && !isNoProxy(target.hostname);
        const agent = useProxy ? new ProxyHttpsAgent(proxy) : undefined;
        const transport = target.protocol === "https:" ? https : http;

        const req = transport.request(
          target,
          {
            method: "GET",
            agent,
            headers: {
              "User-Agent": userAgent,
              Accept: "application/json",
            },
          },
          (res) => {
            const chunks = [];
            res.on("data", (chunk) => chunks.push(chunk));
            res.on("end", async () => {
              const body = Buffer.concat(chunks).toString("utf8");
              const status = res.statusCode || 0;

              if (status === 429 || status >= 500) {
                if (remaining > 0) {
                  await sleep(retryDelayMs * 2);
                  attempt(remaining - 1);
                  return;
                }
                reject(new Error(`接口返回 ${status}, url=${url}`));
                return;
              }
              if (status < 200 || status >= 300) {
                reject(new Error(`接口请求失败, url=${url}, status=${status}`));
                return;
              }
              try {
                resolve(JSON.parse(body));
              } catch {
                reject(new Error(`接口返回非法 JSON, url=${url}`));
              }
            });
          },
        );

        req.setTimeout(timeoutMs, () => {
          req.destroy(
            new Error(`接口请求超过 ${timeoutMs / 1000}s 超时, url=${url}`),
          );
        });
        req.once("error", (err) => reject(err));
        req.end();
      };

      attempt(retries);
    });
  }

  return { requestJson };
}
