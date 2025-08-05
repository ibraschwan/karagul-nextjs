'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCurrentUser, logoutUser } from '@/lib/auth'
import type { User } from '@/lib/auth'

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getCurrentUser().then(setUser)
  }, [])

  const handleSignOut = async () => {
    try {
      logoutUser()
      setUser(null)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <header className="bg-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">Karagül Ajans</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                href="/"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Ana Sayfa
              </Link>
              <Link
                href="/ara"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                İşletme Ara
              </Link>
              <Link
                href="/kategoriler"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Kategoriler
              </Link>
            </div>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Hoş geldin, {user.name}
                </span>
                
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                  >
                    Admin Panel
                  </Link>
                )}
                
                {user.role === 'business' && (
                  <Link
                    href="/dashboard"
                    className="bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                  >
                    İşletme Paneli
                  </Link>
                )}
                
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Çıkış
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Giriş
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  İşletme Kaydı
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                href="/ara"
                className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                İşletme Ara
              </Link>
              <Link
                href="/kategoriler"
                className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kategoriler
              </Link>
              
              {user ? (
                <>
                  <div className="border-t border-gray-200 pt-4 pb-3">
                    <div className="px-3 py-2 text-sm text-gray-700">
                      {user.name}
                    </div>
                    
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="block px-3 py-2 text-base font-medium text-red-600 hover:text-red-800"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    
                    {user.role === 'business' && (
                      <Link
                        href="/dashboard"
                        className="block px-3 py-2 text-base font-medium text-green-600 hover:text-green-800"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        İşletme Paneli
                      </Link>
                    )}
                    
                    <button
                      onClick={() => {
                        handleSignOut()
                        setMobileMenuOpen(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900"
                    >
                      Çıkış
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <Link
                    href="/auth/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Giriş
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    İşletme Kaydı
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}