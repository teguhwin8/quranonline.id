import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getSurahComplete, getSurahList } from '@/lib/api';
import SurahClientWrapper from '@/components/SurahClientWrapper';

// Bismillah text (shown for all surahs except At-Taubah)
const BISMILLAH = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';

// Surah names in Indonesian for SEO
const SURAH_NAMES_ID: Record<number, string> = {
    1: "Al-Fatihah (Pembukaan)",
    2: "Al-Baqarah (Sapi Betina)",
    3: "Ali 'Imran (Keluarga Imran)",
    4: "An-Nisa (Wanita)",
    5: "Al-Ma'idah (Hidangan)",
    6: "Al-An'am (Hewan Ternak)",
    7: "Al-A'raf (Tempat Tertinggi)",
    8: "Al-Anfal (Rampasan Perang)",
    9: "At-Taubah (Pengampunan)",
    10: "Yunus (Yunus)",
    11: "Hud (Hud)",
    12: "Yusuf (Yusuf)",
    13: "Ar-Ra'd (Guruh)",
    14: "Ibrahim (Ibrahim)",
    15: "Al-Hijr (Hijr)",
    16: "An-Nahl (Lebah)",
    17: "Al-Isra (Perjalanan Malam)",
    18: "Al-Kahf (Gua)",
    36: "Ya-Sin (Ya Sin)",
    67: "Al-Mulk (Kerajaan)",
    78: "An-Naba (Berita Besar)",
    112: "Al-Ikhlas (Ketulusan)",
    113: "Al-Falaq (Waktu Subuh)",
    114: "An-Nas (Manusia)",
};

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

    const surahNameId = SURAH_NAMES_ID[surahNumber] || surah.englishNameTranslation;
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
            url: `https://quranonline.id/surah/${surahNumber}`,
        },
        twitter: {
            card: "summary",
            title: `${title} | Quran Online`,
            description,
        },
        alternates: {
            canonical: `https://quranonline.id/surah/${surahNumber}`,
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
            "@id": `https://quranonline.id/surah/${surahNumber}`,
        },
    };

    return (
        <>
            {/* JSON-LD for this surah */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Surah Header */}
            <header className="text-center mb-8 fade-in">
                <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-4">
                    <span className="text-primary font-semibold">Surah ke-{surah.number}</span>
                </div>

                <h1 className="surah-name-arabic text-4xl text-primary-dark mb-2">
                    {surah.name}
                </h1>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                    {surah.englishName}
                </h2>
                <p className="text-foreground-muted">
                    {surah.englishNameTranslation}
                </p>

                <div className="flex items-center justify-center gap-4 mt-4 text-sm text-foreground-muted">
                    <span>{surah.numberOfAyahs} Ayat</span>
                    <span>•</span>
                    <span>{surah.revelationType === 'Meccan' ? 'Makkiyah' : 'Madaniyah'}</span>
                </div>
            </header>

            {/* Bismillah */}
            {showBismillah && (
                <div className="ornament-divider mb-8">
                    <span className="bismillah px-4">{BISMILLAH}</span>
                </div>
            )}

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
