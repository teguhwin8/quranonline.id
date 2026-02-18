import JuzCard from '@/components/JuzCard';
import { JUZ_DATA } from '@/lib/juz-data';
import Link from 'next/link';
import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://quranonline.id';

export const metadata: Metadata = {
    title: 'Daftar 30 Juz Al-Quran - Baca Per Juz dengan Terjemahan',
    description: 'Baca Al-Quran per juz. Daftar lengkap 30 juz Al-Quran dengan terjemahan Indonesia, audio murottal, dan navigasi mudah.',
    keywords: [
        'juz quran',
        'al quran per juz',
        'baca quran per juz',
        '30 juz al quran',
        'juz amma',
        'daftar juz quran',
    ],
    openGraph: {
        title: 'Daftar 30 Juz Al-Quran | Quran Online',
        description: 'Baca Al-Quran per juz lengkap dengan terjemahan Indonesia dan audio murottal.',
        type: 'website',
        url: `${BASE_URL}/juz`,
        images: [{
            url: '/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Daftar 30 Juz Al-Quran - Quran Online',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Daftar 30 Juz Al-Quran | Quran Online',
        description: 'Baca Al-Quran per juz lengkap dengan terjemahan Indonesia dan audio murottal.',
        images: ['/og-image.jpg'],
    },
    alternates: {
        canonical: `${BASE_URL}/juz`,
    },
};

export default function JuzListPage() {
    // JSON-LD for ItemList
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Daftar 30 Juz Al-Quran",
        description: "Daftar lengkap 30 juz dalam Al-Quran dengan terjemahan Indonesia dan audio murottal",
        numberOfItems: 30,
        itemListElement: JUZ_DATA.map((juz) => ({
            "@type": "ListItem",
            position: juz.number,
            item: {
                "@type": "Article",
                name: `Juz ${juz.number}`,
                url: `${BASE_URL}/juz/${juz.number}`,
            },
        })),
    };

    // BreadcrumbList for SEO navigation
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Beranda",
                item: BASE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Daftar Juz",
                item: `${BASE_URL}/juz`,
            },
        ],
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />

            {/* Back Button */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-6 transition-colors"
            >
                <i className="ri-arrow-left-line"></i>
                Kembali
            </Link>

            {/* Header Section */}
            <section className="text-center mb-10 fade-in">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                    Daftar Juz Al-Quran
                </h1>
                <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                    Baca Al-Quran berdasarkan 30 juz lengkap dengan terjemahan Indonesia dan audio murottal.
                </p>
            </section>

            {/* Divider */}
            <div className="ornament-divider mb-8">
                <span className="text-gold text-2xl">✦</span>
            </div>

            {/* Juz List */}
            <section>
                <h2 className="text-xl font-semibold text-foreground mb-6">
                    30 Juz Al-Quran
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 stagger-children">
                    {JUZ_DATA.map((juz) => (
                        <JuzCard key={juz.number} juz={juz} />
                    ))}
                </div>
            </section>
        </div>
    );
}
