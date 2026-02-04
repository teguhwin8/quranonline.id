import { memo } from 'react';
import Link from 'next/link';
import { Surah } from '@/types/quran';

interface SurahCardProps {
    surah: Surah;
}

// Memoized to prevent re-renders when parent re-renders
function SurahCard({ surah }: SurahCardProps) {
    return (
        <Link href={`/surah/${surah.number}`}>
            <article className="card group cursor-pointer h-full">
                <div className="flex items-start gap-4">
                    {/* Surah Number */}
                    <div className="ayah-number shrink-0">
                        {surah.number}
                    </div>

                    {/* Surah Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {surah.englishName}
                                </h3>
                                <p className="text-sm text-foreground-muted">
                                    {surah.englishNameTranslation}
                                </p>
                            </div>

                            {/* Arabic Name */}
                            <span className="surah-name-arabic text-primary-dark shrink-0">
                                {surah.name}
                            </span>
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center gap-3 mt-2 text-xs text-foreground-muted">
                            <span className="flex items-center gap-1">
                                <i className="ri-file-list-2-line"></i>
                                {surah.numberOfAyahs} ayat
                            </span>
                            <span className="flex items-center gap-1">
                                <i className="ri-map-pin-line"></i>
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
