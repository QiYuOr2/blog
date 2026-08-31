import fs from "node:fs/promises";
import http from "node:http";
import https from "node:https";
import net from "node:net";
import path from "node:path";
import tls from "node:tls";
import { fileURLToPath } from "node:url";

const scriptRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptRoot, "../..");
const dataDir = path.join(repoRoot, "content", "bangumi");
const outputFile = path.join(dataDir, "bangumi.json");

const USERNAME = process.env.BGM_USERNAME || "qiyuor2";
const API_BASE = process.env.BGM_API_BASE || "https://api.bgm.tv";
const SUBJECT_TYPE = 2; // 2 = 动画
const LIMIT = Number(process.env.BGM_LIMIT || 50);
// 单次 bgm 接口请求超过该毫秒数即视为超时（默认 30s）。
const TIMEOUT_MS = Number(process.env.BGM_TIMEOUT_MS || 30_000);
// 请求间间隔，避免触发 bgm 接口限流。
const REQUEST_DELAY_MS = Number(process.env.BGM_REQUEST_DELAY_MS || 300);
const USER_AGENT =
  "Mozilla/5.0 (compatible; qiyuor2-blog-bangumi-cache/1.0)";

// bgm 的收藏类型：1 想看 / 2 看过 / 3 在看 / 4 搁置 / 5 抛弃
const COLLECTION_TYPES = [1, 2, 3, 4, 5];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 读取代理。Node 内置 fetch(undici) 默认不读 HTTP_PROXY / HTTPS_PROXY，
// 因此这里自己实现一个走代理的 https 请求层。仅支持 http:// 代理；https://
// 代理需要额外的 TLS 层，暂不处理。
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
      console.warn(
        `[fetch-bangumi] 仅支持 http:// 代理，忽略 ${url.protocol}//${url.host}`,
      );
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

// 发起 GET 请求并解析 JSON；429/5xx 自动重试，单次超过 TIMEOUT_MS 视为超时。
function requestJson(url, retry = 2) {
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
            "User-Agent": USER_AGENT,
            Accept: "application/json",
          },
        },
        (res) => {
          const chunks = [];
          res.on("data", (chunk) => chunks.push(chunk));
          res.on("end", () => {
            const body = Buffer.concat(chunks).toString("utf8");
            const status = res.statusCode || 0;
            if ((status === 429 || status >= 500) && remaining > 0) {
              setTimeout(() => attempt(remaining - 1), REQUEST_DELAY_MS * 2);
              return;
            }
            if (status === 429 || status >= 500) {
              reject(new Error(`bgm 接口返回 ${status}`));
              return;
            }
            if (status < 200 || status >= 300) {
              reject(
                new Error(`bgm 接口请求失败, url=${url}, status=${status}`),
              );
              return;
            }
            try {
              resolve(JSON.parse(body));
            } catch {
              reject(new Error(`bgm 接口返回非法 JSON, url=${url}`));
            }
          });
        },
      );
      req.setTimeout(TIMEOUT_MS, () => {
        req.destroy(
          new Error(`bgm 接口请求超过 ${TIMEOUT_MS / 1000}s 超时, url=${url}`),
        );
      });
      req.once("error", (err) => reject(err));
      req.end();
    };
    attempt(retry);
  });
}

function apiUrl(type, offset, limit) {
  return (
    `${API_BASE}/v0/users/${USERNAME}/collections` +
    `?subject_type=${SUBJECT_TYPE}&type=${type}&offset=${offset}&limit=${limit}`
  );
}

async function fetchCollection(type) {
  const items = [];
  let offset = 0;
  let total = 0;

  do {
    const dto = await requestJson(apiUrl(type, offset, LIMIT));
    total = Number(dto.total ?? 0);
    const pageItems = Array.isArray(dto.data) ? dto.data : [];
    items.push(...pageItems);
    offset += LIMIT;
    process.stdout.write(
      `type=${type} offset=${offset} loaded=${items.length}/${total}... `,
    );
    if (pageItems.length === 0) break;
    if (items.length < total) await sleep(REQUEST_DELAY_MS);
  } while (items.length < total);

  process.stdout.write("done\n");
  return { total, items };
}

async function main() {
  await fs.mkdir(dataDir, { recursive: true });

  const result = {
    updatedAt: new Date().toISOString(),
    username: USERNAME,
    subjectType: SUBJECT_TYPE,
    types: {},
  };

  for (const type of COLLECTION_TYPES) {
    process.stdout.write(`Fetching bangumi collection type=${type}... `);
    const { total, items } = await fetchCollection(type);
    // 保留原始条数，便于前端在回退时继续做分页。
    result.types[String(type)] = { total, items };
  }

  await fs.writeFile(outputFile, JSON.stringify(result, null, 2), "utf-8");
  console.log(`Saved bangumi data to ${path.relative(repoRoot, outputFile)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
