import { auth } from './strapi'

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

export async function loginUser(identifier: string, password: string) {
  try {
    const data = await auth.login(identifier, password)
    return {
      user: data.user as User,
      jwt: data.jwt,
      success: true,
      error: null
    }
  } catch (error: any) {
    return {
      user: null,
      jwt: null,
      success: false,
      error: error.response?.data?.error?.message || 'Login failed'
    }
  }
}

export async function registerUser(
  username: string,
  email: string,
  password: string,
  name: string
) {
  try {
    const data = await auth.register(username, email, password, name)
    return {
      user: data.user as User,
      jwt: data.jwt,
      success: true,
      error: null
    }
  } catch (error: any) {
    return {
      user: null,
      jwt: null,
      success: false,
      error: error.response?.data?.error?.message || 'Registration failed'
    }
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const user = await auth.me()
    return user as User
  } catch (error) {
    return null
  }
}

export function logoutUser() {
  auth.logout()
}

export function getStoredUser(): User | null {
  return auth.getUser()
}

export function getStoredToken(): string | null {
  return auth.getToken()
}

export function isAuthenticated(): boolean {
  return !!getStoredToken()
}

export function hasRole(user: User | null, role: string): boolean {
  return user?.role === role
}

export function isAdmin(user: User | null): boolean {
  return hasRole(user, 'admin')
}

export function isBusiness(user: User | null): boolean {
  return hasRole(user, 'business')
}

// Legacy function names for compatibility
export async function signUp(email: string, password: string, name: string, role: 'business' | 'user' = 'business') {
  return await registerUser(email, email, password, name)
}

export async function signIn(email: string, password: string) {
  const result = await loginUser(email, password)
  if (!result.success) throw new Error(result.error)
  return { user: result.user }
}

export async function signOut() {
  logoutUser()
}

export async function getCurrentUserProfile(): Promise<User | null> {
  return await getCurrentUser()
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Authentication required')
  }
  return user
}

export async function requireRole(role: 'admin' | 'business' | 'user') {
  const user = await getCurrentUser()
  if (!user || user.role !== role) {
    throw new Error(`Role ${role} required`)
  }
  return user
}