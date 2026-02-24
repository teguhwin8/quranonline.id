"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useRef,
  RefObject,
  useEffect,
} from "react";
import { AyahWithTranslation, SurahDetail } from "@/types/quran";

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
  audioProgress: number; // 0-100, progress of current ayah playback
  playSurah: (
    surah: SurahDetail,
    ayahs: AyahWithTranslation[],
    startIndex?: number,
  ) => void;
  playAyah: (index: number) => void;
  togglePlay: () => void;
  setAyahIndex: (index: number) => void;
  closePlayer: () => void;
  isCurrentAyah: (surahNumber: number, ayahIndex: number) => boolean;
  // iOS-compatible: call this from user gesture to play audio directly
  playWithGesture: (
    audioUrl: string,
    surah: SurahDetail,
    ayahs: AyahWithTranslation[],
    index: number,
  ) => void;
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
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const progressRafRef = useRef<number | null>(null);

  // Cancel any running RAF loop
  const stopProgressLoop = useCallback(() => {
    if (progressRafRef.current !== null) {
      cancelAnimationFrame(progressRafRef.current);
      progressRafRef.current = null;
    }
  }, []);

  // Start RAF loop — always cancels previous loop first to avoid duplicates
  const startProgressLoop = useCallback(() => {
    stopProgressLoop();

    const loop = () => {
      const audio = audioRef.current;
      if (
        audio &&
        !audio.paused &&
        audio.duration &&
        isFinite(audio.duration) &&
        audio.duration > 0
      ) {
        const progress = (audio.currentTime / audio.duration) * 100;
        setAudioProgress(progress);
        progressRafRef.current = requestAnimationFrame(loop);
      } else {
        progressRafRef.current = null;
      }
    };

    progressRafRef.current = requestAnimationFrame(loop);
  }, [stopProgressLoop]);

  // Attach audio event listeners to drive the RAF loop.
  // Using both `play` and `timeupdate` for maximum compatibility:
  // - `play` fires immediately when playback starts (but duration may not be ready yet)
  // - `timeupdate` fires when currentTime changes (duration is guaranteed available)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      // Start loop immediately; if duration isn't ready yet, the loop will
      // self-terminate and timeupdate will restart it
      startProgressLoop();
    };

    const handleTimeUpdate = () => {
      // If loop isn't running but audio is playing, restart it
      // This handles the case where play fired before duration was available
      if (progressRafRef.current === null && !audio.paused) {
        startProgressLoop();
      }
    };

    const handlePause = () => {
      stopProgressLoop();
    };

    const handleEnded = () => {
      stopProgressLoop();
      setAudioProgress(0);
    };

    const handleSeeked = () => {
      if (audio.duration && isFinite(audio.duration) && audio.duration > 0) {
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
      if (!audio.paused) {
        startProgressLoop();
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("seeked", handleSeeked);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("seeked", handleSeeked);
      stopProgressLoop();
    };
  }, [startProgressLoop, stopProgressLoop]);

  // Reset progress display when ayah changes
  // Don't stop the loop here — it self-manages based on audio state
  useEffect(() => {
    setAudioProgress(0);
  }, [audioState.currentAyahIndex, audioState.surah?.number]);

  const playSurah = useCallback(
    (surah: SurahDetail, ayahs: AyahWithTranslation[], startIndex = 0) => {
      setAudioState((prev) => ({
        ...prev,
        surah,
        ayahs,
        currentAyahIndex: startIndex,
        isPlaying: true,
      }));
    },
    [],
  );

  const playAyah = useCallback((index: number) => {
    setAudioState((prev) => {
      if (prev.currentAyahIndex === index && prev.isPlaying) {
        return { ...prev, isPlaying: false };
      } else if (prev.currentAyahIndex === index && !prev.isPlaying) {
        return { ...prev, isPlaying: true };
      } else {
        return { ...prev, currentAyahIndex: index, isPlaying: true };
      }
    });
  }, []);

  const togglePlay = useCallback(() => {
    setAudioState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const setAyahIndex = useCallback((index: number) => {
    setAudioState((prev) => ({
      ...prev,
      currentAyahIndex: index,
      isPlaying: true,
    }));
  }, []);

  const closePlayer = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = "";
    }
    stopProgressLoop();
    setAudioProgress(0);
    setAudioState((prev) => ({
      ...prev,
      currentAyahIndex: null,
      isPlaying: false,
    }));
  }, [stopProgressLoop]);

  const isCurrentAyah = useCallback(
    (surahNumber: number, ayahIndex: number) => {
      return (
        audioState.surah?.number === surahNumber &&
        audioState.currentAyahIndex === ayahIndex &&
        audioState.isPlaying
      );
    },
    [
      audioState.surah?.number,
      audioState.currentAyahIndex,
      audioState.isPlaying,
    ],
  );

  // iOS-compatible: plays audio directly from user gesture
  // This MUST be called synchronously from a click/touch handler
  const playWithGesture = useCallback(
    (
      audioUrl: string,
      surah: SurahDetail,
      ayahs: AyahWithTranslation[],
      index: number,
    ) => {
      const audio = audioRef.current;
      if (!audio) return;

      // Set src and play synchronously from user gesture
      audio.src = audioUrl;
      audio.load();

      // Play immediately - this is the key for iOS
      // The 'play' event will trigger startProgressLoop
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("playWithGesture error:", error);
        });
      }

      // Update state
      setAudioState((prev) => ({
        ...prev,
        surah,
        ayahs,
        currentAyahIndex: index,
        isPlaying: true,
      }));
    },
    [],
  );

  // Pause audio (safe to call from anywhere)
  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    setAudioState((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  // Resume audio - MUST be called from user gesture on iOS
  const resumeAudio = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.src) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("resumeAudio error:", error);
        });
      }
    }
    setAudioState((prev) => ({ ...prev, isPlaying: true }));
  }, []);

  // Toggle autoplay next surah
  const toggleAutoPlay = useCallback(() => {
    setAudioState((prev) => ({
      ...prev,
      autoPlayNextSurah: !prev.autoPlayNextSurah,
    }));
  }, []);

  return (
    <AudioContext.Provider
      value={{
        audioState,
        audioRef,
        audioProgress,
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
      }}
    >
      {/* Audio element rendered by provider - always available */}
      <audio
        ref={audioRef}
        preload="none"
        playsInline
        style={{ display: "none" }}
      />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio(): AudioContextType {
  const context = useContext(AudioContext);

  // Return default values if context is not available (during SSR/prerendering)
  if (context === undefined) {
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
      audioProgress: 0,
      playSurah: () => {},
      playAyah: () => {},
      togglePlay: () => {},
      setAyahIndex: () => {},
      closePlayer: () => {},
      isCurrentAyah: () => false,
      playWithGesture: () => {},
      pauseAudio: () => {},
      resumeAudio: () => {},
      toggleAutoPlay: () => {},
    };
  }

  return context;
}
