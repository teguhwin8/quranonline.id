'use client';

import { SurahDetail, AyahWithTranslation } from '@/types/quran';

// Convert Western numerals to Eastern Arabic-Indic numerals
const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const toArabicNumber = (num: number): string => {
    return num.toString().split('').map(digit => arabicNumerals[parseInt(digit)]).join('');
};

// Ayah end marker
const AYAH_END = '۝';

interface GeneratePDFOptions {
    surah: SurahDetail;
    ayahs: AyahWithTranslation[];
    includeBismillah?: boolean;
}

export async function generateSurahPDF({ surah, ayahs, includeBismillah = true }: GeneratePDFOptions): Promise<void> {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert('Popup diblokir. Mohon izinkan popup untuk download PDF.');
        return;
    }

    // Build HTML content
    const bismillah = includeBismillah && surah.number !== 9 && surah.number !== 1
        ? '<p class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>'
        : '';

    const ayahsHtml = ayahs.map((ayah) =>
        `<span class="ayah">${ayah.arabic} <span class="marker">${AYAH_END}${toArabicNumber(ayah.numberInSurah)}</span></span>`
    ).join(' ');

    const html = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>${surah.englishName} - ${surah.name}</title>
    <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap" rel="stylesheet">
    <style>
        @page {
            size: A4 portrait;
            margin: 0.5cm;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Amiri', serif;
            direction: rtl;
            text-align: justify;
            line-height: 2.2;
            padding: 0.5cm;
            background: white;
            color: #1a1a1a;
        }
        
        .header {
            text-align: center;
            margin-bottom: 0.5cm;
            padding-bottom: 0.3cm;
            border-bottom: 1px solid #1b5e20;
        }
        
        .header h1 {
            font-size: 16pt;
            color: #1b5e20;
        }
        
        .header .arabic-name {
            font-size: 22pt;
            margin-bottom: 0.1cm;
        }
        
        .header .info {
            font-size: 10pt;
            color: #888;
        }
        
        .bismillah {
            text-align: center;
            font-size: 48pt;
            color: #1b5e20;
            margin-bottom: 0.5cm;
        }
        
        .content {
            font-size: 56pt;
            line-height: 2;
            text-align: justify;
            text-justify: inter-word;
        }
        
        .ayah {
            display: inline;
        }
        
        .marker {
            color: #1b5e20;
            font-size: 44pt;
            margin: 0 0.1em;
        }
        
        .footer {
            margin-top: 1cm;
            padding-top: 0.3cm;
            border-top: 1px solid #ccc;
            text-align: center;
            font-size: 10pt;
            color: #888;
            direction: ltr;
        }
        
        @media print {
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="arabic-name">${surah.name}</div>
        <h1>${surah.englishName}</h1>
        <div class="info">${surah.englishNameTranslation} • ${surah.numberOfAyahs} Ayat • ${surah.revelationType === 'Meccan' ? 'Makkiyah' : 'Madaniyah'}</div>
    </div>
    
    ${bismillah}
    
    <div class="content">
        ${ayahsHtml}
    </div>
    
    <div class="footer">
        Generated from quranonline.id
    </div>
</body>
</html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();

    // Wait for fonts to load, then trigger print
    printWindow.onload = () => {
        setTimeout(() => {
            printWindow.print();
        }, 500);
    };
}
