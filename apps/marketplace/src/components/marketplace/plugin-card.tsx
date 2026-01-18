import Link from 'next/link';
import { Star, Download, BadgeCheck } from 'lucide-react';
import type { RegistryPackage } from '@/lib/mock-registry';

interface PluginCardProps {
  package: RegistryPackage;
}

export function PluginCard({ package: pkg }: PluginCardProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <Link 
      href={`/pkg/${pkg.id}`}
      className="group block p-6 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg text-2xl group-hover:scale-110 transition-transform">
          {pkg.icon || '📦'}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              {pkg.name}
            </h3>
            {pkg.isOfficial && (
              <BadgeCheck className="flex-shrink-0 w-5 h-5 text-blue-600" aria-label="Official Package" />
            )}
            {pkg.isTrending && (
              <span className="flex-shrink-0 px-2 py-0.5 text-xs font-medium text-orange-700 bg-orange-100 rounded-full">
                Trending
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {pkg.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {pkg.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>{formatNumber(pkg.stats.downloads)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{formatNumber(pkg.stats.stars)}</span>
            </div>
            <span className="text-xs">v{pkg.version}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
