import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { BusinessWithCategories, Category } from '@/types/supabase'

// Server component to fetch data
async function getFeaturedBusinesses(): Promise<BusinessWithCategories[]> {
  const { data, error } = await supabase
    .from('businesses')
    .select(`
      *,
      business_categories (
        categories (*)
      ),
      business_images (*)
    `)
    .eq('status', 'approved')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching featured businesses:', error)
    return []
  }

  return data || []
}

async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .is('parent_id', null)
    .eq('is_active', true)
    .order('order', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}

export default async function HomePage() {
  const [featuredBusinesses, categories] = await Promise.all([
    getFeaturedBusinesses(),
    getCategories()
  ])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              İşletmenizi <span className="text-yellow-300">Keşfettirin</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Türkiye'nin en kapsamlı işletme rehberinde yerinizi alın. 
              Binlerce müşteri sizi buluyor.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <form action="/ara" method="GET" className="flex">
                <input
                  type="text"
                  name="q"
                  placeholder="İşletme adı, kategori veya şehir ara..."
                  className="flex-1 px-6 py-4 text-lg text-gray-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 text-lg font-semibold rounded-r-lg transition-colors"
                >
                  Ara
                </button>
              </form>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Ücretsiz İşletme Kaydı
              </Link>
              <Link
                href="/kategoriler"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Kategorileri Keşfet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popüler Kategoriler
            </h2>
            <p className="text-xl text-gray-600">
              Aradığınız hizmeti kolayca bulun
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/kategori/${category.slug}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                {category.description && (
                  <p className="text-sm text-gray-600">{category.description}</p>
                )}
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/kategoriler"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
            >
              Tüm kategorileri görüntüle
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Öne Çıkan İşletmeler
            </h2>
            <p className="text-xl text-gray-600">
              Kaliteli hizmet veren işletmeleri keşfedin
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBusinesses.map((business) => (
              <div key={business.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {business.business_images?.[0] ? (
                    <img
                      src={business.business_images[0].image_url}
                      alt={business.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-4xl">🏢</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {business.name}
                  </h3>
                  
                  {business.description && (
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {business.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      {business.city && (
                        <span>📍 {business.city}</span>
                      )}
                    </div>
                    
                    <Link
                      href={`/ilan/${business.city?.toLowerCase()}/${business.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Detaylar →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/ara"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Tüm İşletmeleri Görüntüle
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            İşletmenizi Ücretsiz Kaydedin
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Binlerce potansiyel müşteriye ulaşın. Hemen başlayın, 
            hiçbir ücret ödemeden işletmenizi tanıtın.
          </p>
          <Link
            href="/auth/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
          >
            Hemen Başla - Ücretsiz
          </Link>
        </div>
      </section>
    </div>
  )
}
