// Surah (Chapter) types
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

// Ayah (Verse) types
export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  audio?: string;
  audioSecondary?: string[];
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
}

// Full Surah with Ayahs
export interface SurahDetail {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  ayahs: Ayah[];
}

// API Response wrapper
export interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

// Edition/Translation
export interface Edition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: 'text' | 'audio';
  type: 'quran' | 'translation' | 'transliteration' | 'tafsir';
}

// Search result
export interface SearchResult {
  count: number;
  matches: SearchMatch[];
}

export interface SearchMatch {
  number: number;
  text: string;
  surah: Surah;
  numberInSurah: number;
  edition: Edition;
}

// Bookmark
export interface Bookmark {
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  arabicText: string;
  translation: string;
  createdAt: number;
}

// Audio reciter
export interface Reciter {
  identifier: string;
  name: string;
  englishName: string;
}

// Combined Ayah with translation
export interface AyahWithTranslation {
  number: number;
  numberInSurah: number;
  arabic: string;
  translation: string;
  audio?: string;
  audioSecondary?: string[];
  surah?: Surah;
}

// Juz Ayah (from juz API - includes surah info per ayah)
export interface JuzAyah {
  number: number;
  text: string;
  surah: Surah;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
  audio?: string;
  audioSecondary?: string[];
}

// Juz detail response
export interface JuzDetail {
  number: number;
  ayahs: JuzAyah[];
}

// Combined Juz Ayah with translation
export interface JuzAyahWithTranslation {
  number: number;
  numberInSurah: number;
  arabic: string;
  translation: string;
  audio?: string;
  audioSecondary?: string[];
  surah: Surah;
}
