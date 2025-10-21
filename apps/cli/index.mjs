#!/usr/bin/env zx
import { setup } from './internal.mjs'
import { createPost } from './post.mjs'
import { createMemo } from './memo.mjs'


setup({
  actions: [
    createPost,
    createMemo,
  ],
});

