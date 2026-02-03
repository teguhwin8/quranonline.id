import { getSurahList } from '@/lib/api';
import SurahCard from '@/components/SurahCard';
import Link from 'next/link';

// ISR dikonfigurasi di level fetch (lib/api.ts) dengan revalidate: 86400

export default async function HomePage() {
  const surahs = await getSurahList();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12 fade-in">
        <div className="mb-6">
          <span className="bismillah text-4xl md:text-5xl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Quran Online
        </h1>
        <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
          Baca Al-Quran dengan terjemahan Bahasa Indonesia,
          dengarkan murottal dari qari terkenal, dan simpan ayat favorit Anda.
        </p>
      </section>

      {/* Search Bar */}
      <section className="mb-10 fade-in">
        <Link href="/search" className="block max-w-xl mx-auto relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted">
            <i className="ri-search-line text-xl"></i>
          </div>
          <div className="search-input cursor-pointer group-hover:border-primary transition-colors">
            Cari ayat, surah, atau kata kunci...
          </div>
        </Link>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4 mb-10 max-w-xl mx-auto fade-in">
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
          Daftar Surah
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {surahs.map((surah) => (
            <SurahCard key={surah.number} surah={surah} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-card-border text-center text-foreground-muted">
        <p className="mb-2">
          Data dari <a href="https://alquran.cloud" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Al-Quran Cloud API</a>
        </p>
        <p className="text-sm">
          © 2026 Quran Online. Semoga bermanfaat.
        </p>
      </footer>
    </div>
  );
}
