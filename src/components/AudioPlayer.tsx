'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { AyahWithTranslation } from '@/types/quran';

interface AudioPlayerProps {
    ayahs: AyahWithTranslation[];
    currentAyahIndex: number;
    surahName: string;
    onAyahChange: (index: number) => void;
    onClose: () => void;
}

export default function AudioPlayer({
    ayahs,
    currentAyahIndex,
    surahName,
    onAyahChange,
    onClose,
}: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const currentAyah = ayahs[currentAyahIndex];

    const playNext = useCallback(() => {
        if (currentAyahIndex < ayahs.length - 1) {
            onAyahChange(currentAyahIndex + 1);
        }
    }, [currentAyahIndex, ayahs.length, onAyahChange]);

    // Autoplay when audio source changes
    useEffect(() => {
        const audio = audioRef.current;
        const progressBar = progressRef.current;
        if (!audio || !currentAyah?.audio || !progressBar) return;

        // Reset progress bar
        progressBar.style.transition = 'none';
        progressBar.style.transform = 'scaleX(0)';

        audio.src = currentAyah.audio;
        audio.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
    }, [currentAyah?.audio, currentAyahIndex]);

    useEffect(() => {
        const audio = audioRef.current;
        const progressBar = progressRef.current;
        if (!audio || !progressBar) return;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
            // Start smooth CSS animation for progress
            if (!audio.paused) {
                progressBar.style.transition = `transform ${audio.duration}s linear`;
                progressBar.style.transform = 'scaleX(1)';
            }
        };

        const handlePlay = () => {
            setIsPlaying(true);
            const remaining = audio.duration - audio.currentTime;
            const currentProgress = audio.currentTime / audio.duration;
            progressBar.style.transform = `scaleX(${currentProgress})`;
            // Use setTimeout to ensure the transform is applied before transition
            setTimeout(() => {
                progressBar.style.transition = `transform ${remaining}s linear`;
                progressBar.style.transform = 'scaleX(1)';
            }, 10);
        };

        const handlePause = () => {
            setIsPlaying(false);
            // Pause the animation by getting current computed transform
            const computed = getComputedStyle(progressBar).transform;
            progressBar.style.transition = 'none';
            progressBar.style.transform = computed;
        };

        const handleEnded = () => {
            playNext();
        };

        const handleSeeked = () => {
            const currentProgress = audio.currentTime / audio.duration;
            const remaining = audio.duration - audio.currentTime;
            progressBar.style.transition = 'none';
            progressBar.style.transform = `scaleX(${currentProgress})`;
            if (!audio.paused) {
                setTimeout(() => {
                    progressBar.style.transition = `transform ${remaining}s linear`;
                    progressBar.style.transform = 'scaleX(1)';
                }, 10);
            }
        };

        // Update time display less frequently
        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('seeked', handleSeeked);
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('seeked', handleSeeked);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [playNext]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(() => { });
        }
    };

    const playPrevious = () => {
        if (currentAyahIndex > 0) {
            onAyahChange(currentAyahIndex - 1);
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        if (!audio || !duration) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (!currentAyah?.audio) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-card-bg border-t border-card-border shadow-lg z-50 fade-in">
            <audio ref={audioRef} />

            {/* Progress Bar - Using CSS transform for smooth animation */}
            <div
                className="audio-progress cursor-pointer"
                onClick={handleProgressClick}
            >
                <div
                    ref={progressRef}
                    className="audio-progress-bar origin-left"
                    style={{
                        transform: 'scaleX(0)',
                        width: '100%'
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center gap-4">
                    {/* Current Ayah Info */}
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate">
                            {surahName} : {currentAyah.numberInSurah}
                        </p>
                        <p className="text-sm text-foreground-muted">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </p>
                    </div>

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
                            onClick={togglePlay}
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
                        onClick={onClose}
                        className="icon-btn"
                        aria-label="Tutup player"
                    >
                        <i className="ri-close-line text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
