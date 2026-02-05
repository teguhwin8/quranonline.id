'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode, useRef, RefObject } from 'react';
import { AyahWithTranslation, SurahDetail } from '@/types/quran';

interface AudioState {
    surah: SurahDetail | null;
    ayahs: AyahWithTranslation[];
    currentAyahIndex: number | null;
    isPlaying: boolean;
    autoPlayNextSurah: boolean;
}

interface AudioContextType {
    audioState: AudioState;
    audioRef: RefObject<HTMLAudioElement | null>;
    playSurah: (surah: SurahDetail, ayahs: AyahWithTranslation[], startIndex?: number) => void;
    playAyah: (index: number) => void;
    togglePlay: () => void;
    setAyahIndex: (index: number) => void;
    closePlayer: () => void;
    isCurrentAyah: (surahNumber: number, ayahIndex: number) => boolean;
    // iOS-compatible: call this from user gesture to play audio directly
    playWithGesture: (audioUrl: string, surah: SurahDetail, ayahs: AyahWithTranslation[], index: number) => void;
    pauseAudio: () => void;
    resumeAudio: () => void;
    toggleAutoPlay: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [audioState, setAudioState] = useState<AudioState>({
        surah: null,
        ayahs: [],
        currentAyahIndex: null,
        isPlaying: false,
        autoPlayNextSurah: true,
    });

    const playSurah = useCallback((surah: SurahDetail, ayahs: AyahWithTranslation[], startIndex = 0) => {
        setAudioState(prev => ({
            ...prev,
            surah,
            ayahs,
            currentAyahIndex: startIndex,
            isPlaying: true,
        }));
    }, []);

    const playAyah = useCallback((index: number) => {
        setAudioState(prev => {
            if (prev.currentAyahIndex === index && prev.isPlaying) {
                // Same ayah, toggle pause
                return { ...prev, isPlaying: false };
            } else if (prev.currentAyahIndex === index && !prev.isPlaying) {
                // Same ayah, resume
                return { ...prev, isPlaying: true };
            } else {
                // Different ayah, start playing
                return { ...prev, currentAyahIndex: index, isPlaying: true };
            }
        });
    }, []);

    const togglePlay = useCallback(() => {
        setAudioState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    }, []);

    const setAyahIndex = useCallback((index: number) => {
        setAudioState(prev => ({ ...prev, currentAyahIndex: index, isPlaying: true }));
    }, []);

    const closePlayer = useCallback(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            audio.src = '';
        }
        setAudioState(prev => ({
            ...prev,
            currentAyahIndex: null,
            isPlaying: false,
        }));
    }, []);

    const isCurrentAyah = useCallback((surahNumber: number, ayahIndex: number) => {
        return audioState.surah?.number === surahNumber && audioState.currentAyahIndex === ayahIndex && audioState.isPlaying;
    }, [audioState.surah?.number, audioState.currentAyahIndex, audioState.isPlaying]);

    // iOS-compatible: plays audio directly from user gesture
    // This MUST be called synchronously from a click/touch handler
    const playWithGesture = useCallback((audioUrl: string, surah: SurahDetail, ayahs: AyahWithTranslation[], index: number) => {
        const audio = audioRef.current;
        if (!audio) return;

        // Set src and play synchronously from user gesture
        audio.src = audioUrl;
        audio.load();

        // Play immediately - this is the key for iOS
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                // Silently handle errors, state will still update
                console.error('playWithGesture error:', error);
            });
        }

        // Update state
        setAudioState(prev => ({
            ...prev,
            surah,
            ayahs,
            currentAyahIndex: index,
            isPlaying: true,
        }));
    }, []);

    // Pause audio (safe to call from anywhere)
    const pauseAudio = useCallback(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
        }
        setAudioState(prev => ({ ...prev, isPlaying: false }));
    }, []);

    // Resume audio - MUST be called from user gesture on iOS
    const resumeAudio = useCallback(() => {
        const audio = audioRef.current;
        if (audio && audio.src) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.error('resumeAudio error:', error);
                });
            }
        }
        setAudioState(prev => ({ ...prev, isPlaying: true }));
    }, []);

    // Toggle autoplay next surah
    const toggleAutoPlay = useCallback(() => {
        setAudioState(prev => ({ ...prev, autoPlayNextSurah: !prev.autoPlayNextSurah }));
    }, []);

    return (
        <AudioContext.Provider value={{
            audioState,
            audioRef,
            playSurah,
            playAyah,
            togglePlay,
            setAyahIndex,
            closePlayer,
            isCurrentAyah,
            playWithGesture,
            pauseAudio,
            resumeAudio,
            toggleAutoPlay,
        }}>
            {/* Audio element rendered by provider - always available */}
            <audio ref={audioRef} preload="none" playsInline style={{ display: 'none' }} />
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio(): AudioContextType {
    const context = useContext(AudioContext);

    // Return default values if context is not available (during SSR/prerendering)
    if (context === undefined) {
        // Create a stable ref for SSR
        const dummyRef = { current: null };
        return {
            audioState: {
                surah: null,
                ayahs: [],
                currentAyahIndex: null,
                isPlaying: false,
                autoPlayNextSurah: true,
            },
            audioRef: dummyRef,
            playSurah: () => { },
            playAyah: () => { },
            togglePlay: () => { },
            setAyahIndex: () => { },
            closePlayer: () => { },
            isCurrentAyah: () => false,
            playWithGesture: () => { },
            pauseAudio: () => { },
            resumeAudio: () => { },
            toggleAutoPlay: () => { },
        };
    }

    return context;
}
