import assert from "node:assert/strict";
import test from "node:test";
import {
  NAVBAR_ROUTES,
  getActiveNavIndex,
  getSkeletonKind,
  isRouteActive,
  normalizePathname,
  resolvePageTransitionDirection,
} from "./navigation.ts";

test("normalizePathname trims trailing slashes and preserves root", () => {
  assert.equal(normalizePathname("/"), "/");
  assert.equal(normalizePathname(""), "/");
  assert.equal(normalizePathname("/memo/"), "/memo");
  assert.equal(normalizePathname("/weread/highlights///"), "/weread/highlights");
});

test("getActiveNavIndex maps top-level and subpages to their navbar index", () => {
  assert.equal(getActiveNavIndex("/"), 0);
  assert.equal(getActiveNavIndex("/2026/simple_go_agent"), 0);
  assert.equal(getActiveNavIndex("/memo"), 1);
  assert.equal(getActiveNavIndex("/memo/1700000000"), 1);
  assert.equal(getActiveNavIndex("/bgm"), 2);
  assert.equal(getActiveNavIndex("/weread"), 3);
  assert.equal(getActiveNavIndex("/weread/highlights"), 3);
  assert.equal(getActiveNavIndex("/about"), 4);
  // 前缀相似但非子路径不误匹配 /memo
  assert.equal(getActiveNavIndex("/memorandum"), 0);
});

test("isRouteActive highlights the matching navbar route only", () => {
  const activeForHighlights = NAVBAR_ROUTES.filter((route) =>
    isRouteActive("/weread/highlights/", route),
  ).map((route) => route.path);
  assert.deepEqual(activeForHighlights, ["/weread"]);

  const activeForPost = NAVBAR_ROUTES.filter((route) =>
    isRouteActive("/2025/ai_agent_what", route),
  ).map((route) => route.path);
  assert.deepEqual(activeForPost, ["/"]);
});

test("switching navbar tabs slides according to navbar order", () => {
  // 向右切换：旧页向左退出，新页从右进入（forward）
  assert.equal(resolvePageTransitionDirection("/", "/memo"), "forward");
  assert.equal(resolvePageTransitionDirection("/memo", "/about"), "forward");
  assert.equal(resolvePageTransitionDirection("/2025/ai_agent_what", "/weread"), "forward");

  // 向左切换：旧页向右退出，新页从左进入（back）
  assert.equal(resolvePageTransitionDirection("/about", "/"), "back");
  assert.equal(resolvePageTransitionDirection("/weread", "/bgm"), "back");
  assert.equal(resolvePageTransitionDirection("/weread/highlights", "/memo"), "back");

  // 即使通过浏览器后退触发，跨 navbar 仍遵循 navbar 空间顺序
  assert.equal(resolvePageTransitionDirection("/", "/about", "back"), "forward");
  assert.equal(resolvePageTransitionDirection("/about", "/", "forward"), "back");
});

test("staying within the same navbar tab uses vertical cross-fade", () => {
  // 列表 -> 详情（更深层）
  assert.equal(resolvePageTransitionDirection("/", "/2026/simple_go_agent"), "vertical-up");
  assert.equal(resolvePageTransitionDirection("/memo", "/memo/1700000000"), "vertical-up");
  assert.equal(resolvePageTransitionDirection("/weread", "/weread/highlights"), "vertical-up");

  // 详情 -> 列表（更浅层）
  assert.equal(resolvePageTransitionDirection("/2026/simple_go_agent", "/"), "vertical-down");
  assert.equal(resolvePageTransitionDirection("/memo/1700000000", "/memo"), "vertical-down");
  assert.equal(resolvePageTransitionDirection("/weread/highlights", "/weread"), "vertical-down");

  // 同层二级页切换（如文章上一篇/下一篇、浏览器前进/后退）
  assert.equal(
    resolvePageTransitionDirection("/2025/post-a", "/2025/post-b", "forward"),
    "vertical-up",
  );
  assert.equal(
    resolvePageTransitionDirection("/2025/post-b", "/2025/post-a", "back"),
    "vertical-down",
  );
});

test("getSkeletonKind picks matching skeleton layout per route", () => {
  assert.equal(getSkeletonKind("/"), "posts");
  assert.equal(getSkeletonKind("/memo/"), "memo");
  assert.equal(getSkeletonKind("/bgm"), "grid");
  assert.equal(getSkeletonKind("/weread"), "grid");
  assert.equal(getSkeletonKind("/weread/highlights"), "highlights");
  assert.equal(getSkeletonKind("/about"), "article");
  assert.equal(getSkeletonKind("/2026/simple_go_agent"), "article");
  assert.equal(getSkeletonKind("/memo/1794093203000"), "article");
});
