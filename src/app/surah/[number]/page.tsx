import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getSurahComplete, getSurahList } from '@/lib/api';
import SurahClientWrapper from '@/components/SurahClientWrapper';

// Bismillah text (shown for all surahs except At-Taubah)
const BISMILLAH = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';

// Surah translations in Indonesian (arti nama surah)
const SURAH_MEANING_ID: Record<number, string> = {
    1: "Pembukaan",
    2: "Sapi Betina",
    3: "Keluarga Imran",
    4: "Wanita",
    5: "Hidangan",
    6: "Hewan Ternak",
    7: "Tempat Tertinggi",
    8: "Rampasan Perang",
    9: "Pengampunan",
    10: "Nabi Yunus",
    11: "Nabi Hud",
    12: "Nabi Yusuf",
    13: "Guruh",
    14: "Nabi Ibrahim",
    15: "Batu Gunung",
    16: "Lebah",
    17: "Perjalanan Malam",
    18: "Penghuni Gua",
    19: "Maryam",
    20: "Taha",
    21: "Para Nabi",
    22: "Haji",
    23: "Orang Mukmin",
    24: "Cahaya",
    25: "Pembeda",
    26: "Para Penyair",
    27: "Semut",
    28: "Kisah-Kisah",
    29: "Laba-Laba",
    30: "Romawi",
    31: "Luqman",
    32: "Sujud",
    33: "Golongan Yang Bersekutu",
    34: "Negeri Saba",
    35: "Pencipta",
    36: "Yasin",
    37: "Barisan",
    38: "Shad",
    39: "Rombongan",
    40: "Yang Mengampuni",
    41: "Yang Dijelaskan",
    42: "Musyawarah",
    43: "Perhiasan",
    44: "Kabut",
    45: "Yang Berlutut",
    46: "Bukit Pasir",
    47: "Nabi Muhammad",
    48: "Kemenangan",
    49: "Kamar-Kamar",
    50: "Qaf",
    51: "Angin Yang Menerbangkan",
    52: "Bukit",
    53: "Bintang",
    54: "Bulan",
    55: "Yang Maha Pengasih",
    56: "Hari Kiamat",
    57: "Besi",
    58: "Wanita Yang Mengajukan Gugatan",
    59: "Pengusiran",
    60: "Wanita Yang Diuji",
    61: "Barisan",
    62: "Hari Jumat",
    63: "Orang Munafik",
    64: "Hari Ditampakkan Kesalahan",
    65: "Talak",
    66: "Pengharaman",
    67: "Kerajaan",
    68: "Pena",
    69: "Hari Kiamat",
    70: "Tempat Naik",
    71: "Nabi Nuh",
    72: "Jin",
    73: "Orang Yang Berselimut",
    74: "Orang Yang Berkemul",
    75: "Hari Kiamat",
    76: "Manusia",
    77: "Malaikat Yang Diutus",
    78: "Berita Besar",
    79: "Malaikat Yang Mencabut",
    80: "Bermuka Masam",
    81: "Menggulung",
    82: "Terbelah",
    83: "Orang Yang Curang",
    84: "Terbelah",
    85: "Gugusan Bintang",
    86: "Yang Datang Di Malam Hari",
    87: "Yang Maha Tinggi",
    88: "Hari Pembalasan",
    89: "Fajar",
    90: "Negeri",
    91: "Matahari",
    92: "Malam",
    93: "Waktu Dhuha",
    94: "Kelapangan",
    95: "Buah Tin",
    96: "Segumpal Darah",
    97: "Kemuliaan",
    98: "Bukti Nyata",
    99: "Goncangan",
    100: "Kuda Perang",
    101: "Hari Kiamat",
    102: "Bermegah-megahan",
    103: "Waktu",
    104: "Pengumpat",
    105: "Gajah",
    106: "Suku Quraisy",
    107: "Barang Yang Berguna",
    108: "Nikmat Yang Banyak",
    109: "Orang Kafir",
    110: "Pertolongan",
    111: "Gejolak Api",
    112: "Ikhlas",
    113: "Waktu Subuh",
    114: "Manusia",
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

            {/* Compact Surah Header */}
            <header className="fade-in mb-6">
                {/* Main header row */}
                <div className="flex items-center justify-between gap-4 py-4 px-4 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl">
                    {/* Left: Arabic name */}
                    <div className="text-right flex-shrink-0">
                        <span className="surah-name-arabic text-2xl md:text-3xl text-primary-dark">
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
                        <span className="font-arabic text-lg md:text-xl text-primary">
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
