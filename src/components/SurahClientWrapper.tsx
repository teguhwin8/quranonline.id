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
    const { audioState, playWithGesture, pauseAudio, resumeAudio } = useAudio();
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
            audioState.currentAyahIndex !== null
        ) {
            // Check if bismillah is prepended in the audio playlist
            const hasBismillahPrepended = audioState.ayahs.length > 0 &&
                audioState.ayahs[0]?.numberInSurah === 0;

            // If bismillah is prepended, adjust the index for the page
            const pageIndex = hasBismillahPrepended
                ? audioState.currentAyahIndex - 1
                : audioState.currentAyahIndex;

            // Only scroll if it's a valid page index (not bismillah itself which is -1 after adjustment)
            if (pageIndex >= 0 && ayahRefs.current[pageIndex]) {
                ayahRefs.current[pageIndex]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }
    }, [audioState.currentAyahIndex, audioState.surah?.number, audioState.ayahs, surahNumber]);

    // Stable callback for playing ayah - uses iOS-compatible functions
    // All audio.play() calls happen directly from user gesture
    const handlePlayAyah = useCallback((index: number) => {
        const targetAyah = ayahs[index];
        if (!targetAyah?.audio) return;

        if (audioState.surah?.number !== surahNumber) {
            // New surah - load and play with gesture
            playWithGesture(targetAyah.audio, surah, ayahs, index);
        } else {
            // Same surah
            if (audioState.currentAyahIndex === index && audioState.isPlaying) {
                // Same ayah playing - pause
                pauseAudio();
            } else if (audioState.currentAyahIndex === index && !audioState.isPlaying) {
                // Same ayah paused - resume
                resumeAudio();
            } else {
                // Different ayah - load and play
                playWithGesture(targetAyah.audio, surah, ayahs, index);
            }
        }
    }, [audioState.surah?.number, audioState.currentAyahIndex, audioState.isPlaying, surahNumber, playWithGesture, pauseAudio, resumeAudio, surah, ayahs]);

    // Stable callback for play all - uses iOS-compatible function
    const handlePlayAll = useCallback(() => {
        const firstAyah = ayahs[0];
        if (!firstAyah?.audio) return;

        // For surahs that have bismillah (all except Al-Fatihah and At-Taubah)
        // Prepend bismillah as virtual ayah at index 0
        if (surahNumber !== 1 && surahNumber !== 9) {
            const BISMILLAH_AUDIO_URL = 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3';
            const bismillahAyah = {
                number: 0,
                numberInSurah: 0,
                arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
                translation: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
                audio: BISMILLAH_AUDIO_URL,
            };
            const ayahsWithBismillah = [bismillahAyah, ...ayahs];
            playWithGesture(BISMILLAH_AUDIO_URL, surah, ayahsWithBismillah, 0);
        } else {
            // Al-Fatihah (1) or At-Taubah (9) - play directly
            playWithGesture(firstAyah.audio, surah, ayahs, 0);
        }
    }, [playWithGesture, surah, ayahs, surahNumber]);

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
    // Account for bismillah offset: if audioState.ayahs[0].numberInSurah === 0, bismillah is prepended
    const ayahStates = useMemo(() => {
        // Check if bismillah is prepended in the audio playlist
        const hasBismillahPrepended = isCurrentSurah &&
            audioState.ayahs.length > 0 &&
            audioState.ayahs[0]?.numberInSurah === 0;

        // If bismillah is prepended, the actual ayah index in audio = page index + 1
        const indexOffset = hasBismillahPrepended ? 1 : 0;

        return ayahs.map((ayah, index) => ({
            isPlaying: isCurrentSurah && currentPlayingIndex === (index + indexOffset) && isAudioPlaying,
            isBookmarked: isBookmarked(surahNumber, ayah.numberInSurah),
        }));
    }, [ayahs, isCurrentSurah, currentPlayingIndex, isAudioPlaying, isBookmarked, surahNumber, audioState.ayahs]);

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
