import { MetadataRoute } from 'next';

// Base URL from environment variable
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://quranonline.id';

// Static date for lastModified (update this when deploying new content)
const LAST_MODIFIED = new Date('2026-02-07');

export default function sitemap(): MetadataRoute.Sitemap {
    // Generate all 114 surah URLs
    const surahUrls = Array.from({ length: 114 }, (_, i) => ({
        url: `${BASE_URL}/surah/${i + 1}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/search`,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/bookmarks`,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/settings`,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        ...surahUrls,
    ];
}

