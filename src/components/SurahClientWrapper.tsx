'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import AyahCard from '@/components/AyahCard';
import { ViewMode } from '@/components/SurahViewToggle';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAudio } from '@/hooks/useAudio';
import { useReciter, DEFAULT_RECITER } from '@/hooks/useReciter';
import { generateSurahPDF } from '@/lib/generateSurahPDF';
import { getSurahAudio } from '@/lib/api';
import { AyahWithTranslation, SurahDetail } from '@/types/quran';

// Convert Western numerals to Eastern Arabic-Indic numerals (٠١٢٣٤٥٦٧٨٩)
const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const toArabicNumber = (num: number): string => {
    return num.toString().split('').map(digit => arabicNumerals[parseInt(digit)]).join('');
};

// LocalStorage key for view mode preference
const VIEW_MODE_KEY = 'surah-view-mode';

interface SurahClientWrapperProps {
    surah: SurahDetail;
    ayahs: AyahWithTranslation[];
}

export default function SurahClientWrapper({ surah, ayahs: initialAyahs }: SurahClientWrapperProps) {
    const { audioState, playWithGesture, pauseAudio, resumeAudio } = useAudio();
    const { selectedReciter, getBismillahUrl } = useReciter();
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const ayahRefs = useRef<(HTMLDivElement | null)[]>([]);
    const pathname = usePathname();
    const [initialized, setInitialized] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>('per-ayat');
    const [ayahs, setAyahs] = useState<AyahWithTranslation[]>(initialAyahs);

    // Re-fetch audio when reciter changes (server renders with default reciter)
    useEffect(() => {
        if (selectedReciter === DEFAULT_RECITER) {
            // Reset to server-rendered data when default is selected
            setAyahs(initialAyahs);
            return;
        }

        let cancelled = false;
        async function refetchAudio() {
            try {
                const audioData = await getSurahAudio(surah.number, selectedReciter);
                if (cancelled) return;
                setAyahs(prev => prev.map((ayah, index) => ({
                    ...ayah,
                    audio: audioData.ayahs[index]?.audio || ayah.audio,
                })));
            } catch (error) {
                console.error('Failed to fetch audio for reciter:', error);
            }
        }
        refetchAudio();
        return () => { cancelled = true; };
    }, [selectedReciter, surah.number, initialAyahs]);


    // Load view mode from localStorage on mount
    useEffect(() => {
        const savedViewMode = localStorage.getItem(VIEW_MODE_KEY) as ViewMode | null;
        if (savedViewMode && (savedViewMode === 'per-ayat' || savedViewMode === 'per-surat')) {
            setViewMode(savedViewMode);
        }
    }, []);

    // Save view mode to localStorage when it changes
    const handleViewModeChange = useCallback((mode: ViewMode) => {
        setViewMode(mode);
        localStorage.setItem(VIEW_MODE_KEY, mode);
    }, []);

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
                if (index !== -1) {
                    // Try scrolling with increasing delays to handle slow renders
                    const tryScroll = (attempt: number) => {
                        const element = ayahRefs.current[index];
                        if (element) {
                            element.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center',
                            });
                        } else if (attempt < 5) {
                            // Retry with increasing delay
                            setTimeout(() => tryScroll(attempt + 1), 200 * attempt);
                        }
                    };
                    setTimeout(() => tryScroll(1), 300);
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
    }, [pathname, scrollToHashAyah, initialized]);

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
            const bismillahUrl = getBismillahUrl();
            const bismillahAyah = {
                number: 0,
                numberInSurah: 0,
                arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
                translation: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
                audio: bismillahUrl,
            };
            const ayahsWithBismillah = [bismillahAyah, ...ayahs];
            playWithGesture(bismillahUrl, surah, ayahsWithBismillah, 0);
        } else {
            // Al-Fatihah (1) or At-Taubah (9) - play directly
            playWithGesture(firstAyah.audio, surah, ayahs, 0);
        }
    }, [playWithGesture, surah, ayahs, surahNumber, getBismillahUrl]);

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
            {/* Unified Controls Toolbar */}
            <div className="controls-toolbar mb-8">
                {/* View Mode Toggle */}
                <div className="inline-flex items-center gap-2">
                    <span className="text-xs text-foreground-muted hidden sm:inline">Tampilan:</span>
                    <div className="inline-flex rounded-lg bg-background-alt p-0.5">
                        <button
                            onClick={() => handleViewModeChange('per-ayat')}
                            className={`btn-compact rounded-md transition-all ${viewMode === 'per-ayat'
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-foreground-muted hover:text-foreground'
                                }`}
                        >
                            <i className="ri-list-check-2 mr-1"></i>
                            Per Ayat
                        </button>
                        <button
                            onClick={() => handleViewModeChange('per-surat')}
                            className={`btn-compact rounded-md transition-all ${viewMode === 'per-surat'
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-foreground-muted hover:text-foreground'
                                }`}
                        >
                            <i className="ri-file-text-line mr-1"></i>
                            Per Surat
                        </button>
                    </div>
                </div>

                {/* Action Buttons Group */}
                <div className="flex items-center gap-2">
                    {/* Play All Button */}
                    <button
                        onClick={handlePlayAll}
                        className="btn btn-primary btn-compact"
                    >
                        <i className="ri-play-fill"></i>
                        <span>Putar Semua</span>
                    </button>

                    {/* Download PDF Button */}
                    <button
                        onClick={() => generateSurahPDF({ surah, ayahs, includeBismillah: surah.number !== 1 && surah.number !== 9 })}
                        className="btn btn-secondary btn-compact"
                        title="Download PDF"
                    >
                        <i className="ri-download-2-line"></i>
                        <span className="hidden sm:inline">PDF</span>
                    </button>
                </div>
            </div>

            {/* Conditional View Modes */}
            {viewMode === 'per-ayat' ? (
                /* Per-Ayat View: Individual AyahCards */
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
            ) : (
                /* Per-Surat View: Continuous Arabic text */
                <div className="card fade-in">
                    <p className="continuous-arabic-view font-arabic" dir="rtl">
                        {ayahs.map((ayah, index) => (
                            <span key={ayah.number} className='font-arabic'>
                                {ayah.arabic}
                                {' '}
                                <span className="ayah-end-marker">
                                    {toArabicNumber(ayah.numberInSurah)}
                                </span>
                                {index < ayahs.length - 1 && ' '}
                            </span>
                        ))}
                    </p>
                </div>
            )}
        </>
    );
}
