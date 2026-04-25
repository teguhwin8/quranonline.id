'use client';

import { SurahDetail, AyahWithTranslation } from '@/types/quran';
import {
    PDFSettings,
    resolveMargin,
    resolvePaperSize,
    resolveArabicFontSize,
    resolveTranslationFontSize,
    resolveTransliterationFontSize,
} from '@/components/PDFSettingsModal';
import { toIndonesianTransliteration } from '@/lib/transliteration';

// Convert Western numerals to Eastern Arabic-Indic numerals
const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const toArabicNumber = (num: number): string =>
    num.toString().split('').map(d => arabicNumerals[Number.parseInt(d)]).join('');

const AYAH_END = '۝';

interface GeneratePDFOptions {
    surah: SurahDetail;
    ayahs: AyahWithTranslation[];
    includeBismillah?: boolean;
    settings: PDFSettings;
}

export async function generateSurahPDF({ surah, ayahs, includeBismillah = true, settings }: GeneratePDFOptions): Promise<void> {
    const printWindow = globalThis.window.open('', '_blank');
    if (!printWindow) {
        alert('Popup diblokir. Mohon izinkan popup untuk download PDF.');
        return;
    }

    const margin = resolveMargin(settings);
    const paperSize = resolvePaperSize(settings);
    const arabicSize = resolveArabicFontSize(settings);
    const translationSize = resolveTranslationFontSize(settings);
    const transliterationSize = resolveTransliterationFontSize(settings);
    const markerSize = Math.round(arabicSize * 0.78);

    const bismillah = includeBismillah && surah.number !== 9 && surah.number !== 1
        ? `<p class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>`
        : '';

    const ayahsHtml = ayahs.map((ayah) => {
        const rawLatin = ayah.transliteration ?? '';
        const latinText = rawLatin ? toIndonesianTransliteration(rawLatin) : '';
        const latin = settings.includeTransliteration && latinText
            ? `<span class="transliteration">${latinText}</span>`
            : '';
        const translation = settings.includeTranslation && ayah.translation
            ? `<span class="translation">${ayah.numberInSurah}. ${ayah.translation}</span>`
            : '';
        const hasExtra = latin || translation;
        return `<span class="ayah-wrap${hasExtra ? ' ayah-wrap--block' : ''}">
            <span class="ayah">${ayah.arabic} <span class="marker">${AYAH_END}${toArabicNumber(ayah.numberInSurah)}</span></span>
            ${latin}${translation}
        </span>`;
    }).join(' ');

    const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>${surah.englishName} - ${surah.name}</title>
    <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap" rel="stylesheet">
    <style>
        @page { size: ${paperSize} portrait; margin: ${margin}; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Amiri', serif;
            direction: rtl;
            text-align: justify;
            line-height: 2.2;
            padding: ${margin};
            background: white;
            color: #717171;
        }
        .header { text-align: center; margin-bottom: 0.5cm; }
        .header .arabic-name { font-size: 22pt; margin-bottom: 0.1cm; }
        .bismillah { text-align: center; font-size: ${arabicSize}pt; margin-bottom: 0.5cm; }
        .content { font-size: ${arabicSize}pt; line-height: 2; text-align: justify; text-justify: inter-word; }
        .ayah-wrap { display: inline; }
        .ayah-wrap--block { display: block; margin-bottom: 0.4cm; }
        .ayah { display: inline; }
        .marker { font-size: ${markerSize}pt; margin: 0 0.1em; }
        .transliteration {
            display: block;
            direction: ltr;
            text-align: left;
            font-size: ${transliterationSize}pt;
            font-family: Georgia, serif;
            font-style: italic;
            color: #444;
            line-height: 1.5;
            margin-top: 0.15cm;
        }
        .translation {
            display: block;
            direction: ltr;
            text-align: left;
            font-size: ${translationSize}pt;
            color: #555;
            font-family: sans-serif;
            line-height: 1.6;
            margin-top: 0.1cm;
            padding-left: 0.3cm;
            border-left: 2px solid #ccc;
        }
        @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="arabic-name">${surah.name}</div>
    </div>
    ${bismillah}
    <div class="content">${ayahsHtml}</div>
</body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();

    printWindow.onload = () => {
        setTimeout(() => { printWindow.print(); }, 500);
    };
}
