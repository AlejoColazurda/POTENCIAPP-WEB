import type { Locale } from "@/i18n/routing"

export type BlogCategory =
  | "ai-agents"
  | "mobile-apps"
  | "web-engineering"
  | "automation"
  | "startups-scale"

export interface CategoryInfo {
  id: BlogCategory
  label: string
  labelShort: string
  description: string
  color: string
}

export interface Author {
  name: string
  role: string
  avatar: string
  isAgent: boolean
  handle?: string
  bio?: string
}

export interface StoryCardConfig {
  headline: string
  tagline: string
  quote?: string
  accentColor?: string
  badgeText?: string
  stickers?: string[]
}

export interface SocialSyndicationTargets {
  twitter?: boolean
  linkedin?: boolean
  discord?: boolean
  reddit?: boolean
  instagram?: boolean
  facebook?: boolean
}

export interface BlogPost {
  slug: string
  locale: Locale
  title: string
  summary: string
  content: string
  coverImage: string
  category: BlogCategory
  tags: string[]
  publishedAt: string // ISO Date String
  updatedAt?: string
  readingTime: string
  author: Author
  featured?: boolean
  status: "draft" | "published"
  viewsCount?: number
  storyCard: StoryCardConfig
  syndication?: SocialSyndicationTargets
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    canonicalUrl?: string
  }
}

export interface BlogFilterOptions {
  category?: BlogCategory | "all"
  searchQuery?: string
  tag?: string
  locale?: Locale
}
