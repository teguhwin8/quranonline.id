import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getSurahComplete, getSurahList } from '@/lib/api';
import SurahClientWrapper from '@/components/SurahClientWrapper';
import { SURAH_MEANING_ID } from '@/lib/surah-translations';

// Base URL from environment variable
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://quranonline.id';

// Bismillah text (shown for all surahs except At-Taubah)
const BISMILLAH = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';

// Pre-render all 114 surahs at build time
export async function generateStaticParams() {
    const surahs = await getSurahList();
    return surahs.map((surah) => ({
        number: String(surah.number),
    }));
}

// Dynamic SEO metadata for each surah
export async function generateMetadata({
    params,
}: {
    params: Promise<{ number: string }>;
}): Promise<Metadata> {
    const { number } = await params;
    const surahNumber = parseInt(number, 10);

    if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
        return {};
    }

    const data = await getSurahComplete(surahNumber);
    const { surah } = data;

    const surahNameId = SURAH_MEANING_ID[surahNumber] || surah.englishNameTranslation;
    const title = `Surah ${surah.englishName} - ${surahNameId}`;
    const description = `Baca Surah ${surah.englishName} (${surah.name}) lengkap ${surah.numberOfAyahs} ayat dengan terjemahan Bahasa Indonesia dan audio murottal. ${surah.revelationType === 'Meccan' ? 'Surah Makkiyah' : 'Surah Madaniyah'}.`;

    return {
        title,
        description,
        keywords: [
            `surah ${surah.englishName.toLowerCase()}`,
            surah.englishName.toLowerCase(),
            `surat ${surah.englishName.toLowerCase()}`,
            `${surah.englishName} terjemahan`,
            `${surah.englishName} audio`,
            `${surah.englishName} arab latin`,
        ],
        openGraph: {
            title: `${title} | Quran Online`,
            description,
            type: "article",
            url: `${BASE_URL}/surah/${surahNumber}`,
            images: [{
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: `Surah ${surah.englishName} - Baca Al-Quran Online`,
            }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | Quran Online`,
            description,
            images: ['/og-image.jpg'],
        },
        alternates: {
            canonical: `${BASE_URL}/surah/${surahNumber}`,
        },
    };
}

// Loading skeleton component
function SurahSkeleton() {
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
async function SurahContent({ surahNumber }: { surahNumber: number }) {
    const data = await getSurahComplete(surahNumber);
    const { surah, ayahs } = data;
    const showBismillah = surahNumber !== 9 && surahNumber !== 1;

    // JSON-LD structured data for Surah
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `Surah ${surah.englishName} - ${surah.englishNameTranslation}`,
        description: `Baca Surah ${surah.englishName} lengkap dengan terjemahan Indonesia`,
        author: {
            "@type": "Organization",
            name: "Quran Online",
        },
        publisher: {
            "@type": "Organization",
            name: "Quran Online Indonesia",
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${BASE_URL}/surah/${surahNumber}`,
        },
    };

    return (
        <>
            {/* JSON-LD for this surah */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Compact Surah Header */}
            <header className="fade-in mb-6">
                {/* Main header row */}
                <div className="flex items-center justify-between gap-4 py-4 px-4 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl">
                    {/* Left: Arabic name */}
                    <div className="text-right flex-shrink-0">
                        <span className="font-arabic text-2xl md:text-3xl text-primary-dark">
                            {surah.name}
                        </span>
                    </div>

                    {/* Center: Info */}
                    <div className="text-center flex-1 min-w-0">
                        <div className="text-xs text-primary font-medium mb-0.5">
                            Surah {surah.number}
                        </div>
                        <h1 className="text-lg md:text-xl font-bold text-foreground truncate">
                            {surah.englishName}
                        </h1>
                        <p className="text-xs text-foreground-muted truncate">
                            {SURAH_MEANING_ID[surahNumber] || surah.englishNameTranslation}
                        </p>
                    </div>

                    {/* Right: Metadata */}
                    <div className="text-left flex-shrink-0 text-xs text-foreground-muted">
                        <div>{surah.numberOfAyahs} Ayat</div>
                        <div>{surah.revelationType === 'Meccan' ? 'Makkiyah' : 'Madaniyah'}</div>
                    </div>
                </div>

                {/* Bismillah - compact */}
                {showBismillah && (
                    <div className="text-center py-3 mt-2">
                        <span className="font-arabic text-3xl md:text-4xl text-primary">
                            {BISMILLAH}
                        </span>
                    </div>
                )}
            </header>

            {/* Client Interactive Components */}
            <SurahClientWrapper surah={surah} ayahs={ayahs} />

            {/* Navigation */}
            <nav className="flex items-center justify-between mt-12 pt-8 border-t border-card-border">
                {surahNumber > 1 ? (
                    <Link
                        href={`/surah/${surahNumber - 1}`}
                        className="btn btn-ghost"
                    >
                        <i className="ri-arrow-left-line"></i>
                        Surah Sebelumnya
                    </Link>
                ) : (
                    <div />
                )}

                {surahNumber < 114 ? (
                    <Link
                        href={`/surah/${surahNumber + 1}`}
                        className="btn btn-ghost"
                    >
                        Surah Selanjutnya
                        <i className="ri-arrow-right-line"></i>
                    </Link>
                ) : (
                    <div />
                )}
            </nav>
        </>
    );
}

export default async function SurahPage({
    params,
}: {
    params: Promise<{ number: string }>;
}) {
    const { number } = await params;
    const surahNumber = parseInt(number, 10);

    // Validate surah number
    if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Back Button */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-6 transition-colors"
            >
                <i className="ri-arrow-left-line"></i>
                Kembali
            </Link>

            {/* Surah Content with Suspense for streaming */}
            <Suspense fallback={<SurahSkeleton />}>
                <SurahContent surahNumber={surahNumber} />
            </Suspense>
        </div>
    );
}
