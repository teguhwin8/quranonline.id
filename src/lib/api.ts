import {
    ApiResponse,
    Surah,
    SurahDetail,
    SearchResult,
    AyahWithTranslation,
    JuzDetail,
    JuzAyahWithTranslation,
} from '@/types/quran';

const BASE_URL = 'https://api.alquran.cloud/v1';

// Arabic edition (Uthmani script)
const ARABIC_EDITION = 'quran-uthmani';
// Indonesian translation
const TRANSLATION_EDITION = 'id.indonesian';
// Default audio edition (Mishary Alafasy)
const DEFAULT_AUDIO_EDITION = 'ar.alafasy';

/**
 * Fetch all 114 Surahs
 */
export async function getSurahList(): Promise<Surah[]> {
    const res = await fetch(`${BASE_URL}/surah`, {
        next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!res.ok) {
        throw new Error('Failed to fetch surah list');
    }

    const data: ApiResponse<Surah[]> = await res.json();
    return data.data;
}

/**
 * Fetch a single Surah with Arabic text
 */
export async function getSurah(number: number): Promise<SurahDetail> {
    const res = await fetch(`${BASE_URL}/surah/${number}/${ARABIC_EDITION}`, {
        next: { revalidate: 86400 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch surah ${number}`);
    }

    const data: ApiResponse<SurahDetail> = await res.json();
    return data.data;
}

/**
 * Fetch a single Surah with translation
 */
export async function getSurahTranslation(number: number): Promise<SurahDetail> {
    const res = await fetch(`${BASE_URL}/surah/${number}/${TRANSLATION_EDITION}`, {
        next: { revalidate: 86400 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch surah translation ${number}`);
    }

    const data: ApiResponse<SurahDetail> = await res.json();
    return data.data;
}

/**
 * Fetch a single Surah with audio
 */
export async function getSurahAudio(number: number, reciterIdentifier: string = DEFAULT_AUDIO_EDITION): Promise<SurahDetail> {
    const res = await fetch(`${BASE_URL}/surah/${number}/${reciterIdentifier}`, {
        next: { revalidate: 86400 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch surah audio ${number}`);
    }

    const data: ApiResponse<SurahDetail> = await res.json();
    return data.data;
}

/**
 * Fetch Surah with Arabic, Translation, and Audio combined
 */
export async function getSurahComplete(number: number, reciterIdentifier: string = DEFAULT_AUDIO_EDITION): Promise<{
    surah: SurahDetail;
    ayahs: AyahWithTranslation[];
}> {
    const [arabic, translation, audio] = await Promise.all([
        getSurah(number),
        getSurahTranslation(number),
        getSurahAudio(number, reciterIdentifier),
    ]);

    const ayahs: AyahWithTranslation[] = arabic.ayahs.map((ayah, index) => {
        let arabicText = ayah.text;

        // Remove bismillah from first ayah (except for surah At-Taubah which doesn't have it, and Al-Fatihah where it IS the first ayah)
        if (index === 0 && number !== 9 && number !== 1) {
            // Remove bismillah patterns - various Unicode representations
            // Match: بِسْمِ or بِسۡمِ followed by Allah, Ar-Rahman, Ar-Rahim
            arabicText = arabicText
                .replace(/^بِسْمِ\s*اللَّهِ\s*الرَّحْمَٰنِ\s*الرَّحِيمِ\s*/u, '')
                .replace(/^بِسۡمِ\s*ٱللَّهِ\s*ٱلرَّحۡمَٰنِ\s*ٱلرَّحِيمِ\s*/u, '')
                .replace(/^بِسْمِ\s*ٱللَّهِ\s*ٱلرَّحْمَٰنِ\s*ٱلرَّحِيمِ\s*/u, '')
                // Generic pattern: match any bismillah starting pattern
                .replace(/^بِسْمِ[^\s]*\s+[^\s]+\s+[^\s]+\s+[^\s]+\s*/u, '')
                .trim();
        }

        return {
            number: ayah.number,
            numberInSurah: ayah.numberInSurah,
            arabic: arabicText,
            translation: translation.ayahs[index]?.text || '',
            audio: audio.ayahs[index]?.audio,
            audioSecondary: audio.ayahs[index]?.audioSecondary,
        };
    });

    return {
        surah: arabic,
        ayahs,
    };
}

/**
 * Fetch bismillah audio URL for a specific reciter
 * Bismillah = ayah 1 of Al-Fatihah (global ayah number 1)
 */
export async function getBismillahAudio(reciterIdentifier: string = DEFAULT_AUDIO_EDITION): Promise<{
    audio: string;
    audioSecondary?: string[];
}> {
    try {
        const res = await fetch(`${BASE_URL}/ayah/1/${reciterIdentifier}`);
        if (!res.ok) {
            throw new Error('Failed to fetch bismillah audio');
        }
        const data = await res.json();
        return {
            audio: data.data.audio,
            audioSecondary: data.data.audioSecondary,
        };
    } catch {
        // Fallback: construct URL manually as last resort
        return {
            audio: `https://cdn.islamic.network/quran/audio/128/${reciterIdentifier}/1.mp3`,
        };
    }
}

/**
 * Search in Quran (Indonesian translation)
 */
export async function searchQuran(query: string): Promise<SearchResult> {
    const encodedQuery = encodeURIComponent(query);
    const res = await fetch(`${BASE_URL}/search/${encodedQuery}/all/${TRANSLATION_EDITION}`, {
        next: { revalidate: 86400 }, // Cache for 1 day
    });

    if (!res.ok) {
        // Return empty result if search fails
        return { count: 0, matches: [] };
    }

    const data: ApiResponse<SearchResult> = await res.json();
    return data.data;
}

/**
 * Get specific Ayah with Arabic and Translation
 */
export async function getAyah(
    surahNumber: number,
    ayahNumber: number
): Promise<AyahWithTranslation | null> {
    const reference = `${surahNumber}:${ayahNumber}`;

    try {
        const audioEdition = DEFAULT_AUDIO_EDITION;
        const [arabicRes, translationRes, audioRes] = await Promise.all([
            fetch(`${BASE_URL}/ayah/${reference}/${ARABIC_EDITION}`),
            fetch(`${BASE_URL}/ayah/${reference}/${TRANSLATION_EDITION}`),
            fetch(`${BASE_URL}/ayah/${reference}/${audioEdition}`),
        ]);

        if (!arabicRes.ok || !translationRes.ok) {
            return null;
        }

        const arabicData = await arabicRes.json();
        const translationData = await translationRes.json();
        const audioData = audioRes.ok ? await audioRes.json() : null;

        return {
            number: arabicData.data.number,
            numberInSurah: arabicData.data.numberInSurah,
            arabic: arabicData.data.text,
            translation: translationData.data.text,
            audio: audioData?.data?.audio,
        };
    } catch {
        return null;
    }
}

/**
 * Fetch a single Juz with Arabic text
 */
export async function getJuz(number: number): Promise<JuzDetail> {
    const res = await fetch(`${BASE_URL}/juz/${number}/${ARABIC_EDITION}`, {
        next: { revalidate: 86400 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch juz ${number}`);
    }

    const data: ApiResponse<JuzDetail> = await res.json();
    return data.data;
}

/**
 * Fetch a single Juz with translation
 */
export async function getJuzTranslation(number: number): Promise<JuzDetail> {
    const res = await fetch(`${BASE_URL}/juz/${number}/${TRANSLATION_EDITION}`, {
        next: { revalidate: 86400 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch juz translation ${number}`);
    }

    const data: ApiResponse<JuzDetail> = await res.json();
    return data.data;
}

/**
 * Fetch a single Juz with audio
 */
export async function getJuzAudio(number: number, reciterIdentifier: string = DEFAULT_AUDIO_EDITION): Promise<JuzDetail> {
    const res = await fetch(`${BASE_URL}/juz/${number}/${reciterIdentifier}`, {
        next: { revalidate: 86400 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch juz audio ${number}`);
    }

    const data: ApiResponse<JuzDetail> = await res.json();
    return data.data;
}

/**
 * Fetch Juz with Arabic, Translation, and Audio combined
 */
export async function getJuzComplete(number: number, reciterIdentifier: string = DEFAULT_AUDIO_EDITION): Promise<{
    juzNumber: number;
    ayahs: JuzAyahWithTranslation[];
}> {
    const [arabic, translation, audio] = await Promise.all([
        getJuz(number),
        getJuzTranslation(number),
        getJuzAudio(number, reciterIdentifier),
    ]);

    // Bismillah prefix in quran-uthmani edition (prepended to ayah 1 of most surahs)
    // Must use NFC normalization because the API and code may have diacritics in different order
    const BISMILLAH_PREFIX = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ';
    const BISMILLAH_NFC = BISMILLAH_PREFIX.normalize('NFC');

    const ayahs: JuzAyahWithTranslation[] = arabic.ayahs.map((ayah, index) => {
        let arabicText = ayah.text;

        // Strip bismillah from displayed text of ayah 1 (except Al-Fatihah & At-Taubah)
        // Audio still contains bismillah recitation
        if (ayah.numberInSurah === 1 && ayah.surah.number !== 1 && ayah.surah.number !== 9) {
            const normalized = arabicText.normalize('NFC');
            if (normalized.startsWith(BISMILLAH_NFC)) {
                arabicText = normalized.slice(BISMILLAH_NFC.length).trim();
            }
        }

        return {
            number: ayah.number,
            numberInSurah: ayah.numberInSurah,
            arabic: arabicText,
            translation: translation.ayahs[index]?.text || '',
            audio: audio.ayahs[index]?.audio,
            audioSecondary: audio.ayahs[index]?.audioSecondary,
            surah: ayah.surah,
        };
    });

    return {
        juzNumber: number,
        ayahs,
    };
}
