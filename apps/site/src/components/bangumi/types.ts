
export enum CollectionType {
  Wish = 1,
  Collect = 2,
  Doing = 3,
  OnHold = 4,
  Dropped = 5
}

export enum SubjectType {
  Book = 1,
  Anime = 2
}

export interface Subject {
  date: string
  images: { 
    small: string
    grid: string
    large: string
    medium: string
    common: string
  }
  name: string
  name_cn: string
  score: number
  rank: number
  id: number
}

export interface CollectionItem {
  updated_at: string
  subject: Subject
  type: CollectionType
}

export interface CollectionsDTO {
  data: CollectionItem[]
  total: number
  limit: number
  offset: number
}