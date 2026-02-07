import { getSurahList } from '@/lib/api';
import SurahCard from '@/components/SurahCard';
import SearchAutocomplete from '@/components/SearchAutocomplete';

// Base URL from environment variable
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://quranonline.id';

// ISR dikonfigurasi di level fetch (lib/api.ts) dengan revalidate: 86400

export default async function HomePage() {
  const surahs = await getSurahList();

  // JSON-LD for ItemList (all surahs)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Daftar 114 Surah Al-Quran",
    description: "Daftar lengkap 114 surah dalam Al-Quran dengan terjemahan Indonesia",
    numberOfItems: 114,
    itemListElement: surahs.slice(0, 20).map((surah, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Article",
        name: `Surah ${surah.englishName}`,
        url: `${BASE_URL}/surah/${surah.number}`,
      },
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="text-center mb-12 fade-in">
        <div className="mb-6">
          <span className="font-arabic text-3xl md:text-4xl text-primary">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Quran Online Indonesia
        </h1>
        <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
          Baca Al-Quran 114 surah dengan terjemahan Indonesia, audio murottal,
          dan <strong className="text-primary">AI Tanya Jawab</strong> untuk membantu memahami ayat-ayat Al-Quran. 100% gratis.
        </p>
      </section>

      {/* Search Bar */}
      <section aria-labelledby="search-section-heading" className="mb-10 fade-in">
        <h2 id="search-section-heading" className="sr-only">Cari Surah Al-Quran</h2>
        <SearchAutocomplete surahs={surahs} />
      </section>

      {/* Stats */}
      <section aria-labelledby="stats-section-heading" className="grid grid-cols-3 gap-4 mb-10 max-w-xl mx-auto fade-in">
        <h2 id="stats-section-heading" className="sr-only">Statistik Al-Quran</h2>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-primary">114</div>
          <div className="text-sm text-foreground-muted">Surah</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-primary">6,236</div>
          <div className="text-sm text-foreground-muted">Ayat</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-primary">30</div>
          <div className="text-sm text-foreground-muted">Juz</div>
        </div>
      </section>

      {/* Divider */}
      <div className="ornament-divider mb-8">
        <span className="text-gold text-2xl">✦</span>
      </div>

      {/* Surah List */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Daftar Surah Al-Quran
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 stagger-children">
          {surahs.map((surah) => (
            <SurahCard key={surah.number} surah={surah} />
          ))}
        </div>
      </section>
    </div>
  );
}
