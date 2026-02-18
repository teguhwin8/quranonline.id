import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getJuzComplete } from '@/lib/api';
import JuzClientWrapper from '@/components/JuzClientWrapper';
import { JUZ_DATA } from '@/lib/juz-data';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://quranonline.id';

// Pre-render all 30 juz at build time
export async function generateStaticParams() {
    return Array.from({ length: 30 }, (_, i) => ({
        number: String(i + 1),
    }));
}

// Dynamic SEO metadata for each juz
export async function generateMetadata({
    params,
}: {
    params: Promise<{ number: string }>;
}): Promise<Metadata> {
    const { number } = await params;
    const juzNumber = parseInt(number, 10);

    if (isNaN(juzNumber) || juzNumber < 1 || juzNumber > 30) {
        return {};
    }

    const juzInfo = JUZ_DATA[juzNumber - 1];
    const title = `Juz ${juzNumber} — ${juzInfo.startSurahName} ${juzInfo.startAyah} s/d ${juzInfo.endSurahName} ${juzInfo.endAyah}`;
    const description = `Baca Juz ${juzNumber} Al-Quran lengkap dari Surah ${juzInfo.startSurahName} ayat ${juzInfo.startAyah} sampai Surah ${juzInfo.endSurahName} ayat ${juzInfo.endAyah}. Dengan terjemahan Indonesia dan audio murottal. Gratis!`;

    return {
        title,
        description,
        keywords: [
            `juz ${juzNumber}`,
            `juz ${juzNumber} al quran`,
            `baca juz ${juzNumber}`,
            `juz ${juzNumber} terjemahan`,
            `juz ${juzNumber} terjemahan indonesia`,
            `juz ${juzNumber} lengkap`,
            juzNumber === 30 ? 'juz amma' : '',
            juzNumber === 30 ? 'juz amma lengkap' : '',
            juzNumber === 30 ? 'juz amma terjemahan' : '',
            juzNumber === 1 ? 'juz 1 al quran' : '',
            `surah ${juzInfo.startSurahName}`,
        ].filter(Boolean),
        openGraph: {
            title: `${title} | Quran Online`,
            description,
            type: 'article',
            url: `${BASE_URL}/juz/${juzNumber}`,
            images: [{
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: `Juz ${juzNumber} - Baca Al-Quran Online`,
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | Quran Online`,
            description,
            images: ['/og-image.jpg'],
        },
        alternates: {
            canonical: `${BASE_URL}/juz/${juzNumber}`,
        },
    };
}

// Loading skeleton
function JuzSkeleton() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="animate-pulse">
                <div className="h-8 bg-card-border rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-card-border rounded w-1/4 mb-8"></div>
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="card">
                            <div className="h-6 bg-card-border rounded w-8 mb-4"></div>
                            <div className="h-12 bg-card-border rounded mb-4"></div>
                            <div className="h-4 bg-card-border rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Content component with data fetching
async function JuzContent({ juzNumber }: { juzNumber: number }) {
    const data = await getJuzComplete(juzNumber);
    const { ayahs } = data;
    const juzInfo = JUZ_DATA[juzNumber - 1];

    // JSON-LD structured data for Juz
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `Juz ${juzNumber} Al-Quran`,
        description: `Baca Juz ${juzNumber} dari Surah ${juzInfo.startSurahName} ayat ${juzInfo.startAyah} sampai ${juzInfo.endSurahName} ayat ${juzInfo.endAyah} dengan terjemahan Indonesia dan audio murottal`,
        author: {
            "@type": "Organization",
            name: "Quran Online",
        },
        publisher: {
            "@type": "Organization",
            name: "Quran Online Indonesia",
            logo: {
                "@type": "ImageObject",
                url: `${BASE_URL}/logo-quranonline.id.png`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${BASE_URL}/juz/${juzNumber}`,
        },
        isPartOf: {
            "@type": "Book",
            name: "Al-Quran",
            inLanguage: "ar",
        },
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
            {
                "@type": "ListItem",
                position: 3,
                name: `Juz ${juzNumber}`,
                item: `${BASE_URL}/juz/${juzNumber}`,
            },
        ],
    };

    return (
        <>
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />

            {/* Juz Header */}
            <header className="fade-in mb-8">
                <div className="surah-header-card">
                    <div className="flex items-center justify-between gap-6">
                        {/* Left: Arabic name */}
                        <div className="flex-shrink-0">
                            <span className="font-arabic text-2xl md:text-3xl text-primary-dark leading-none">
                                {juzInfo.nameArabic}
                            </span>
                        </div>

                        {/* Center: Info */}
                        <div className="text-center flex-1 min-w-0">
                            <p className="text-xs text-primary font-semibold tracking-wide uppercase mb-1">
                                Juz {juzNumber}
                            </p>
                            <h1 className="text-xl md:text-2xl font-bold text-foreground">
                                Juz {juzNumber}
                            </h1>
                            <p className="text-sm text-foreground-muted mt-0.5">
                                {juzInfo.startSurahName} {juzInfo.startAyah} — {juzInfo.endSurahName} {juzInfo.endAyah}
                            </p>
                        </div>

                        {/* Right: Metadata */}
                        <div className="flex-shrink-0 text-right">
                            <div className="text-sm font-medium text-foreground">{ayahs.length} Ayat</div>
                            <div className="text-xs text-foreground-muted mt-0.5">
                                {new Set(ayahs.map(a => a.surah.number)).size} Surah
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Client Interactive Components */}
            <JuzClientWrapper juzNumber={juzNumber} ayahs={ayahs} />

            {/* Navigation */}
            <nav className="flex items-center justify-between mt-12 pt-8 border-t border-card-border">
                {juzNumber > 1 ? (
                    <Link
                        href={`/juz/${juzNumber - 1}`}
                        className="btn btn-ghost"
                    >
                        <i className="ri-arrow-left-line"></i>
                        Juz Sebelumnya
                    </Link>
                ) : (
                    <div />
                )}

                {juzNumber < 30 ? (
                    <Link
                        href={`/juz/${juzNumber + 1}`}
                        className="btn btn-ghost"
                    >
                        Juz Selanjutnya
                        <i className="ri-arrow-right-line"></i>
                    </Link>
                ) : (
                    <div />
                )}
            </nav>
        </>
    );
}

export default async function JuzPage({
    params,
}: {
    params: Promise<{ number: string }>;
}) {
    const { number } = await params;
    const juzNumber = parseInt(number, 10);

    if (isNaN(juzNumber) || juzNumber < 1 || juzNumber > 30) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Back Button */}
            <Link
                href="/juz"
                className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-6 transition-colors"
            >
                <i className="ri-arrow-left-line"></i>
                Kembali ke Daftar Juz
            </Link>

            {/* Juz Content with Suspense */}
            <Suspense fallback={<JuzSkeleton />}>
                <JuzContent juzNumber={juzNumber} />
            </Suspense>
        </div>
    );
}
