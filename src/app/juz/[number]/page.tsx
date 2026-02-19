import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getJuzComplete } from '@/lib/api';
import JuzClientWrapper from '@/components/JuzClientWrapper';
import { JUZ_DATA } from '@/lib/juz-data';
import { JUZ_SEO_DATA } from '@/lib/juz-seo-content';

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
    const seoData = JUZ_SEO_DATA[juzNumber];

    const title = `Bacaan Juz ${juzNumber} Al-Quran Lengkap — ${juzInfo.startSurahName} s/d ${juzInfo.endSurahName}`;
    const description = `Baca Juz ${juzNumber} Al-Quran lengkap online dari Surah ${juzInfo.startSurahName} ayat ${juzInfo.startAyah} sampai Surah ${juzInfo.endSurahName} ayat ${juzInfo.endAyah}. Terdiri dari ${seoData?.totalSurahs || ''} surah${seoData?.surahs ? ': ' + seoData.surahs.map(s => s.name).join(', ') : ''}. Dengan terjemahan Indonesia dan audio murottal. 100% gratis!`;

    const surahKeywords = seoData?.surahs?.flatMap(s => [
        `surah ${s.name.toLowerCase()}`,
        `surat ${s.name.toLowerCase()}`,
    ]) || [];

    return {
        title,
        description,
        keywords: [
            `juz ${juzNumber}`,
            `juz ${juzNumber} al quran`,
            `bacaan juz ${juzNumber}`,
            `bacaan juz ${juzNumber} al quran`,
            `baca juz ${juzNumber}`,
            `surat juz ${juzNumber}`,
            `juz ${juzNumber} lengkap`,
            `juz ${juzNumber} terjemahan`,
            `juz ${juzNumber} terjemahan indonesia`,
            `al quran juz ${juzNumber}`,
            `quran juz ${juzNumber}`,
            `juz ${juzNumber} surat apa`,
            juzNumber === 30 ? 'juz amma' : '',
            juzNumber === 30 ? 'juz amma lengkap' : '',
            juzNumber === 30 ? 'juz amma terjemahan' : '',
            juzNumber === 1 ? 'juz 1 al quran' : '',
            ...surahKeywords,
            ...(seoData?.keywords || []),
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
    const seoData = JUZ_SEO_DATA[juzNumber];

    // JSON-LD structured data for Juz — enriched with keywords and dates
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `Bacaan Juz ${juzNumber} Al-Quran Lengkap`,
        description: `Baca Juz ${juzNumber} dari Surah ${juzInfo.startSurahName} ayat ${juzInfo.startAyah} sampai ${juzInfo.endSurahName} ayat ${juzInfo.endAyah} dengan terjemahan Indonesia dan audio murottal`,
        keywords: seoData?.keywords?.join(', ') || `juz ${juzNumber}`,
        datePublished: "2026-01-01",
        dateModified: "2026-02-19",
        wordCount: 2000,
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

    // FAQPage structured data
    const faqLd = seoData?.faq?.length ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: seoData.faq.map(f => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: f.answer,
            },
        })),
    } : null;

    // Get unique surah numbers in this juz for linking
    const uniqueSurahNumbers = [...new Set(ayahs.map(a => a.surah.number))];

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
            {faqLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
                />
            )}

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
                                Bacaan Juz {juzNumber} Al-Quran Lengkap
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

            {/* SEO Content Section — Long-form text for Google */}
            {seoData && (
                <section className="mb-8 card" id="tentang-juz">
                    {/* Table of Contents */}
                    <nav className="mb-6 p-4 rounded-lg bg-background/50 border border-card-border" aria-label="Daftar Isi">
                        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                            <i className="ri-list-ordered text-primary"></i>
                            Daftar Isi
                        </h2>
                        <ol className="text-sm space-y-1.5 list-decimal list-inside text-foreground-muted">
                            <li><a href="#tentang-juz" className="hover:text-primary transition-colors">Tentang Juz {juzNumber}</a></li>
                            <li><a href="#daftar-surah" className="hover:text-primary transition-colors">Daftar Surah dalam Juz {juzNumber}</a></li>
                            <li><a href="#bacaan-juz" className="hover:text-primary transition-colors">Bacaan Juz {juzNumber} Lengkap</a></li>
                            <li><a href="#faq-juz" className="hover:text-primary transition-colors">Pertanyaan Umum (FAQ)</a></li>
                            <li><a href="#juz-lainnya" className="hover:text-primary transition-colors">Juz Lainnya</a></li>
                        </ol>
                    </nav>

                    {/* Intro text */}
                    <h2 className="text-lg font-bold text-foreground mb-3">
                        Tentang Juz {juzNumber} Al-Quran
                    </h2>
                    <p className="text-sm text-foreground-muted leading-relaxed mb-4">
                        {seoData.intro}
                    </p>
                    <p className="text-sm text-foreground-muted leading-relaxed mb-6">
                        Juz {juzNumber} ini terdiri dari {seoData.totalSurahs} surah dan berjumlah sekitar {seoData.totalAyahs} ayat
                        yang dimulai dari urutan surah ke-{seoData.surahs[0]?.number} sampai surah ke-{seoData.surahs[seoData.surahs.length - 1]?.number}.
                        Anda dapat membaca Juz {juzNumber} Al-Quran secara lengkap di bawah ini beserta terjemahan Indonesia dan audio murottal.
                    </p>

                    {/* Surah List */}
                    <h3 className="text-base font-bold text-foreground mb-3" id="daftar-surah">
                        Daftar Surah dalam Juz {juzNumber}
                    </h3>
                    <div className="space-y-3 mb-4">
                        {seoData.surahs.map((surah, index) => (
                            <div key={surah.number} className="p-3 rounded-lg bg-background/50 border border-card-border">
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                                        {index + 1}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Link
                                                href={`/surah/${surah.number}`}
                                                className="font-semibold text-foreground hover:text-primary transition-colors"
                                            >
                                                Surah {surah.name}
                                            </Link>
                                            <span className="font-arabic text-base text-primary-dark">{surah.nameArabic}</span>
                                            <span className="text-xs text-foreground-muted">— &quot;{surah.meaning}&quot;</span>
                                        </div>
                                        <p className="text-xs text-foreground-muted mt-1">
                                            Surah ke-{surah.number} • {surah.totalAyahs} ayat • {surah.type} • Ayat {surah.ayahRange} di Juz {juzNumber}
                                        </p>
                                        <p className="text-sm text-foreground-muted mt-1.5 leading-relaxed">
                                            {surah.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Bacaan Juz anchor */}
            <div id="bacaan-juz"></div>

            {/* Client Interactive Components */}
            <JuzClientWrapper juzNumber={juzNumber} ayahs={ayahs} />

            {/* FAQ Section */}
            {seoData?.faq && seoData.faq.length > 0 && (
                <section className="mt-10 card" id="faq-juz">
                    <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                        <i className="ri-question-line text-primary"></i>
                        Pertanyaan Umum tentang Juz {juzNumber}
                    </h2>
                    <div className="space-y-4">
                        {seoData.faq.map((item, index) => (
                            <div key={index} className="border-b border-card-border pb-3 last:border-b-0 last:pb-0">
                                <h3 className="text-sm font-semibold text-foreground mb-1">
                                    {item.question}
                                </h3>
                                <p className="text-sm text-foreground-muted leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Surah Terkait — Internal links to related surah pages */}
            <section className="mt-10 card">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <i className="ri-book-open-line text-primary"></i>
                    Surah dalam Juz {juzNumber}
                </h2>
                <p className="text-sm text-foreground-muted mb-4">
                    Baca surah-surah yang termasuk dalam Juz {juzNumber} secara lengkap:
                </p>
                <div className="flex flex-wrap gap-2">
                    {uniqueSurahNumbers.map(num => {
                        const surahData = ayahs.find(a => a.surah.number === num)?.surah;
                        return (
                            <Link
                                key={num}
                                href={`/surah/${num}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                            >
                                <span>{surahData?.englishName || `Surah ${num}`}</span>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Navigation Prev/Next */}
            <nav className="flex items-center justify-between mt-10 pt-8 border-t border-card-border">
                {juzNumber > 1 ? (
                    <Link
                        href={`/juz/${juzNumber - 1}`}
                        className="btn btn-ghost"
                    >
                        <i className="ri-arrow-left-line"></i>
                        Juz {juzNumber - 1}
                    </Link>
                ) : (
                    <div />
                )}

                {juzNumber < 30 ? (
                    <Link
                        href={`/juz/${juzNumber + 1}`}
                        className="btn btn-ghost"
                    >
                        Juz {juzNumber + 1}
                        <i className="ri-arrow-right-line"></i>
                    </Link>
                ) : (
                    <div />
                )}
            </nav>

            {/* All Juz Grid — Internal Linking Silo */}
            <section className="mt-10 card" id="juz-lainnya">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <i className="ri-layout-grid-line text-primary"></i>
                    Daftar Juz Al-Quran Lainnya
                </h2>
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
                    {Array.from({ length: 30 }, (_, i) => i + 1).map(num => (
                        <Link
                            key={num}
                            href={`/juz/${num}`}
                            className={`text-center px-2 py-2 rounded-lg text-sm font-medium transition-colors ${num === juzNumber
                                    ? 'bg-primary text-white'
                                    : 'bg-primary/5 text-foreground hover:bg-primary/15 hover:text-primary'
                                }`}
                        >
                            {num}
                        </Link>
                    ))}
                </div>
                <p className="text-xs text-foreground-muted mt-3 text-center">
                    Klik nomor juz di atas untuk membaca Al-Quran per juz
                </p>
            </section>
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
