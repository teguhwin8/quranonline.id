/**
 * Convert English/international Quran transliteration to Indonesian convention
 * based on Pedoman Transliterasi Arab-Latin (SKB Menteri Agama & Mendikbud 1987)
 *
 * Differences handled:
 *   ee  → ii   (vokal panjang i: ī)
 *   oo  → uu   (vokal panjang u: ū)
 *   sh  → sy   (ش)
 *   th  → ts   (ث)
 *   dh  → dz   (ذ — API pakai "dh" untuk ذ di posisi lain)
 *   nz  → ndz  (نذ — API pakai "z" untuk ذ setelah nun, misal: لِتُنذِرَ → Litunzira → Litundzira)
 *
 * Note: API pakai "z" untuk ز, ذ, dan ظ sekaligus sehingga tidak semua "z"
 * bisa dikonversi — hanya pola "nz" (nunذ) yang aman dikonversi ke "ndz".
 */

type Rule = [RegExp, string | ((m: string) => string)];

/** Preserve casing of the original match onto the replacement string */
function matchCase(original: string, replacement: string): string {
    if (original === original.toUpperCase()) return replacement.toUpperCase();
    if (original[0] === original[0].toUpperCase()) {
        return replacement[0].toUpperCase() + replacement.slice(1).toLowerCase();
    }
    return replacement.toLowerCase();
}

function rule(pattern: RegExp, repl: string): Rule {
    return [pattern, (m: string) => matchCase(m, repl)];
}

const RULES: Rule[] = [
    // ── Vowel length ──────────────────────────────────────────────────────────
    // e+ → same count of i  (handles ee→ii, eee→iii, etc.)
    [/e+/gi, (m: string) => matchCase(m, 'i'.repeat(m.length))],

    // o+ → same count of u  (handles oo→uu, ooo→uuu, etc.)
    [/o+/gi, (m: string) => matchCase(m, 'u'.repeat(m.length))],

    // ── Consonant clusters ────────────────────────────────────────────────────
    // nz → ndz  (ن + ز, ikhfa/idgham convention in Indonesian)
    rule(/nz/gi, 'ndz'),

    // sh → sy  (ش)
    rule(/sh/gi, 'sy'),

    // th → ts  (ث) — careful: only when it represents ث, not English "th"
    // In Quran transliteration "th" at start of syllable = ث
    rule(/\bth/gi, 'ts'),
    rule(/(?<=[aeiouāīū])th/gi, 'ts'),

    // dh → dz  (ذ)
    rule(/dh/gi, 'dz'),
];

export function toIndonesianTransliteration(text: string): string {
    let result = text;
    for (const [pattern, replacement] of RULES) {
        if (typeof replacement === 'string') {
            result = result.replace(pattern, replacement);
        } else {
            result = result.replace(pattern, replacement);
        }
    }
    return result;
}
