'use client';

import { memo } from 'react';
import { AyahWithTranslation } from '@/types/quran';

// Convert Western numerals to Eastern Arabic-Indic numerals (٠١٢٣٤٥٦٧٨٩)
const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const toArabicNumber = (num: number): string => {
    return num.toString().split('').map(digit => arabicNumerals[parseInt(digit)]).join('');
};

interface AyahCardProps {
    ayah: AyahWithTranslation;
    surahNumber: number;
    surahName: string;
    isPlaying?: boolean;
    isBookmarked?: boolean;
    onPlayAudio?: () => void;
    onToggleBookmark?: () => void;
}

// Memoized to prevent re-renders when parent re-renders
// Only re-renders when its own props change
function AyahCard({
    ayah,
    isPlaying = false,
    isBookmarked = false,
    onPlayAudio,
    onToggleBookmark,
}: AyahCardProps) {
    return (
        <article className="card fade-in">
            {/* Header with actions - right aligned */}
            <div className="flex items-center justify-end gap-2 mb-4">
                {/* Play Button */}
                {ayah.audio && onPlayAudio && (
                    <button
                        onClick={onPlayAudio}
                        className={`icon-btn ${isPlaying ? 'bg-primary text-white' : 'hover:bg-primary-light'}`}
                        aria-label={isPlaying ? 'Sedang diputar' : 'Putar audio'}
                    >
                        <i className={`${isPlaying ? 'ri-pause-fill' : 'ri-play-fill'} text-lg`}></i>
                    </button>
                )}

                {/* Bookmark Button */}
                {onToggleBookmark && (
                    <button
                        onClick={onToggleBookmark}
                        className={`icon-btn ${isBookmarked ? 'text-gold' : 'hover:text-gold'}`}
                        aria-label={isBookmarked ? 'Hapus bookmark' : 'Tambah bookmark'}
                    >
                        <i className={`${isBookmarked ? 'ri-bookmark-fill' : 'ri-bookmark-line'} text-lg`}></i>
                    </button>
                )}
            </div>

            {/* Arabic Text with verse number */}
            <p className="arabic-text-lg mb-6 leading-loose font-arabic text-right" dir="rtl">
                {ayah.arabic}
                {' '}
                <span className="ayah-end-marker">
                    {toArabicNumber(ayah.numberInSurah)}
                </span>
            </p>

            {/* Translation */}
            <p className="text-foreground-muted leading-relaxed">
                {ayah.translation}
            </p>
        </article>
    );
}

export default memo(AyahCard);
