import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Github, Calendar, Scale, ExternalLink, BadgeCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { InstallButton } from '@/components/marketplace/install-button';
import { CategoryPill } from '@/components/marketplace/category-pill';
import { getPackageById, mockPackages } from '@/lib/mock-registry';

interface PageProps {
  params: Promise<{ packageId: string }>;
}

export async function generateStaticParams() {
  return mockPackages.map((pkg) => ({
    packageId: pkg.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { packageId } = await params;
  const pkg = getPackageById(packageId);

  if (!pkg) {
    return {
      title: 'Package Not Found',
    };
  }

  return {
    title: `${pkg.name} - ObjectStack Marketplace`,
    description: pkg.description,
    keywords: [pkg.name, ...pkg.tags, 'ObjectStack', pkg.type],
    openGraph: {
      title: pkg.name,
      description: pkg.description,
      type: 'website',
    },
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { packageId } = await params;
  const pkg = getPackageById(packageId);

  if (!pkg) {
    notFound();
  }

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
            <Link 
              href="/search"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Search
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Package Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <div className="flex items-start gap-6">
            {/* Icon */}
            <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl text-4xl">
              {pkg.icon || '📦'}
            </div>

            {/* Title and Description */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{pkg.name}</h1>
                {pkg.isOfficial && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    <BadgeCheck className="w-4 h-4" />
                    Official
                  </div>
                )}
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium capitalize">
                  {pkg.type}
                </span>
              </div>

              <p className="text-lg text-gray-600 mb-4">{pkg.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {pkg.tags.map((tag) => (
                  <CategoryPill key={tag} tag={tag} href={`/search?tag=${tag}`} />
                ))}
              </div>

              {/* Install Button */}
              <InstallButton packageName={pkg.name} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Documentation</h2>
              
              <div className="prose prose-blue max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {pkg.readme}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Info</h3>

              <dl className="space-y-4">
                {/* Version */}
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">Version</dt>
                  <dd className="text-sm text-gray-900 font-mono">{pkg.version}</dd>
                </div>

                {/* Author */}
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">Author</dt>
                  <dd>
                    <a 
                      href={pkg.author.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      {pkg.author.name}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </dd>
                </div>

                {/* License */}
                {pkg.license && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                      <Scale className="w-4 h-4" />
                      License
                    </dt>
                    <dd className="text-sm text-gray-900">{pkg.license}</dd>
                  </div>
                )}

                {/* Repository */}
                {pkg.repository && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                      <Github className="w-4 h-4" />
                      Repository
                    </dt>
                    <dd>
                      <a 
                        href={pkg.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        View on GitHub
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </dd>
                  </div>
                )}

                {/* Last Updated */}
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Last Updated
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {new Date(pkg.lastUpdated).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </dd>
                </div>
              </dl>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-medium text-gray-500 mb-3">Statistics</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Downloads</dt>
                    <dd className="text-sm font-semibold text-gray-900">
                      {pkg.stats.downloads.toLocaleString()}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Stars</dt>
                    <dd className="text-sm font-semibold text-gray-900">
                      {pkg.stats.stars.toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
