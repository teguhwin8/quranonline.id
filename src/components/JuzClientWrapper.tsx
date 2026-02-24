"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AyahCard from "@/components/AyahCard";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useAudio } from "@/hooks/useAudio";
import { useReciter } from "@/hooks/useReciter";
import { getJuzAudio } from "@/lib/api";
import { JuzAyahWithTranslation, Surah } from "@/types/quran";

// Convert Western numerals to Eastern Arabic-Indic numerals
const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
const toArabicNumber = (num: number): string => {
  return num
    .toString()
    .split("")
    .map((digit) => arabicNumerals[parseInt(digit)])
    .join("");
};

// LocalStorage key for view mode preference
const VIEW_MODE_KEY = "surah-view-mode";

type ViewMode = "per-ayat" | "per-surat";

interface JuzClientWrapperProps {
  juzNumber: number;
  ayahs: JuzAyahWithTranslation[];
}

// Group ayahs by surah
interface SurahGroup {
  surah: Surah;
  ayahs: JuzAyahWithTranslation[];
}

function groupAyahsBySurah(ayahs: JuzAyahWithTranslation[]): SurahGroup[] {
  const groups: SurahGroup[] = [];
  let currentGroup: SurahGroup | null = null;

  for (const ayah of ayahs) {
    if (!currentGroup || currentGroup.surah.number !== ayah.surah.number) {
      currentGroup = { surah: ayah.surah, ayahs: [] };
      groups.push(currentGroup);
    }
    currentGroup.ayahs.push(ayah);
  }

  return groups;
}

// Bismillah text
const BISMILLAH = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

