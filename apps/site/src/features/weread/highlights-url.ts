import { createHash } from "node:crypto";
import type { WereadStaticData } from "./schema";
import { getHighlights, slimWereadHighlights } from "./model";

/** 基于实际下发给客户端的 slim 书摘内容计算版本哈希，保证页面与接口缓存口径一致。 */
export function buildHighlightsUrl(data: WereadStaticData): { url: string; count: number } {
  const slim = slimWereadHighlights(getHighlights(data));
  const version = createHash("sha1").update(JSON.stringify(slim)).digest("hex").slice(0, 8);
  return {
    url: `/data/weread-highlights.json?v=${version}`,
    count: slim.length,
  };
}
