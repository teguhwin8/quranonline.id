import {
    ApiResponse,
    Surah,
    SurahDetail,
    SearchResult,
    AyahWithTranslation,
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
        };
    });

    return {
        surah: arabic,
        ayahs,
    };
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
