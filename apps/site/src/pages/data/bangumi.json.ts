import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getBangumiStaticData } from "@/features/bangumi/model";

export const GET: APIRoute = async () => {
  const bangumiCache = getBangumiStaticData(await getCollection("bangumi"));
  return new Response(JSON.stringify(bangumiCache), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
