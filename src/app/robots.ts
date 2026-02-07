import { MetadataRoute } from 'next';

// Base URL from environment variable
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://quranonline.id';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/', '/offline/'],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}

