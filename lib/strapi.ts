import axios from 'axios'
import qs from 'qs'

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

// Create axios instance with default config
export const strapi = axios.create({
  baseURL: `${strapiUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include JWT token
strapi.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Helper function to build Strapi query parameters
export function buildStrapiQuery(params: Record<string, any>) {
  return qs.stringify(params, {
    encodeValuesOnly: true,
  })
}

// Authentication helpers
export const auth = {
  async login(identifier: string, password: string) {
    const { data } = await strapi.post('/auth/local', {
      identifier,
      password,
    })
    
    if (typeof window !== 'undefined' && data.jwt) {
      localStorage.setItem('jwt', data.jwt)
      localStorage.setItem('user', JSON.stringify(data.user))
    }
    
    return data
  },

  async register(username: string, email: string, password: string, name: string) {
    const { data } = await strapi.post('/auth/local/register', {
      username,
      email,
      password,
      name,
    })
    
    if (typeof window !== 'undefined' && data.jwt) {
      localStorage.setItem('jwt', data.jwt)
      localStorage.setItem('user', JSON.stringify(data.user))
    }
    
    return data
  },

  async me() {
    const { data } = await strapi.get('/users/me?populate=*')
    return data
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt')
      localStorage.removeItem('user')
    }
  },

  getUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user')
      return user ? JSON.parse(user) : null
    }
    return null
  },

  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jwt')
    }
    return null
  }
}

// Business API helpers
export const businessApi = {
  async getAll(params?: Record<string, any>) {
    const query = params ? `?${buildStrapiQuery(params)}` : ''
    const { data } = await strapi.get(`/businesses${query}`)
    return data
  },

  async getById(id: string, params?: Record<string, any>) {
    const query = params ? `?${buildStrapiQuery(params)}` : ''
    const { data } = await strapi.get(`/businesses/${id}${query}`)
    return data
  },

  async getBySlug(slug: string, params?: Record<string, any>) {
    const query = buildStrapiQuery({
      filters: { slug: { $eq: slug } },
      ...params
    })
    const { data } = await strapi.get(`/businesses?${query}`)
    return data?.data?.[0] || null
  },

  async create(business: any) {
    const { data } = await strapi.post('/businesses', { data: business })
    return data
  },

  async update(id: string, business: any) {
    const { data } = await strapi.put(`/businesses/${id}`, { data: business })
    return data
  },

  async delete(id: string) {
    const { data } = await strapi.delete(`/businesses/${id}`)
    return data
  },

  async search(query: string, filters?: Record<string, any>) {
    const searchParams = buildStrapiQuery({
      filters: {
        $or: [
          { name: { $containsi: query } },
          { description: { $containsi: query } },
        ],
        ...filters
      },
      populate: '*'
    })
    const { data } = await strapi.get(`/businesses?${searchParams}`)
    return data
  }
}

// Category API helpers
export const categoryApi = {
  async getAll(params?: Record<string, any>) {
    const query = params ? `?${buildStrapiQuery(params)}` : ''
    const { data } = await strapi.get(`/categories${query}`)
    return data
  },

  async getById(id: string, params?: Record<string, any>) {
    const query = params ? `?${buildStrapiQuery(params)}` : ''
    const { data } = await strapi.get(`/categories/${id}${query}`)
    return data
  },

  async getBySlug(slug: string, params?: Record<string, any>) {
    const query = buildStrapiQuery({
      filters: { slug: { $eq: slug } },
      ...params
    })
    const { data } = await strapi.get(`/categories?${query}`)
    return data?.data?.[0] || null
  }
}

// Contact message API helpers
export const contactApi = {
  async create(message: any) {
    const { data } = await strapi.post('/contact-messages', { data: message })
    return data
  },

  async getForBusiness(businessId: string, params?: Record<string, any>) {
    const query = buildStrapiQuery({
      filters: { business: { id: { $eq: businessId } } },
      ...params
    })
    const { data } = await strapi.get(`/contact-messages?${query}`)
    return data
  }
}