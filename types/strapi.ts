// Strapi API Response types
export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiEntity {
  id: number
  attributes: Record<string, any>
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

// User types
export interface User {
  id: number
  username: string
  email: string
  name: string
  role: 'admin' | 'business' | 'user'
  phone?: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  jwt: string
  user: User
}

// Business types
export interface Business {
  id: number
  name: string
  slug: string
  description?: string
  logo?: StrapiMedia
  email?: string
  phone?: string
  website?: string
  address?: string
  city?: string
  district?: string
  postalCode?: string
  latitude?: number
  longitude?: number
  operatingHours?: Record<string, any>
  socialMedia?: Record<string, any>
  status: 'pending' | 'approved' | 'rejected'
  isFeatured: boolean
  featuredUntil?: string
  views: number
  metaTitle?: string
  metaDescription?: string
  aiKeywords?: Record<string, any>
  aiFaq?: Record<string, any>
  owner: User
  categories: Category[]
  images: BusinessImage[]
  contactMessages?: ContactMessage[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface BusinessInput {
  name: string
  description?: string
  email?: string
  phone?: string
  website?: string
  address?: string
  city?: string
  district?: string
  postalCode?: string
  latitude?: number
  longitude?: number
  operatingHours?: Record<string, any>
  socialMedia?: Record<string, any>
  metaTitle?: string
  metaDescription?: string
  categories?: number[]
}

// Category types
export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  parentCategory?: Category
  childCategories?: Category[]
  order: number
  isActive: boolean
  metaTitle?: string
  metaDescription?: string
  businesses?: Business[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface CategoryInput {
  name: string
  slug?: string
  description?: string
  parentCategory?: number
  order?: number
  isActive?: boolean
  metaTitle?: string
  metaDescription?: string
}

// Business Image types
export interface BusinessImage {
  id: number
  image: StrapiMedia
  caption?: string
  order: number
  isPrimary: boolean
  business: Business
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface BusinessImageInput {
  image: number
  caption?: string
  order?: number
  isPrimary?: boolean
  business: number
}

// Contact Message types
export interface ContactMessage {
  id: number
  name: string
  email: string
  phone?: string
  message: string
  ipAddress?: string
  isRead: boolean
  business: Business
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface ContactMessageInput {
  name: string
  email: string
  phone?: string
  message: string
  business: number
}

// Media types
export interface StrapiMedia {
  id: number
  name: string
  alternativeText?: string
  caption?: string
  width?: number
  height?: number
  formats?: Record<string, MediaFormat>
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: string
  provider: string
  provider_metadata?: any
  createdAt: string
  updatedAt: string
}

export interface MediaFormat {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  path?: string
  url: string
}

// Filter and query types
export interface StrapiFilters {
  [key: string]: any
}

export interface StrapiSort {
  field: string
  order: 'asc' | 'desc'
}

export interface StrapiPagination {
  page?: number
  pageSize?: number
  start?: number
  limit?: number
}

export interface StrapiQueryParams {
  filters?: StrapiFilters
  sort?: string | string[] | StrapiSort[]
  pagination?: StrapiPagination
  populate?: string | string[] | Record<string, any>
  fields?: string[]
  locale?: string
  publicationState?: 'live' | 'preview'
}

// Helper types for API responses
export type BusinessResponse = StrapiResponse<Business[]>
export type SingleBusinessResponse = StrapiResponse<Business>
export type CategoryResponse = StrapiResponse<Category[]>
export type SingleCategoryResponse = StrapiResponse<Category>
export type ContactMessageResponse = StrapiResponse<ContactMessage[]>
export type SingleContactMessageResponse = StrapiResponse<ContactMessage>

// Type helpers for populated relations
export type BusinessWithCategories = Business & {
  categories: Category[]
  images: BusinessImage[]
}

export type CategoryWithChildren = Category & {
  childCategories: Category[]
  businesses?: Business[]
}

export type CategoryWithParent = Category & {
  parentCategory?: Category
}