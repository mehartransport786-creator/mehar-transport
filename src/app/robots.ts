import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mehartransport.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Main rule: allow all public content, block admin/API/dashboard
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/admin', '/api/auth', '/dashboard', '/booking?'],
      },
      // Block aggressive AI training crawlers that generate high server load
      // without contributing to SEO or legitimate traffic.
      // Googlebot and Bingbot are intentionally NOT blocked — SEO is important.
      {
        userAgent: [
          'GPTBot',         // OpenAI
          'ChatGPT-User',
          'CCBot',          // Common Crawl (used to train many LLMs)
          'anthropic-ai',   // Anthropic
          'Claude-Web',
          'ClaudeBot',
          'PerplexityBot',
          'Bytespider',     // ByteDance / TikTok
          'Diffbot',
          'ImagesiftBot',
          'Omgili',
          'FacebookBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
