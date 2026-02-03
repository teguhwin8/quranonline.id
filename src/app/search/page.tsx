'use client';

// PPR: Static shell dengan dynamic content yang di-stream
import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SearchMatch } from '@/types/quran';

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialQuery = searchParams.get('q') || '';

    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState<SearchMatch[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const performSearch = useCallback(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            setSearched(false);
            return;
        }

        setLoading(true);
        setSearched(true);

        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
            if (response.ok) {
                const data = await response.json();
                setResults(data.matches || []);
            }
        } catch {
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (initialQuery) {
            performSearch(initialQuery);
        }
    }, [initialQuery, performSearch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            performSearch(query);
        }
    };

    // Highlight matching text
    const highlightText = (text: string, searchQuery: string) => {
        if (!searchQuery) return text;

        const regex = new RegExp(`(${searchQuery})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, i) =>
            regex.test(part) ? (
                <mark key={i} className="bg-gold/30 text-foreground px-0.5 rounded">
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <h1 className="text-2xl font-bold text-foreground mb-6 text-center">
                Cari Ayat Al-Quran
            </h1>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ketik kata kunci (contoh: sabar, rezeki, syukur)"
                        className="search-input pl-12 pr-24"
                        autoFocus
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted">
                        <i className="ri-search-line text-xl"></i>
                    </div>
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary py-2 px-4"
                    >
                        Cari
                    </button>
                </div>
            </form>

            {/* Loading */}
            {loading && (
                <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-foreground-muted">Mencari ayat...</p>
                </div>
            )}

            {/* Results */}
            {!loading && searched && (
                <>
                    <p className="text-foreground-muted mb-6">
                        {results.length > 0
                            ? `Ditemukan ${results.length} hasil untuk "${initialQuery}"`
                            : `Tidak ditemukan hasil untuk "${initialQuery}"`}
                    </p>

                    {results.length > 0 ? (
                        <div className="space-y-4 stagger-children">
                            {results.slice(0, 50).map((match, index) => (
                                <Link
                                    key={`${match.surah.number}-${match.numberInSurah}-${index}`}
                                    href={`/surah/${match.surah.number}`}
                                    className="card block hover:border-primary transition-colors"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="ayah-number shrink-0">
                                            {match.numberInSurah}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-semibold text-primary">
                                                    {match.surah.englishName}
                                                </span>
                                                <span className="text-foreground-muted">:</span>
                                                <span className="text-foreground-muted">
                                                    Ayat {match.numberInSurah}
                                                </span>
                                            </div>
                                            <p className="text-foreground leading-relaxed">
                                                {highlightText(match.text, initialQuery)}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                <i className="ri-emotion-sad-line text-3xl text-primary"></i>
                            </div>
                            <p className="text-foreground-muted">
                                Coba gunakan kata kunci yang berbeda
                            </p>
                        </div>
                    )}
                </>
            )}

            {/* Initial State */}
            {!loading && !searched && (
                <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <i className="ri-search-line text-4xl text-primary"></i>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                        Cari dalam Al-Quran
                    </h2>
                    <p className="text-foreground-muted max-w-md mx-auto">
                        Masukkan kata kunci untuk mencari ayat dalam Al-Quran. Pencarian dilakukan dalam terjemahan Bahasa Indonesia.
                    </p>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-card-border rounded w-1/3 mx-auto mb-6"></div>
                    <div className="h-14 bg-card-border rounded mb-8"></div>
                </div>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
