import Link from 'next/link';

interface CategoryPillProps {
  tag: string;
  href?: string;
}

export function CategoryPill({ tag, href }: CategoryPillProps) {
  const className = "inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors";

  if (href) {
    return (
      <Link href={href} className={className}>
        {tag}
      </Link>
    );
  }

  return (
    <span className={className}>
      {tag}
    </span>
  );
}
