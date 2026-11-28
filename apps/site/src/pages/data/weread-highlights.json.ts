import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import {
  getHighlights,
  getWereadStaticData,
  slimWereadHighlights,
} from "@/features/weread/model";

export const GET: APIRoute = async () => {
  const wereadData = getWereadStaticData(await getCollection("weread"));
  const highlights = slimWereadHighlights(getHighlights(wereadData));
  return new Response(JSON.stringify(highlights), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
