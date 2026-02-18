'use client';

import { useState } from 'react';
import SurahCard from '@/components/SurahCard';
import JuzCard from '@/components/JuzCard';
import { Surah } from '@/types/quran';
import { JUZ_DATA } from '@/lib/juz-data';

type TabMode = 'surah' | 'juz';

interface HomeTabSwitcherProps {
    surahs: Surah[];
}

export default function HomeTabSwitcher({ surahs }: HomeTabSwitcherProps) {
    const [tab, setTab] = useState<TabMode>('surah');

    return (
        <section>
            {/* Tab Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                    {tab === 'surah' ? 'Daftar Surah Al-Quran' : 'Daftar 30 Juz'}
                </h2>

                {/* Tab Toggle */}
                <div className="inline-flex rounded-lg bg-background-alt p-0.5">
                    <button
                        onClick={() => setTab('surah')}
                        className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all ${tab === 'surah'
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-foreground-muted hover:text-foreground'
                            }`}
                    >
                        <i className="ri-book-2-line mr-1"></i>
                        Per Surah
                    </button>
                    <button
                        onClick={() => setTab('juz')}
                        className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all ${tab === 'juz'
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-foreground-muted hover:text-foreground'
                            }`}
                    >
                        <i className="ri-layout-grid-line mr-1"></i>
                        Per Juz
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            {tab === 'surah' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 stagger-children">
                    {surahs.map((surah) => (
                        <SurahCard key={surah.number} surah={surah} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 stagger-children">
                    {JUZ_DATA.map((juz) => (
                        <JuzCard key={juz.number} juz={juz} />
                    ))}
                </div>
            )}
        </section>
    );
}
