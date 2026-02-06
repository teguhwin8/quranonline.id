import { memo } from 'react';
import Link from 'next/link';
import { Surah } from '@/types/quran';
import { SURAH_MEANING_ID } from '@/lib/surah-translations';

interface SurahCardProps {
    surah: Surah;
}

// Convert number to Arabic-Indic numerals
function toArabicNumeral(num: number): string {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');
}

// Memoized to prevent re-renders when parent re-renders
function SurahCard({ surah }: SurahCardProps) {
    return (
        <Link href={`/surah/${surah.number}`}>
            <article className="card group cursor-pointer h-full !py-2 !px-3 md:py-3 md:px-4">
                <div className="flex items-center gap-4">
                    {/* Surah Number with Arabic numeral and decorative frame */}
                    <div className="surah-number-badge shrink-0">
                        <span className="surah-number-frame">۝</span>
                        <span className="surah-number-text">{toArabicNumeral(surah.number)}</span>
                    </div>

                    {/* Surah Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                    {surah.englishName}
                                </h3>
                                <p className="text-xs text-foreground-muted truncate">
                                    {SURAH_MEANING_ID[surah.number] || surah.englishNameTranslation}
                                </p>
                            </div>

                            {/* Arabic Name */}
                            <span className="font-arabic text-lg text-primary-dark shrink-0">
                                {surah.name}
                            </span>
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-foreground-muted">
                            <span className="flex items-center gap-1">
                                <i className="ri-file-list-2-line text-xs"></i>
                                {surah.numberOfAyahs} ayat
                            </span>
                            <span className="flex items-center gap-1">
                                <i className="ri-map-pin-line text-xs"></i>
                                {surah.revelationType === 'Meccan' ? 'Makkiyah' : 'Madaniyah'}
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default memo(SurahCard);
