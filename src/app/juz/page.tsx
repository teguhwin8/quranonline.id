import JuzCard from '@/components/JuzCard';
import { JUZ_DATA } from '@/lib/juz-data';
import Link from 'next/link';
import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://quranonline.id';

export const metadata: Metadata = {
    title: 'Daftar 30 Juz Al-Quran Lengkap - Baca Per Juz dengan Terjemahan Indonesia',
    description: 'Baca Al-Quran per juz lengkap online. Daftar 30 juz Al-Quran dari Juz 1 (Al-Fatihah) sampai Juz 30 (Juz Amma) dengan terjemahan Indonesia, audio murottal, dan navigasi mudah. 100% gratis!',
    keywords: [
        'juz quran',
        'al quran per juz',
        'baca quran per juz',
        '30 juz al quran',
        'juz amma',
        'daftar juz quran',
        'daftar juz al quran lengkap',
        'baca al quran per juz',
        'juz 1 sampai 30',
        'al quran juz 1 sampai 30',
        'bacaan al quran per juz',
    ],
    openGraph: {
        title: 'Daftar 30 Juz Al-Quran Lengkap | Quran Online',
        description: 'Baca Al-Quran per juz lengkap dari Juz 1 sampai Juz 30 dengan terjemahan Indonesia dan audio murottal.',
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
        title: 'Daftar 30 Juz Al-Quran Lengkap | Quran Online',
        description: 'Baca Al-Quran per juz lengkap dari Juz 1 sampai Juz 30 dengan terjemahan Indonesia dan audio murottal.',
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

    // FAQ structured data
    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Berapa jumlah juz dalam Al-Quran?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Al-Quran terbagi menjadi 30 juz. Pembagian ini bertujuan untuk memudahkan umat Islam dalam membaca dan menghafal Al-Quran secara bertahap.",
                },
            },
            {
                "@type": "Question",
                name: "Apa itu juz dalam Al-Quran?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Juz adalah pembagian Al-Quran menjadi 30 bagian yang sama besar. Kata 'juz' berarti 'bagian'. Pembagian ini memudahkan umat Islam untuk mengkhatamkan (menyelesaikan bacaan) Al-Quran dalam 30 hari, misalnya selama bulan Ramadhan.",
                },
            },
            {
                "@type": "Question",
                name: "Juz 30 disebut apa?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Juz 30 lebih dikenal dengan sebutan 'Juz Amma', dinamakan berdasarkan kata pertama dari Surah An-Naba yaitu عَمَّ (amma). Juz ini berisi 37 surah pendek yang sering dibaca dalam sholat.",
                },
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
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
                    Daftar 30 Juz Al-Quran Lengkap
                </h1>
                <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                    Baca Al-Quran berdasarkan 30 juz lengkap dengan terjemahan Indonesia dan audio murottal.
                </p>
            </section>

            {/* Divider */}
            <div className="ornament-divider mb-8">
                <span className="text-gold text-2xl">✦</span>
            </div>

            {/* SEO Intro Content */}
            <section className="card mb-8">
                <h2 className="text-lg font-bold text-foreground mb-3">
                    Tentang Pembagian Juz dalam Al-Quran
                </h2>
                <p className="text-sm text-foreground-muted leading-relaxed mb-3">
                    Al-Quran Al-Karim terbagi menjadi 30 juz (bagian) untuk memudahkan umat Islam dalam membaca
                    dan menghafal secara bertahap. Dengan pembagian ini, seorang muslim dapat mengkhatamkan
                    Al-Quran dalam 30 hari dengan membaca 1 juz per hari, misalnya selama bulan Ramadhan.
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed mb-3">
                    Setiap juz terdiri dari beberapa surah atau bagian surah. Juz 1 dimulai dari Surah Al-Fatihah
                    dan berakhir di Juz 30 yang dikenal sebagai &quot;Juz Amma&quot; berisi surah-surah pendek yang sering
                    dibaca dalam sholat sehari-hari.
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed">
                    Di website ini, Anda dapat membaca setiap juz secara online dilengkapi dengan terjemahan
                    Bahasa Indonesia dan audio murottal dari qari ternama. Pilih juz yang ingin Anda baca
                    dari daftar di bawah ini.
                </p>
            </section>

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

            {/* FAQ Section */}
            <section className="mt-10 card">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <i className="ri-question-line text-primary"></i>
                    Pertanyaan Umum tentang Juz Al-Quran
                </h2>
                <div className="space-y-4">
                    <div className="border-b border-card-border pb-3">
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                            Berapa jumlah juz dalam Al-Quran?
                        </h3>
                        <p className="text-sm text-foreground-muted leading-relaxed">
                            Al-Quran terbagi menjadi 30 juz. Pembagian ini bertujuan untuk memudahkan umat Islam dalam membaca dan menghafal Al-Quran secara bertahap.
                        </p>
                    </div>
                    <div className="border-b border-card-border pb-3">
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                            Apa itu juz dalam Al-Quran?
                        </h3>
                        <p className="text-sm text-foreground-muted leading-relaxed">
                            Juz adalah pembagian Al-Quran menjadi 30 bagian yang sama besar. Kata &quot;juz&quot; berarti &quot;bagian&quot;. Pembagian ini memudahkan umat Islam untuk mengkhatamkan Al-Quran dalam 30 hari.
                        </p>
                    </div>
                    <div className="pb-0">
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                            Juz 30 disebut apa?
                        </h3>
                        <p className="text-sm text-foreground-muted leading-relaxed">
                            Juz 30 lebih dikenal dengan sebutan &quot;Juz Amma&quot;, dinamakan berdasarkan kata pertama dari Surah An-Naba yaitu عَمَّ (amma). Juz ini berisi 37 surah pendek yang sering dibaca dalam sholat.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
