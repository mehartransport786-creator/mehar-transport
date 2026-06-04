'use client';

import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  labelAr?: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Light mode for dark backgrounds */
  variant?: 'light' | 'dark';
}

export function Breadcrumbs({ items, variant = 'dark' }: BreadcrumbsProps) {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const textColor = variant === 'light' ? 'text-white/60' : 'text-gray-500';
  const activeColor = variant === 'light' ? 'text-white' : 'text-gray-900 dark:text-white';
  const hoverColor = variant === 'light' ? 'hover:text-[#D9A63A]' : 'hover:text-[#1B1E4F] dark:hover:text-[#D9A63A]';
  const iconColor = variant === 'light' ? 'text-white/30' : 'text-gray-300 dark:text-gray-600';

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className={`flex items-center gap-2 text-sm font-medium flex-wrap ${textColor}`}>
        <li>
          <Link href="/" className={`flex items-center gap-1 ${hoverColor} transition-colors`}>
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">{isAr ? 'الرئيسية' : 'Home'}</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const label = isAr && item.labelAr ? item.labelAr : item.label;

          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className={`w-3.5 h-3.5 rtl:rotate-180 ${iconColor}`} />
              {isLast || !item.href ? (
                <span className={`${isLast ? activeColor : ''} truncate max-w-[200px]`}>
                  {label}
                </span>
              ) : (
                <Link href={item.href} className={`${hoverColor} transition-colors`}>
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mehartransport.com' },
              ...items.map((item, i) => ({
                '@type': 'ListItem',
                position: i + 2,
                name: item.label,
                ...(item.href ? { item: `https://mehartransport.com${item.href}` } : {}),
              })),
            ],
          }),
        }}
      />
    </nav>
  );
}
