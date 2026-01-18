import Link from 'next/link';
import { Search, TrendingUp, Sparkles } from 'lucide-react';
import { PluginCard } from '@/components/marketplace/plugin-card';
import { mockPackages, getTrendingPackages, categories } from '@/lib/mock-registry';

export default function Home() {
  const trendingPackages = getTrendingPackages();
  const featuredPackages = mockPackages.filter(pkg => pkg.isOfficial).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ObjectStack
              </div>
              <span className="text-sm text-gray-500 font-medium">Marketplace</span>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/search" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Browse
              </Link>
              <Link href="https://github.com/objectstack-ai" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Docs
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Discover Extensions for your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ObjectStack
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Find drivers, plugins, and modules to connect your applications with databases, 
            SaaS platforms, and powerful integrations.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <Link href="/search" className="block">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search for drivers, plugins, modules..."
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-blue-300 transition-colors cursor-pointer"
                  readOnly
                />
              </div>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>{mockPackages.length} Extensions</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>{mockPackages.filter(p => p.isOfficial).length} Official</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Extensions</h2>
              <p className="text-gray-600">Official drivers trusted by thousands of developers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map((pkg) => (
              <PluginCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse by Category</h2>
            <p className="text-gray-600">Find the perfect integration for your use case</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/search?category=${category.id}`}
                className="group p-6 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all duration-200"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      {trendingPackages.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Trending This Week</h2>
                <p className="text-gray-600">Popular extensions gaining traction</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trendingPackages.map((pkg) => (
                <PluginCard key={pkg.id} package={pkg} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p className="mb-4">
            Built with ❤️ by the ObjectStack Team
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link href="https://github.com/objectstack-ai" className="hover:text-blue-600 transition-colors">
              GitHub
            </Link>
            <Link href="/docs" className="hover:text-blue-600 transition-colors">
              Documentation
            </Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
