'use client';

import { AyahWithTranslation } from '@/types/quran';

interface AyahCardProps {
    ayah: AyahWithTranslation;
    surahNumber: number;
    surahName: string;
    isPlaying?: boolean;
    isBookmarked?: boolean;
    onPlayAudio?: () => void;
    onToggleBookmark?: () => void;
}

export default function AyahCard({
    ayah,
    isPlaying = false,
    isBookmarked = false,
    onPlayAudio,
    onToggleBookmark,
}: AyahCardProps) {
    return (
        <article className="card fade-in">
            {/* Header with actions */}
            <div className="flex items-center justify-between mb-4">
                <div className="ayah-number">
                    {ayah.numberInSurah}
                </div>

                <div className="flex items-center gap-2">
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
            </div>

            {/* Arabic Text */}
            <p className="arabic-text-lg mb-6 leading-loose font-arabic text-right" dir="rtl">
                {ayah.arabic}
            </p>

            {/* Translation */}
            <p className="text-foreground-muted leading-relaxed">
                {ayah.translation}
            </p>
        </article>
    );
}
