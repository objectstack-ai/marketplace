'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, X } from 'lucide-react';
import { PluginCard } from '@/components/marketplace/plugin-card';
import { mockPackages, categories, type PackageType } from '@/lib/mock-registry';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<PackageType | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOnlyOfficial, setShowOnlyOfficial] = useState(false);

  const filteredPackages = useMemo(() => {
    return mockPackages.filter(pkg => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          pkg.name.toLowerCase().includes(query) ||
          pkg.description.toLowerCase().includes(query) ||
          pkg.tags.some(tag => tag.toLowerCase().includes(query));
        
        if (!matchesSearch) return false;
      }

      // Type filter
      if (selectedType !== 'all' && pkg.type !== selectedType) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        const category = categories.find(c => c.id === selectedCategory);
        if (category) {
          const matchesCategory = pkg.tags.some(tag => 
            category.tags.includes(tag)
          );
          if (!matchesCategory) return false;
        }
      }

      // Official filter
      if (showOnlyOfficial && !pkg.isOfficial) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedType, selectedCategory, showOnlyOfficial]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCategory('all');
    setShowOnlyOfficial(false);
  };

  const hasActiveFilters = 
    searchQuery !== '' || 
    selectedType !== 'all' || 
    selectedCategory !== 'all' || 
    showOnlyOfficial;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ObjectStack
              </div>
              <span className="text-sm text-gray-500 font-medium">Marketplace</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for drivers, plugins, modules..."
              className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </button>
                )}
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Type</h3>
                <div className="space-y-2">
                  {['all', 'driver', 'plugin', 'module'].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={selectedType === type}
                        onChange={(e) => setSelectedType(e.target.value as PackageType | 'all')}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">All Categories</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 flex items-center gap-1">
                        <span>{category.icon}</span>
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Official Only */}
              <div className="pt-4 border-t">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlyOfficial}
                    onChange={(e) => setShowOnlyOfficial(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Official Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {filteredPackages.length} {filteredPackages.length === 1 ? 'Extension' : 'Extensions'}
              </h1>
              {hasActiveFilters && (
                <p className="text-sm text-gray-600 mt-1">
                  Showing filtered results
                </p>
              )}
            </div>

            {filteredPackages.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredPackages.map((pkg) => (
                  <PluginCard key={pkg.id} package={pkg} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  No extensions found
                </h2>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
