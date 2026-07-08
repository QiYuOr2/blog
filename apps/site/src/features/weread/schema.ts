import { z } from 'astro/zod'

const wereadBookSchema = z.object({
  bookId: z.string().optional(),
  title: z.string().optional(),
  author: z.string().optional(),
  translator: z.string().optional(),
  intro: z.string().optional(),
  cover: z.string().optional(),
  version: z.number().optional(),
  format: z.string().optional(),
  type: z.number().optional(),
  soldout: z.number().optional(),
  bookStatus: z.number().optional(),
  payType: z.number().optional(),
  finished: z.number().optional(),
}).passthrough()

const wereadReadItemSchema = z.object({
  book: wereadBookSchema.optional(),
  albumInfo: z.object({
    title: z.string().optional(),
    cover: z.string().optional(),
  }).optional(),
  readTime: z.number().optional(),
  tags: z.array(z.string()).optional(),
}).passthrough()

const wereadRankSchema = z.object({
  text: z.string().optional(),
  scheme: z.string().optional(),
}).passthrough()

const wereadModeSchema = z.object({
  errcode: z.number().optional(),
  errmsg: z.string().optional(),
  baseTime: z.number().optional(),
  compare: z.number().optional(),
  readLongest: z.array(wereadReadItemSchema).optional(),
  readStat: z.array(z.any()).optional(),
  preferCategory: z.array(z.object({
    categoryTitle: z.string().optional(),
    readingTime: z.number().optional(),
    readingCount: z.number().optional(),
  })).optional(),
  preferCategoryWord: z.string().optional(),
  preferTimeWord: z.string().optional(),
  preferTime: z.array(z.any()).optional(),
  preferAuthor: z.array(z.object({
    name: z.string().optional(),
    readTime: z.string().optional(),
  })).optional(),
  preferPublisher: z.array(z.object({
    name: z.string().optional(),
    count: z.number().optional(),
  })).optional(),
  medals: z.array(z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  rank: wereadRankSchema.optional(),
  registTime: z.number().optional(),
  dayAverageReadTime: z.number().optional(),
  totalReadTime: z.number().optional(),
  readDistributionWord: z.string().optional(),
  preferBooks: z.array(z.any()).optional(),
  readRecordsWord: z.string().optional(),
}).passthrough()

const wereadShelfBookSchema = z.object({
  bookId: z.string().optional(),
  title: z.string().optional(),
  cover: z.string().optional(),
  deepLink: z.string().optional(),
  finishReading: z.number().optional(),
  readUpdateTime: z.number().optional(),
}).passthrough()

const wereadShelfAlbumSchema = z.object({
  albumInfo: z.object({
    albumId: z.string().optional(),
    name: z.string().optional(),
    cover: z.string().optional(),
    authorName: z.string().optional(),
    finishStatus: z.string().optional(),
    finish: z.number().optional(),
    lectureReadUpdateTime: z.number().optional(),
  }).passthrough(),
}).passthrough()

const wereadShelfSchema = z.object({
  books: z.array(wereadShelfBookSchema).optional(),
  albums: z.array(wereadShelfAlbumSchema).optional(),
  mp: z.any().optional(),
}).passthrough()

const wereadProgressEntrySchema = z.object({
  progress: z.number().optional(),
  readingTime: z.number().optional(),
  readTime: z.number().optional(),
  recordReadingTime: z.number().optional(),
  finishTime: z.number().optional(),
  updateTime: z.number().optional(),
}).passthrough()

export const wereadSchema = z.object({
  updatedAt: z.string(),
  modes: z.object({
    weekly: wereadModeSchema,
    monthly: wereadModeSchema,
    annually: wereadModeSchema,
    overall: wereadModeSchema,
  }),
  shelf: wereadShelfSchema.optional(),
  progressMap: z.record(z.string(), wereadProgressEntrySchema).optional(),
}).passthrough()

export type ReadMode = 'weekly' | 'monthly' | 'annually' | 'overall'
export type ReadLongestItem = z.infer<typeof wereadReadItemSchema>
export type WereadModeData = z.infer<typeof wereadModeSchema>
export type WereadShelfBook = z.infer<typeof wereadShelfBookSchema>
export type WereadShelfAlbum = z.infer<typeof wereadShelfAlbumSchema>
export type WereadStaticData = z.infer<typeof wereadSchema>
