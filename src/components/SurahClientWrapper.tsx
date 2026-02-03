'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import AyahCard from '@/components/AyahCard';
import AudioPlayer from '@/components/AudioPlayer';
import { useBookmarks } from '@/hooks/useBookmarks';
import { AyahWithTranslation, SurahDetail } from '@/types/quran';

interface SurahClientWrapperProps {
    surah: SurahDetail;
    ayahs: AyahWithTranslation[];
}

export default function SurahClientWrapper({ surah, ayahs }: SurahClientWrapperProps) {
    const [currentAyahIndex, setCurrentAyahIndex] = useState<number | null>(null);
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const ayahRefs = useRef<(HTMLDivElement | null)[]>([]);
    const pathname = usePathname();

    // Function to scroll to ayah based on hash
    const scrollToHashAyah = useCallback(() => {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#ayah-')) {
            const ayahNumber = parseInt(hash.replace('#ayah-', ''), 10);
            if (!isNaN(ayahNumber)) {
                const index = ayahs.findIndex(a => a.numberInSurah === ayahNumber);
                if (index !== -1 && ayahRefs.current[index]) {
                    setTimeout(() => {
                        ayahRefs.current[index]?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                        });
                    }, 150);
                    return true;
                }
            }
        }
        return false;
    }, [ayahs]);

    // Handle initial mount and route changes
    useEffect(() => {
        const hasHash = scrollToHashAyah();
        if (!hasHash) {
            window.scrollTo(0, 0);
        }
    }, [pathname, scrollToHashAyah]);

    // Listen for hash changes (e.g., when clicking bookmark links)
    useEffect(() => {
        const handleHashChange = () => {
            scrollToHashAyah();
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [scrollToHashAyah]);

    // Auto-scroll to current playing ayah
    useEffect(() => {
        if (currentAyahIndex !== null && ayahRefs.current[currentAyahIndex]) {
            ayahRefs.current[currentAyahIndex]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [currentAyahIndex]);

    const handlePlayAyah = (index: number) => {
        setCurrentAyahIndex(index);
    };

    const handleClosePlayer = () => {
        setCurrentAyahIndex(null);
    };

    return (
        <>
            {/* Play All Button */}
            <div className="flex justify-center mb-8">
                <button
                    onClick={() => handlePlayAyah(0)}
                    className="btn btn-primary"
                >
                    <i className="ri-play-fill text-lg"></i>
                    Putar Semua Ayat
                </button>
            </div>

            {/* Ayah List */}
            <div className="space-y-6">
                {ayahs.map((ayah, index) => (
                    <div
                        key={ayah.number}
                        id={`ayah-${ayah.numberInSurah}`}
                        ref={(el) => { ayahRefs.current[index] = el; }}
                    >
                        <AyahCard
                            ayah={ayah}
                            surahNumber={surah.number}
                            surahName={surah.englishName}
                            isPlaying={currentAyahIndex === index}
                            isBookmarked={isBookmarked(surah.number, ayah.numberInSurah)}
                            onPlayAudio={() => handlePlayAyah(index)}
                            onToggleBookmark={() =>
                                toggleBookmark({
                                    surahNumber: surah.number,
                                    ayahNumber: ayah.numberInSurah,
                                    surahName: surah.englishName,
                                    arabicText: ayah.arabic,
                                    translation: ayah.translation,
                                })
                            }
                        />
                    </div>
                ))}
            </div>

            {/* Audio Player */}
            {currentAyahIndex !== null && (
                <AudioPlayer
                    ayahs={ayahs}
                    currentAyahIndex={currentAyahIndex}
                    surahName={surah.englishName}
                    onAyahChange={setCurrentAyahIndex}
                    onClose={handleClosePlayer}
                />
            )}
        </>
    );
}
