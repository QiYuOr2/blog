import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SKILL_VERSION = '1.0.4'
const WEREAD_API_URL = 'https://i.weread.qq.com/api/agent/gateway'
const MODES = ['weekly', 'monthly', 'annually', 'overall']

const scriptRoot = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptRoot, '../..')
const dataDir = path.join(repoRoot, 'content', 'weread')
const outputFile = path.join(dataDir, 'weread.json')

async function postApi(body) {
  const apiKey = process.env.WEREAD_API_KEY
  if (!apiKey) {
    throw new Error('WEREAD_API_KEY 未设置，请在构建环境中配置该环境变量。')
  }

  const res = await fetch(WEREAD_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  const json = await res.json()
  if (!res.ok || (json.errcode && json.errcode !== 0)) {
    throw new Error(`微信读书接口请求失败，api=${body.api_name}, 错误：${json.errmsg || JSON.stringify(json)}`)
  }

  return json
}

async function fetchMode(mode) {
  return postApi({
    api_name: '/readdata/detail',
    mode,
    skill_version: SKILL_VERSION,
  })
}

async function fetchShelf() {
  return postApi({
    api_name: '/shelf/sync',
    skill_version: SKILL_VERSION,
  })
}

async function fetchBookProgress(bookId) {
  return postApi({
    api_name: '/book/getprogress',
    bookId,
    skill_version: SKILL_VERSION,
  })
}

async function main() {
  await fs.mkdir(dataDir, { recursive: true })

  const result = {
    updatedAt: new Date().toISOString(),
    modes: {},
    shelf: {},
    progressMap: {},
  }

  for (const mode of MODES) {
    process.stdout.write(`Fetching WeRead data for mode=${mode}... `)
    const data = await fetchMode(mode)
    result.modes[mode] = data
    process.stdout.write('done\n')
  }

  process.stdout.write('Fetching shelf data... ')
  const shelfData = await fetchShelf()
  result.shelf = shelfData
  process.stdout.write('done\n')

  const books = Array.isArray(shelfData.books) ? shelfData.books : []
  for (const book of books) {
    if (!book?.bookId) continue
    process.stdout.write(`Fetching progress for bookId=${book.bookId}... `)
    const bookProgress = await fetchBookProgress(book.bookId)
    result.progressMap[book.bookId] = bookProgress.book ?? bookProgress
    process.stdout.write('done\n')
  }

  await fs.writeFile(outputFile, JSON.stringify(result, null, 2), 'utf-8')
  console.log(`Saved WeRead data to ${path.relative(repoRoot, outputFile)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
