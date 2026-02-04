'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import AyahCard from '@/components/AyahCard';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAudio } from '@/hooks/useAudio';
import { AyahWithTranslation, SurahDetail } from '@/types/quran';

interface SurahClientWrapperProps {
    surah: SurahDetail;
    ayahs: AyahWithTranslation[];
}

export default function SurahClientWrapper({ surah, ayahs }: SurahClientWrapperProps) {
    const { audioState, audioRef, playSurah, playAyah } = useAudio();
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const ayahRefs = useRef<(HTMLDivElement | null)[]>([]);
    const pathname = usePathname();
    const [initialized, setInitialized] = useState(false);

    // Memoize surah data for stable references
    const surahNumber = surah.number;
    const surahName = surah.englishName;

    // Register this surah with the audio context when mounted
    useEffect(() => {
        setInitialized(true);
    }, []);

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

    // Auto-scroll to current playing ayah when it changes
    useEffect(() => {
        if (
            audioState.surah?.number === surahNumber &&
            audioState.currentAyahIndex !== null &&
            ayahRefs.current[audioState.currentAyahIndex]
        ) {
            ayahRefs.current[audioState.currentAyahIndex]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [audioState.currentAyahIndex, audioState.surah?.number, surahNumber]);

    // Stable callback for playing ayah - uses useCallback
    // Calls audio.play() directly from user gesture for mobile compatibility
    const handlePlayAyah = useCallback((index: number) => {
        const audio = audioRef.current;
        const targetAyah = ayahs[index];

        if (audioState.surah?.number !== surahNumber) {
            // New surah - load and play
            if (audio && targetAyah?.audio) {
                audio.src = targetAyah.audio;
                audio.load();
                audio.play().catch((error) => {
                    console.error('Audio play error:', error);
                });
            }
            playSurah(surah, ayahs, index);
        } else {
            // Same surah
            if (audio && targetAyah?.audio) {
                if (audioState.currentAyahIndex === index && audioState.isPlaying) {
                    // Pause
                    audio.pause();
                } else if (audioState.currentAyahIndex === index && !audioState.isPlaying) {
                    // Resume
                    audio.play().catch((error) => {
                        console.error('Audio play error:', error);
                    });
                } else {
                    // Different ayah - load and play
                    audio.src = targetAyah.audio;
                    audio.load();
                    audio.play().catch((error) => {
                        console.error('Audio play error:', error);
                    });
                }
            }
            playAyah(index);
        }
    }, [audioState.surah?.number, audioState.currentAyahIndex, audioState.isPlaying, surahNumber, playSurah, playAyah, surah, ayahs, audioRef]);

    // Stable callback for play all - calls audio.play() directly for mobile
    const handlePlayAll = useCallback(() => {
        const audio = audioRef.current;
        const firstAyah = ayahs[0];

        if (audio && firstAyah?.audio) {
            audio.src = firstAyah.audio;
            audio.load();
            audio.play().catch((error) => {
                console.error('Audio play error:', error);
            });
        }
        playSurah(surah, ayahs, 0);
    }, [playSurah, surah, ayahs, audioRef]);

    // Memoize isAyahPlaying check
    const isCurrentSurah = audioState.surah?.number === surahNumber;
    const currentPlayingIndex = audioState.currentAyahIndex;
    const isAudioPlaying = audioState.isPlaying;

    // Create stable callback creators for each ayah
    const createPlayHandler = useCallback((index: number) => {
        return () => handlePlayAyah(index);
    }, [handlePlayAyah]);

    const createBookmarkHandler = useCallback((ayah: AyahWithTranslation) => {
        return () => toggleBookmark({
            surahNumber,
            ayahNumber: ayah.numberInSurah,
            surahName,
            arabicText: ayah.arabic,
            translation: ayah.translation,
        });
    }, [toggleBookmark, surahNumber, surahName]);

    // Pre-compute playing and bookmark states for all ayahs
    const ayahStates = useMemo(() => {
        return ayahs.map((ayah, index) => ({
            isPlaying: isCurrentSurah && currentPlayingIndex === index && isAudioPlaying,
            isBookmarked: isBookmarked(surahNumber, ayah.numberInSurah),
        }));
    }, [ayahs, isCurrentSurah, currentPlayingIndex, isAudioPlaying, isBookmarked, surahNumber]);

    if (!initialized) return null;

    return (
        <>
            {/* Play All Button */}
            <div className="flex justify-center mb-8">
                <button
                    onClick={handlePlayAll}
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
                            surahNumber={surahNumber}
                            surahName={surahName}
                            isPlaying={ayahStates[index].isPlaying}
                            isBookmarked={ayahStates[index].isBookmarked}
                            onPlayAudio={createPlayHandler(index)}
                            onToggleBookmark={createBookmarkHandler(ayah)}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
