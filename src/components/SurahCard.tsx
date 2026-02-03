import Link from 'next/link';
import { Surah } from '@/types/quran';

interface SurahCardProps {
    surah: Surah;
}

export default function SurahCard({ surah }: SurahCardProps) {
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
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {surah.numberOfAyahs} ayat
                            </span>
                            <span className="flex items-center gap-1">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {surah.revelationType === 'Meccan' ? 'Makkiyah' : 'Madaniyah'}
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
