'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode, useRef, RefObject } from 'react';
import { AyahWithTranslation, SurahDetail } from '@/types/quran';

interface AudioState {
    surah: SurahDetail | null;
    ayahs: AyahWithTranslation[];
    currentAyahIndex: number | null;
    isPlaying: boolean;
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
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [audioState, setAudioState] = useState<AudioState>({
        surah: null,
        ayahs: [],
        currentAyahIndex: null,
        isPlaying: false,
    });

    const playSurah = useCallback((surah: SurahDetail, ayahs: AyahWithTranslation[], startIndex = 0) => {
        setAudioState({
            surah,
            ayahs,
            currentAyahIndex: startIndex,
            isPlaying: true,
        });
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
        setAudioState(prev => ({
            ...prev,
            currentAyahIndex: null,
            isPlaying: false,
        }));
    }, []);

    const isCurrentAyah = useCallback((surahNumber: number, ayahIndex: number) => {
        return audioState.surah?.number === surahNumber && audioState.currentAyahIndex === ayahIndex && audioState.isPlaying;
    }, [audioState.surah?.number, audioState.currentAyahIndex, audioState.isPlaying]);

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
        }}>
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
            },
            audioRef: dummyRef,
            playSurah: () => { },
            playAyah: () => { },
            togglePlay: () => { },
            setAyahIndex: () => { },
            closePlayer: () => { },
            isCurrentAyah: () => false,
        };
    }

    return context;
}