export default function JuzClientWrapper({
  juzNumber,
  ayahs: initialAyahs,
}: JuzClientWrapperProps) {
  const {
    audioState,
    audioProgress,
    playWithGesture,
    pauseAudio,
    resumeAudio,
  } = useAudio();
  const { selectedReciter, bismillahAudio } = useReciter();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const ayahRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathname = usePathname();
  const [initialized, setInitialized] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("per-ayat");
  const [ayahs, setAyahs] = useState<JuzAyahWithTranslation[]>(initialAyahs);

  // Re-fetch audio when reciter changes
  useEffect(() => {
    if (selectedReciter === "ar.alafasy") {
      setAyahs(initialAyahs);
      return;
    }

    let cancelled = false;
    async function refetchAudio() {
      try {
        const audioData = await getJuzAudio(juzNumber, selectedReciter);
        if (cancelled) return;
        setAyahs((prev) =>
          prev.map((ayah, index) => ({
            ...ayah,
            audio: audioData.ayahs[index]?.audio || ayah.audio,
            audioSecondary: audioData.ayahs[index]?.audioSecondary,
          })),
        );
      } catch (error) {
        console.error("Failed to fetch audio for reciter:", error);
      }
    }
    refetchAudio();
    return () => {
      cancelled = true;
    };
  }, [selectedReciter, juzNumber, initialAyahs]);

  // Load view mode from localStorage
  useEffect(() => {
    const savedViewMode = localStorage.getItem(
      VIEW_MODE_KEY,
    ) as ViewMode | null;
    if (
      savedViewMode &&
      (savedViewMode === "per-ayat" || savedViewMode === "per-surat")
    ) {
      setViewMode(savedViewMode);
    }
  }, []);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem(VIEW_MODE_KEY, mode);
  }, []);

  // Function to scroll to ayah based on hash
  const scrollToHashAyah = useCallback(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#ayah-")) {
      // Hash format: #ayah-[surahNumber]-[ayahNumber]
      const parts = hash.replace("#ayah-", "").split("-");
      const surahNum = parseInt(parts[0], 10);
      const ayahNum = parseInt(parts[1], 10);

      if (!isNaN(surahNum) && !isNaN(ayahNum)) {
        const index = ayahs.findIndex(
          (a) => a.surah.number === surahNum && a.numberInSurah === ayahNum,
        );
        if (index !== -1) {
          const tryScroll = (attempt: number) => {
            const element = ayahRefs.current[index];
            if (element) {
              element.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            } else if (attempt < 5) {
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

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      scrollToHashAyah();
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [scrollToHashAyah]);

  useEffect(() => {
    setInitialized(true);
  }, []);

  // Auto-scroll to current playing ayah when it changes
  useEffect(() => {
    if (
      audioState.surah?.number === -juzNumber &&
      audioState.currentAyahIndex !== null
    ) {
      // Check if bismillah is prepended in the audio playlist
      const hasBismillahPrepended =
        audioState.ayahs.length > 0 && audioState.ayahs[0]?.numberInSurah === 0;

      // If bismillah is prepended, adjust the index for the page
      const pageIndex = hasBismillahPrepended
        ? audioState.currentAyahIndex - 1
        : audioState.currentAyahIndex;

      // Only scroll if it's a valid page index (not bismillah itself which is -1 after adjustment)
      if (pageIndex >= 0 && ayahRefs.current[pageIndex]) {
        ayahRefs.current[pageIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [
    audioState.currentAyahIndex,
    audioState.surah?.number,
    audioState.ayahs,
    juzNumber,
  ]);

  // Group ayahs by surah
  const surahGroups = useMemo(() => groupAyahsBySurah(ayahs), [ayahs]);

  // Create a flat index mapping for audio
  const handlePlayAyah = useCallback(
    (index: number) => {
      const targetAyah = ayahs[index];
      if (!targetAyah?.audio) return;

      // Create a virtual surah for the juz audio context
      const virtualSurah = {
        number: -juzNumber, // negative to distinguish from real surahs
        name: `جزء ${toArabicNumber(juzNumber)}`,
        englishName: `Juz ${juzNumber}`,
        englishNameTranslation: `Part ${juzNumber}`,
        numberOfAyahs: ayahs.length,
        revelationType: "Meccan" as const,
        ayahs: [],
      };

      const ayahsForAudio = ayahs.map((a) => ({
        number: a.number,
        numberInSurah: a.numberInSurah,
        arabic: a.arabic,
        translation: a.translation,
        audio: a.audio,
        audioSecondary: a.audioSecondary,
        surah: a.surah,
      }));

      if (audioState.surah?.number !== virtualSurah.number) {
        playWithGesture(targetAyah.audio, virtualSurah, ayahsForAudio, index);
      } else {
        if (audioState.currentAyahIndex === index && audioState.isPlaying) {
          pauseAudio();
        } else if (
          audioState.currentAyahIndex === index &&
          !audioState.isPlaying
        ) {
          resumeAudio();
        } else {
          playWithGesture(targetAyah.audio, virtualSurah, ayahsForAudio, index);
        }
      }
    },
    [
      audioState.surah?.number,
      audioState.currentAyahIndex,
      audioState.isPlaying,
      juzNumber,
      playWithGesture,
      pauseAudio,
      resumeAudio,
      ayahs,
    ],
  );

  const handlePlayAll = useCallback(() => {
    const firstAyah = ayahs[0];
    if (!firstAyah?.audio) return;

    const virtualSurah = {
      number: -juzNumber,
      name: `جزء ${toArabicNumber(juzNumber)}`,
      englishName: `Juz ${juzNumber}`,
      englishNameTranslation: `Part ${juzNumber}`,
      numberOfAyahs: ayahs.length,
      revelationType: "Meccan" as const,
      ayahs: [],
    };

    const ayahsForAudio = ayahs.map((a) => ({
      number: a.number,
      numberInSurah: a.numberInSurah,
      arabic: a.arabic,
      translation: a.translation,
      audio: a.audio,
      audioSecondary: a.audioSecondary,
      surah: a.surah,
    }));

    // Check if the first surah in juz starts at ayah 1 (needs bismillah)
    const firstSurahNumber = ayahs[0]?.surah?.number;
    const startsAtAyah1 = ayahs[0]?.numberInSurah === 1;
    const needsBismillah =
      startsAtAyah1 && firstSurahNumber !== 1 && firstSurahNumber !== 9;

    if (needsBismillah) {
      const bUrl = bismillahAudio?.audio;
      if (bUrl) {
        const bismillahAyah = {
          number: 0,
          numberInSurah: 0,
          arabic: BISMILLAH,
          translation: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",
          audio: bUrl,
          audioSecondary: bismillahAudio?.audioSecondary,
        };
        const ayahsWithBismillah = [bismillahAyah, ...ayahsForAudio];
        playWithGesture(bUrl, virtualSurah, ayahsWithBismillah, 0);
      } else {
        playWithGesture(firstAyah.audio, virtualSurah, ayahsForAudio, 0);
      }
    } else {
      playWithGesture(firstAyah.audio, virtualSurah, ayahsForAudio, 0);
    }
  }, [playWithGesture, ayahs, juzNumber, bismillahAudio]);

  // Check if current juz is playing
  const isCurrentJuz = audioState.surah?.number === -juzNumber;
  const currentPlayingIndex = audioState.currentAyahIndex;
  const isAudioPlaying = audioState.isPlaying;

  // Check if bismillah is prepended in the audio playlist (adjusts index mapping)
  const hasBismillahPrepended =
    isCurrentJuz &&
    audioState.ayahs.length > 0 &&
    audioState.ayahs[0]?.numberInSurah === 0;

  const createPlayHandler = useCallback(
    (index: number) => {
      return () => handlePlayAyah(index);
    },
    [handlePlayAyah],
  );

  const createBookmarkHandler = useCallback(
    (ayah: JuzAyahWithTranslation) => {
      return () =>
        toggleBookmark({
          surahNumber: ayah.surah.number,
          ayahNumber: ayah.numberInSurah,
          surahName: ayah.surah.englishName,
          arabicText: ayah.arabic,
          translation: ayah.translation,
        });
    },
    [toggleBookmark],
  );

  // Pre-compute playing and bookmark states
  // When bismillah is prepended, the audio index is offset by 1
  const ayahStates = useMemo(() => {
    return ayahs.map((ayah, index) => {
      const audioIndex = hasBismillahPrepended ? index + 1 : index;
      return {
        isPlaying:
          isCurrentJuz && currentPlayingIndex === audioIndex && isAudioPlaying,
        isBookmarked: isBookmarked(ayah.surah.number, ayah.numberInSurah),
      };
    });
  }, [
    ayahs,
    isCurrentJuz,
    currentPlayingIndex,
    isAudioPlaying,
    isBookmarked,
    hasBismillahPrepended,
  ]);

  // Compute the flat page index of the currently playing ayah (for per-surat karaoke)
  const playingFlatIndex = useMemo(() => {
    if (!isCurrentJuz || currentPlayingIndex === null) return null;
    const pageIdx = hasBismillahPrepended
      ? currentPlayingIndex - 1
      : currentPlayingIndex;
    return pageIdx >= 0 ? pageIdx : null;
  }, [isCurrentJuz, currentPlayingIndex, hasBismillahPrepended]);

  if (!initialized) return null;

  // Build flat index per ayah for the refs
  let flatIndex = 0;

  return (
    <>
      {/* Unified Controls Toolbar */}
      <div className="controls-toolbar mb-8">
        {/* View Mode Toggle */}
        <div className="inline-flex items-center gap-2">
          <span className="text-xs text-foreground-muted hidden sm:inline">
            Tampilan:
          </span>
          <div className="inline-flex rounded-lg bg-background-alt p-0.5">
            <button
              onClick={() => handleViewModeChange("per-ayat")}
              className={`btn-compact rounded-md transition-all ${
                viewMode === "per-ayat"
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              <i className="ri-list-check-2 mr-1"></i>
              Per Ayat
            </button>
            <button
              onClick={() => handleViewModeChange("per-surat")}
              className={`btn-compact rounded-md transition-all ${
                viewMode === "per-surat"
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              <i className="ri-file-text-line mr-1"></i>
              Per Surat
            </button>
          </div>
        </div>

        {/* Action Buttons Group */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayAll}
            className="btn btn-primary btn-compact"
          >
            <i className="ri-play-fill"></i>
            <span>Putar Semua</span>
          </button>
        </div>
      </div>

      {/* Conditional View Modes */}
      {viewMode === "per-ayat" ? (
        /* Per-Ayat View: Individual AyahCards grouped by surah */
        <div className="space-y-8">
          {surahGroups.map((group, groupIndex) => {
            const groupStartIndex = flatIndex;
            // Only show bismillah for surah transitions within the juz (not the first group)
            const showBismillah =
              groupIndex > 0 &&
              group.ayahs[0]?.numberInSurah === 1 &&
              group.surah.number !== 9 &&
              group.surah.number !== 1;

            return (
              <div
                key={`${group.surah.number}-${group.ayahs[0]?.numberInSurah}`}
              >
                {/* Surah sub-header */}
                <div className="surah-header-card mb-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-arabic text-xl text-primary-dark">
                        {group.surah.name}
                      </span>
                      <div>
                        <Link
                          href={`/surah/${group.surah.number}`}
                          className="font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          {group.surah.englishName}
                        </Link>
                        <p className="text-xs text-foreground-muted">
                          {group.surah.englishNameTranslation}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-sm text-foreground-muted">
                      Ayat {group.ayahs[0].numberInSurah}–
                      {group.ayahs[group.ayahs.length - 1].numberInSurah}
                    </div>
                  </div>
                </div>

                {/* Bismillah */}
                {showBismillah && (
                  <div className="text-center py-4 mb-4">
                    <div className="ornament-divider max-w-xs mx-auto mb-3">
                      <span className="text-ornament text-lg">✦</span>
                    </div>
                    <span className="font-arabic text-2xl md:text-3xl text-primary leading-relaxed">
                      {BISMILLAH}
                    </span>
                    <div className="ornament-divider max-w-xs mx-auto mt-3">
                      <span className="text-ornament text-lg">✦</span>
                    </div>
                  </div>
                )}

                {/* Ayahs */}
                <div className="space-y-6">
                  {group.ayahs.map((ayah, i) => {
                    const globalIndex = groupStartIndex + i;
                    if (i === group.ayahs.length - 1) {
                      flatIndex = globalIndex + 1;
                    }
                    return (
                      <div
                        key={ayah.number}
                        id={`ayah-${ayah.surah.number}-${ayah.numberInSurah}`}
                        ref={(el) => {
                          ayahRefs.current[globalIndex] = el;
                        }}
                      >
                        <AyahCard
                          ayah={{
                            number: ayah.number,
                            numberInSurah: ayah.numberInSurah,
                            arabic: ayah.arabic,
                            translation: ayah.translation,
                            audio: ayah.audio,
                            audioSecondary: ayah.audioSecondary,
                          }}
                          surahNumber={ayah.surah.number}
                          surahName={ayah.surah.englishName}
                          isPlaying={
                            ayahStates[globalIndex]?.isPlaying || false
                          }
                          isBookmarked={
                            ayahStates[globalIndex]?.isBookmarked || false
                          }
                          playbackProgress={
                            ayahStates[globalIndex]?.isPlaying
                              ? audioProgress
                              : undefined
                          }
                          onPlayAudio={createPlayHandler(globalIndex)}
                          onToggleBookmark={createBookmarkHandler(ayah)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Per-Surat View: Continuous Arabic text grouped by surah */
        <div className="space-y-8">
          {surahGroups.map((group, groupIndex) => {
            // Only show bismillah for surah transitions within the juz (not the first group)
            const showBismillah =
              groupIndex > 0 &&
              group.ayahs[0]?.numberInSurah === 1 &&
              group.surah.number !== 9 &&
              group.surah.number !== 1;

            return (
              <div
                key={`${group.surah.number}-${group.ayahs[0]?.numberInSurah}`}
              >
                {/* Surah sub-header */}
                <div className="surah-header-card mb-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-arabic text-xl text-primary-dark">
                        {group.surah.name}
                      </span>
                      <Link
                        href={`/surah/${group.surah.number}`}
                        className="font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {group.surah.englishName}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Bismillah */}
                {showBismillah && (
                  <div className="text-center py-4 mb-2">
                    <span className="font-arabic text-2xl text-primary leading-relaxed">
                      {BISMILLAH}
                    </span>
                  </div>
                )}

                {/* Continuous text with character-by-character karaoke */}
                <div className="card fade-in">
                  <p className="continuous-arabic-view font-arabic" dir="rtl">
                    {group.ayahs.map((ayah, index) => {
                      // Compute the flat index for this ayah across all groups
                      const groupOffset = ayahs.findIndex(
                        (a) => a.number === group.ayahs[0].number,
                      );
                      const flatIdx = groupOffset + index;
                      const isActiveAyah =
                        playingFlatIndex === flatIdx && isAudioPlaying;
                      const arabicChars = Array.from(ayah.arabic);
                      const highlightedCharCount = isActiveAyah
                        ? Math.floor((audioProgress / 100) * arabicChars.length)
                        : 0;

                      return (
                        <span key={ayah.number} className="font-arabic">
                          {arabicChars.map((char, charIndex) => (
                            <span
                              key={charIndex}
                              className={
                                isActiveAyah && charIndex < highlightedCharCount
                                  ? "arabic-karaoke-char"
                                  : ""
                              }
                            >
                              {char}
                            </span>
                          ))}
                          <span className="ayah-end-marker">
                            {toArabicNumber(ayah.numberInSurah)}
                          </span>
                          {index < group.ayahs.length - 1 && " "}
                        </span>
                      );
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
