import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSurahComplete, getSurahList } from '@/lib/api';
import SurahClientWrapper from '@/components/SurahClientWrapper';

// Bismillah text (shown for all surahs except At-Taubah)
const BISMILLAH = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';

// Pre-render all 114 surahs at build time
export async function generateStaticParams() {
    const surahs = await getSurahList();
    return surahs.map((surah) => ({
        number: String(surah.number),
    }));
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

    return (
        <>
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
