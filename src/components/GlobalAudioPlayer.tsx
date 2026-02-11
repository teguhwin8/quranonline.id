'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAudio } from '@/hooks/useAudio';
import { useReciter } from '@/hooks/useReciter';
import { getSurahComplete } from '@/lib/api';

export default function GlobalAudioPlayer() {
    const router = useRouter();
    const { audioState, audioRef, closePlayer, pauseAudio, resumeAudio, playWithGesture, toggleAutoPlay } = useAudio();
    const { selectedReciter, getBismillahUrl } = useReciter();
    const [playError, setPlayError] = useState<string | null>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const { surah, ayahs, currentAyahIndex, isPlaying, autoPlayNextSurah } = audioState;
    const currentAyah = currentAyahIndex !== null ? ayahs[currentAyahIndex] : null;
    const [isLoadingNextSurah, setIsLoadingNextSurah] = useState(false);

    // Play next ayah - uses playWithGesture for iOS compatibility when called from button
    const playNext = useCallback(async () => {
        if (currentAyahIndex !== null && currentAyahIndex < ayahs.length - 1 && surah) {
            const nextIndex = currentAyahIndex + 1;
            const nextAyah = ayahs[nextIndex];
            if (nextAyah?.audio) {
                playWithGesture(nextAyah.audio, surah, ayahs, nextIndex);
            }
        } else if (autoPlayNextSurah && surah && surah.number < 114) {
            // Last ayah of surah, autoplay is on, and not the last surah
            setIsLoadingNextSurah(true);
            try {
                const nextSurahNumber = surah.number + 1;
                const { surah: nextSurah, ayahs: nextAyahs } = await getSurahComplete(nextSurahNumber, selectedReciter);

                // At-Taubah (surah 9) doesn't have bismillah, so play first ayah directly
                if (nextSurahNumber === 9) {
                    if (nextAyahs[0]?.audio) {
                        playWithGesture(nextAyahs[0].audio, nextSurah, nextAyahs, 0);
                        router.push(`/surah/${nextSurahNumber}`);
                    }
                } else {
                    // Prepend bismillah as virtual ayah at index 0
                    const bismillahUrl = getBismillahUrl();
                    const bismillahAyah = {
                        number: 0,
                        numberInSurah: 0,
                        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
                        translation: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
                        audio: bismillahUrl,
                    };
                    const ayahsWithBismillah = [bismillahAyah, ...nextAyahs];

                    // Play bismillah first (index 0), then ayahs will continue from index 1
                    playWithGesture(bismillahUrl, nextSurah, ayahsWithBismillah, 0);
                    router.push(`/surah/${nextSurahNumber}`);
                }
            } catch (error) {
                console.error('Failed to load next surah:', error);
                setPlayError('Gagal memuat surat berikutnya');
                closePlayer();
            } finally {
                setIsLoadingNextSurah(false);
            }
        } else {
            closePlayer();
        }
    }, [currentAyahIndex, ayahs, surah, autoPlayNextSurah, playWithGesture, closePlayer, router, selectedReciter, getBismillahUrl]);

    // Play previous ayah - uses playWithGesture for iOS compatibility
    const playPrevious = useCallback(() => {
        if (currentAyahIndex !== null && currentAyahIndex > 0 && surah) {
            const prevIndex = currentAyahIndex - 1;
            const prevAyah = ayahs[prevIndex];
            if (prevAyah?.audio) {
                playWithGesture(prevAyah.audio, surah, ayahs, prevIndex);
            }
        }
    }, [currentAyahIndex, ayahs, surah, playWithGesture]);

    // Smooth progress update using requestAnimationFrame
    const updateProgress = useCallback(() => {
        const audio = audioRef.current;
        const progressBar = progressRef.current;
        if (audio && progressBar && !audio.paused && audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${percent}%`;
            setCurrentTime(audio.currentTime);
            animationRef.current = requestAnimationFrame(updateProgress);
        }
    }, []);

    // Start/stop animation based on play state
    useEffect(() => {
        if (isPlaying && isLoaded) {
            animationRef.current = requestAnimationFrame(updateProgress);
        } else {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isPlaying, isLoaded, updateProgress]);

    // Track previous ayah for detecting changes
    const prevAyahRef = useRef<{ surahNum: number | null; ayahIndex: number | null }>({
        surahNum: null,
        ayahIndex: null
    });

    // Reset progress when ayah changes
    useEffect(() => {
        const progressBar = progressRef.current;
        const currentSurahNum = surah?.number ?? null;

        // Check if ayah actually changed
        const ayahChanged = prevAyahRef.current.surahNum !== currentSurahNum ||
            prevAyahRef.current.ayahIndex !== currentAyahIndex;

        if (ayahChanged && progressBar) {
            // Reset progress bar immediately
            progressBar.style.width = '0%';
            setCurrentTime(0);
            setDuration(0);
            setIsLoaded(false);
            setPlayError(null);
        }

        // Update ref
        prevAyahRef.current = { surahNum: currentSurahNum, ayahIndex: currentAyahIndex };
    }, [surah?.number, currentAyahIndex]);

    // Load audio when source changes and handle play/pause
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentAyah?.audio) return;

        // Check if we need to load new audio
        const needsLoad = audio.src !== currentAyah.audio;

        if (needsLoad) {
            audio.src = currentAyah.audio;
            audio.load();
            // Play will be triggered by canplay handler if isPlaying is true
        } else {
            // Source is the same, just handle play/pause
            if (isPlaying && isLoaded) {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setPlayError(null);
                        })
                        .catch((error) => {
                            // Ignore AbortError as it's expected during rapid state changes
                            if (error.name !== 'AbortError') {
                                console.error('Audio play error:', error);
                                setPlayError(error.message || 'Gagal memutar audio');
                            }
                        });
                }
            } else if (!isPlaying) {
                audio.pause();
            }
        }
    }, [currentAyah?.audio, isPlaying, isLoaded, audioRef]);

    // Audio event listeners
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleCanPlay = () => {
            setIsLoaded(true);
            // Auto-play when audio is ready and isPlaying is true
            if (isPlaying) {
                audio.play().catch((error) => {
                    if (error.name !== 'AbortError') {
                        console.error('Audio canplay error:', error);
                        setPlayError(error.message || 'Gagal memutar audio');
                    }
                });
            }
        };

        const handleEnded = () => {
            playNext();
        };

        const handleError = () => {
            setPlayError('Gagal memuat audio');
            setIsLoaded(false);
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
        };
    }, [playNext, isPlaying, audioRef]);

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        const progressBar = progressRef.current;
        if (!audio || !duration) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
        setCurrentTime(audio.currentTime);
        if (progressBar) {
            progressBar.style.width = `${percent * 100}%`;
        }
    };

    const handleNavigateToAyah = () => {
        if (surah && currentAyah) {
            router.push(`/surah/${surah.number}#ayah-${currentAyah.numberInSurah}`);
        }
    };

    const formatTime = (time: number) => {
        // Handle iOS edge cases where duration can be Infinity or NaN
        if (!time || isNaN(time) || !isFinite(time)) return '--:--';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Handle play/pause directly from user gesture for mobile compatibility
    const handleTogglePlay = useCallback(() => {
        if (isPlaying) {
            pauseAudio();
        } else {
            resumeAudio();
        }
    }, [isPlaying, pauseAudio, resumeAudio]);

    // Always render audio element so it's available for first play
    // Only conditionally render the player UI
    const showPlayer = currentAyahIndex !== null && currentAyah?.audio && surah;

    return (
        <>
            {showPlayer && (
                <div className="fixed bottom-14 md:bottom-0 left-0 right-0 bg-card-bg border-t border-card-border shadow-lg z-40 fade-in">

                    {/* Show error if audio fails to play */}
                    {playError && (
                        <div className="bg-red-500/10 text-red-500 text-xs px-4 py-1 text-center">
                            {playError}
                        </div>
                    )}

                    {/* Progress Bar - using RAF for smooth updates */}
                    <div
                        className="h-1 bg-card-border cursor-pointer relative"
                        onClick={handleProgressClick}
                    >
                        <div
                            ref={progressRef}
                            className="absolute top-0 left-0 h-full bg-primary"
                            style={{ width: '0%' }}
                        />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 py-3">
                        <div className="flex items-center gap-4">
                            {/* Current Ayah Info - Clickable */}
                            <button
                                onClick={handleNavigateToAyah}
                                className="flex-1 min-w-0 text-left hover:opacity-80 transition-opacity"
                            >
                                <p className="font-semibold text-foreground truncate">
                                    {surah.englishName} : {currentAyah.numberInSurah}
                                </p>
                                <p className="text-sm text-foreground-muted">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </p>
                            </button>

                            {/* Controls */}
                            <div className="flex items-center gap-2">
                                {/* Previous */}
                                <button
                                    onClick={playPrevious}
                                    disabled={currentAyahIndex === 0}
                                    className="icon-btn disabled:opacity-30"
                                    aria-label="Ayat sebelumnya"
                                >
                                    <i className="ri-skip-back-fill text-xl"></i>
                                </button>

                                {/* Play/Pause */}
                                <button
                                    onClick={handleTogglePlay}
                                    className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
                                    aria-label={isPlaying ? 'Pause' : 'Play'}
                                >
                                    <i className={`${isPlaying ? 'ri-pause-fill' : 'ri-play-fill'} text-2xl`}></i>
                                </button>

                                {/* Next */}
                                <button
                                    onClick={playNext}
                                    disabled={currentAyahIndex === ayahs.length - 1 && !autoPlayNextSurah}
                                    className="icon-btn disabled:opacity-30"
                                    aria-label="Ayat selanjutnya"
                                >
                                    {isLoadingNextSurah ? (
                                        <i className="ri-loader-4-line text-xl animate-spin"></i>
                                    ) : (
                                        <i className="ri-skip-forward-fill text-xl"></i>
                                    )}
                                </button>
                            </div>

                            {/* Autoplay Toggle */}
                            <button
                                onClick={toggleAutoPlay}
                                className={`icon-btn ${autoPlayNextSurah ? 'bg-primary/20 text-primary' : ''}`}
                                aria-label={autoPlayNextSurah ? 'Autoplay aktif' : 'Autoplay nonaktif'}
                                title={autoPlayNextSurah ? 'Autoplay: ON (Lanjut ke surat berikutnya)' : 'Autoplay: OFF'}
                            >
                                <i className="ri-repeat-2-line text-xl"></i>
                            </button>

                            {/* Close Button */}
                            <button
                                onClick={closePlayer}
                                className="icon-btn"
                                aria-label="Tutup player"
                            >
                                <i className="ri-close-line text-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
