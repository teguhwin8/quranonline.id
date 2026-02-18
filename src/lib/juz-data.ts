// Static data for 30 Juz of the Quran
// Each juz has a name (the first word/phrase of the juz) and range info

export interface JuzInfo {
    number: number;
    nameArabic: string; // First word/phrase of the juz
    startSurah: number;
    startSurahName: string;
    startAyah: number;
    endSurah: number;
    endSurahName: string;
    endAyah: number;
}

export const JUZ_DATA: JuzInfo[] = [
    { number: 1, nameArabic: 'الٓمٓ', startSurah: 1, startSurahName: 'Al-Faatiha', startAyah: 1, endSurah: 2, endSurahName: 'Al-Baqara', endAyah: 141 },
    { number: 2, nameArabic: 'سَيَقُولُ', startSurah: 2, startSurahName: 'Al-Baqara', startAyah: 142, endSurah: 2, endSurahName: 'Al-Baqara', endAyah: 252 },
    { number: 3, nameArabic: 'تِلْكَ ٱلرُّسُلُ', startSurah: 2, startSurahName: 'Al-Baqara', startAyah: 253, endSurah: 3, endSurahName: 'Aal-i-Imraan', endAyah: 92 },
    { number: 4, nameArabic: 'لَن تَنَالُوا۟', startSurah: 3, startSurahName: 'Aal-i-Imraan', startAyah: 93, endSurah: 4, endSurahName: 'An-Nisaa', endAyah: 23 },
    { number: 5, nameArabic: 'وَٱلْمُحْصَنَاتُ', startSurah: 4, startSurahName: 'An-Nisaa', startAyah: 24, endSurah: 4, endSurahName: 'An-Nisaa', endAyah: 147 },
    { number: 6, nameArabic: 'لَا يُحِبُّ ٱللَّهُ', startSurah: 4, startSurahName: 'An-Nisaa', startAyah: 148, endSurah: 5, endSurahName: 'Al-Maaida', endAyah: 81 },
    { number: 7, nameArabic: 'وَإِذَا سَمِعُوا۟', startSurah: 5, startSurahName: 'Al-Maaida', startAyah: 82, endSurah: 6, endSurahName: 'Al-An\'aam', endAyah: 110 },
    { number: 8, nameArabic: 'وَلَوْ أَنَّنَا', startSurah: 6, startSurahName: 'Al-An\'aam', startAyah: 111, endSurah: 7, endSurahName: 'Al-A\'raaf', endAyah: 87 },
    { number: 9, nameArabic: 'قَالَ ٱلْمَلَأُ', startSurah: 7, startSurahName: 'Al-A\'raaf', startAyah: 88, endSurah: 8, endSurahName: 'Al-Anfaal', endAyah: 40 },
    { number: 10, nameArabic: 'وَٱعْلَمُوٓا۟', startSurah: 8, startSurahName: 'Al-Anfaal', startAyah: 41, endSurah: 9, endSurahName: 'At-Tawba', endAyah: 92 },
    { number: 11, nameArabic: 'يَعْتَذِرُونَ', startSurah: 9, startSurahName: 'At-Tawba', startAyah: 93, endSurah: 11, endSurahName: 'Hud', endAyah: 5 },
    { number: 12, nameArabic: 'وَمَا مِن دَآبَّةٍ', startSurah: 11, startSurahName: 'Hud', startAyah: 6, endSurah: 12, endSurahName: 'Yusuf', endAyah: 52 },
    { number: 13, nameArabic: 'وَمَا أُبَرِّئُ', startSurah: 12, startSurahName: 'Yusuf', startAyah: 53, endSurah: 14, endSurahName: 'Ibrahim', endAyah: 52 },
    { number: 14, nameArabic: 'رُبَمَا', startSurah: 15, startSurahName: 'Al-Hijr', startAyah: 1, endSurah: 16, endSurahName: 'An-Nahl', endAyah: 128 },
    { number: 15, nameArabic: 'سُبْحَانَ ٱلَّذِىٓ', startSurah: 17, startSurahName: 'Al-Israa', startAyah: 1, endSurah: 18, endSurahName: 'Al-Kahf', endAyah: 74 },
    { number: 16, nameArabic: 'قَالَ أَلَمْ', startSurah: 18, startSurahName: 'Al-Kahf', startAyah: 75, endSurah: 20, endSurahName: 'Taa-Haa', endAyah: 135 },
    { number: 17, nameArabic: 'ٱقْتَرَبَ لِلنَّاسِ', startSurah: 21, startSurahName: 'Al-Anbiyaa', startAyah: 1, endSurah: 22, endSurahName: 'Al-Hajj', endAyah: 78 },
    { number: 18, nameArabic: 'قَدْ أَفْلَحَ', startSurah: 23, startSurahName: 'Al-Muminoon', startAyah: 1, endSurah: 25, endSurahName: 'Al-Furqaan', endAyah: 20 },
    { number: 19, nameArabic: 'وَقَالَ ٱلَّذِينَ', startSurah: 25, startSurahName: 'Al-Furqaan', startAyah: 21, endSurah: 27, endSurahName: 'An-Naml', endAyah: 55 },
    { number: 20, nameArabic: 'أَمَّنْ خَلَقَ', startSurah: 27, startSurahName: 'An-Naml', startAyah: 56, endSurah: 29, endSurahName: 'Al-Ankaboot', endAyah: 45 },
    { number: 21, nameArabic: 'أُتْلُ مَا أُوحِيَ', startSurah: 29, startSurahName: 'Al-Ankaboot', startAyah: 46, endSurah: 33, endSurahName: 'Al-Ahzaab', endAyah: 30 },
    { number: 22, nameArabic: 'وَمَن يَقْنُتْ', startSurah: 33, startSurahName: 'Al-Ahzaab', startAyah: 31, endSurah: 36, endSurahName: 'Yaseen', endAyah: 27 },
    { number: 23, nameArabic: 'وَمَا لِيَ', startSurah: 36, startSurahName: 'Yaseen', startAyah: 28, endSurah: 39, endSurahName: 'Az-Zumar', endAyah: 31 },
    { number: 24, nameArabic: 'فَمَنْ أَظْلَمُ', startSurah: 39, startSurahName: 'Az-Zumar', startAyah: 32, endSurah: 41, endSurahName: 'Fussilat', endAyah: 46 },
    { number: 25, nameArabic: 'إِلَيْهِ يُرَدُّ', startSurah: 41, startSurahName: 'Fussilat', startAyah: 47, endSurah: 45, endSurahName: 'Al-Jaathiya', endAyah: 37 },
    { number: 26, nameArabic: 'حمٓ', startSurah: 46, startSurahName: 'Al-Ahqaf', startAyah: 1, endSurah: 51, endSurahName: 'Adh-Dhaariyat', endAyah: 30 },
    { number: 27, nameArabic: 'قَالَ فَمَا خَطْبُكُمْ', startSurah: 51, startSurahName: 'Adh-Dhaariyat', startAyah: 31, endSurah: 57, endSurahName: 'Al-Hadid', endAyah: 29 },
    { number: 28, nameArabic: 'قَدْ سَمِعَ ٱللَّهُ', startSurah: 58, startSurahName: 'Al-Mujaadila', startAyah: 1, endSurah: 66, endSurahName: 'At-Tahrim', endAyah: 12 },
    { number: 29, nameArabic: 'تَبَارَكَ ٱلَّذِى', startSurah: 67, startSurahName: 'Al-Mulk', startAyah: 1, endSurah: 77, endSurahName: 'Al-Mursalaat', endAyah: 50 },
    { number: 30, nameArabic: 'عَمَّ يَتَسَآءَلُونَ', startSurah: 78, startSurahName: 'An-Naba', startAyah: 1, endSurah: 114, endSurahName: 'An-Naas', endAyah: 6 },
];
