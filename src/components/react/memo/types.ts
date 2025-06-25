export enum MemoType {
  Text = 'text',
  Image = 'image',
  TextImage = 'text_image'
}

export interface PreviewLink {
  title: string
  href: string
  description?: string
  cover?: string
}

export interface MemoVO {
  timestamp: number
  type: MemoType
  content: string | string[]
  link?: string | PreviewLink
  create_at: Date
}
