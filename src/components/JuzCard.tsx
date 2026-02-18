import { memo } from 'react';
import Link from 'next/link';
import { JuzInfo } from '@/lib/juz-data';

interface JuzCardProps {
    juz: JuzInfo;
}

// Convert number to Arabic-Indic numerals
function toArabicNumeral(num: number): string {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');
}

function JuzCard({ juz }: JuzCardProps) {
    return (
        <Link href={`/juz/${juz.number}`}>
            <article className="card group cursor-pointer h-full !py-2 !px-3 md:py-3 md:px-4">
                <div className="flex items-center gap-4">
                    {/* Juz Number with Arabic numeral and decorative frame */}
                    <div className="surah-number-badge shrink-0">
                        <span className="surah-number-frame">۝</span>
                        <span className="surah-number-text">{toArabicNumeral(juz.number)}</span>
                    </div>

                    {/* Juz Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                    Juz {juz.number}
                                </h3>
                                <p className="text-xs text-foreground-muted truncate">
                                    {juz.startSurahName} {juz.startAyah} — {juz.endSurahName} {juz.endAyah}
                                </p>
                            </div>

                            {/* Arabic Name */}
                            <span className="font-arabic text-lg text-primary-dark shrink-0">
                                {juz.nameArabic}
                            </span>
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-foreground-muted">
                            <span className="flex items-center gap-1">
                                <i className="ri-book-open-line text-xs"></i>
                                {juz.startSurahName}
                                {juz.startSurah !== juz.endSurah && ` — ${juz.endSurahName}`}
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default memo(JuzCard);
