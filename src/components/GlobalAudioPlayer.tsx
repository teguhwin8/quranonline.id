'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAudio } from '@/hooks/useAudio';

export default function GlobalAudioPlayer() {
    const router = useRouter();
    const { audioState, audioRef, togglePlay, setAyahIndex, closePlayer } = useAudio();
    const [playError, setPlayError] = useState<string | null>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const { surah, ayahs, currentAyahIndex, isPlaying } = audioState;
    const currentAyah = currentAyahIndex !== null ? ayahs[currentAyahIndex] : null;

    const playNext = useCallback(() => {
        if (currentAyahIndex !== null && currentAyahIndex < ayahs.length - 1) {
            setAyahIndex(currentAyahIndex + 1);
        } else {
            closePlayer();
        }
    }, [currentAyahIndex, ayahs.length, setAyahIndex, closePlayer]);

    const playPrevious = useCallback(() => {
        if (currentAyahIndex !== null && currentAyahIndex > 0) {
            setAyahIndex(currentAyahIndex - 1);
        }
    }, [currentAyahIndex, setAyahIndex]);

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

    // Load audio when source changes
    useEffect(() => {
        const audio = audioRef.current;
        const progressBar = progressRef.current;
        if (!audio || !currentAyah?.audio) return;

        // Reset progress
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        setCurrentTime(0);
        setDuration(0);
        setIsLoaded(false);

        audio.src = currentAyah.audio;
        audio.load();
    }, [currentAyah?.audio]);

    // Handle play/pause
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentAyah?.audio) return;

        if (isPlaying && isLoaded) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setPlayError(null);
                    })
                    .catch((error) => {
                        console.error('Audio play error:', error);
                        setPlayError(error.message || 'Gagal memutar audio');
                    });
            }
        } else {
            audio.pause();
        }
    }, [isPlaying, isLoaded, currentAyah?.audio]);

    // Audio event listeners
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
            setIsLoaded(true);
            // Don't auto-play here, let the isPlaying effect handle it
        };

        const handleCanPlay = () => {
            setIsLoaded(true);
        };

        const handleEnded = () => {
            playNext();
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [playNext, isPlaying]);

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
        if (!time || isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Handle play/pause directly from user gesture for mobile compatibility
    const handleTogglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) {
            togglePlay();
            return;
        }

        if (isPlaying) {
            // Pause is always safe
            audio.pause();
            togglePlay();
        } else {
            // Play directly from user gesture (required for mobile)
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setPlayError(null);
                        togglePlay();
                    })
                    .catch((error) => {
                        console.error('Audio play error on user gesture:', error);
                        setPlayError(error.message || 'Gagal memutar audio');
                        // Still toggle state so UI reflects intent
                        togglePlay();
                    });
            } else {
                togglePlay();
            }
        }
    }, [isPlaying, togglePlay]);

    // Always render audio element so it's available for first play
    // Only conditionally render the player UI
    const showPlayer = currentAyahIndex !== null && currentAyah?.audio && surah;

    return (
        <>
            {/* Always render audio element for mobile compatibility */}
            <audio ref={audioRef} preload="auto" playsInline style={{ display: 'none' }} />

            {showPlayer && (
                <div className="fixed bottom-0 left-0 right-0 bg-card-bg border-t border-card-border shadow-lg z-50 fade-in">

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
                                    disabled={currentAyahIndex === ayahs.length - 1}
                                    className="icon-btn disabled:opacity-30"
                                    aria-label="Ayat selanjutnya"
                                >
                                    <i className="ri-skip-forward-fill text-xl"></i>
                                </button>
                            </div>

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
