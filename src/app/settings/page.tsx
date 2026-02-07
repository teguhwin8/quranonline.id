'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import Link from 'next/link';

type ThemeOption = 'light' | 'dark' | 'system';
type ViewMode = 'per-ayat' | 'per-surat';

const VIEW_MODE_KEY = 'surah-view-mode';

export default function SettingsPage() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [viewMode, setViewMode] = useState<ViewMode>('per-ayat');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem(VIEW_MODE_KEY) as ViewMode | null;
        if (saved && (saved === 'per-ayat' || saved === 'per-surat')) {
            setViewMode(saved);
        }
    }, []);

    const handleViewModeChange = (mode: ViewMode) => {
        setViewMode(mode);
        localStorage.setItem(VIEW_MODE_KEY, mode);
    };

    return (
        <div className="max-w-lg mx-auto px-4 py-6">
            {/* Header */}
            <div className="mb-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground mb-3 transition-colors"
                >
                    <i className="ri-arrow-left-line"></i>
                    Kembali
                </Link>
                <h1 className="text-xl font-bold text-foreground">Pengaturan</h1>
            </div>

            {/* Settings Card */}
            <div className="card space-y-5">
                {/* Theme Setting */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <i className="ri-palette-line text-primary"></i>
                        <span className="text-sm font-medium">Tema</span>
                        <span className="text-xs text-foreground-muted">({resolvedTheme === 'dark' ? 'Gelap' : 'Terang'})</span>
                    </div>
                    <div className="inline-flex rounded-lg bg-background-alt border border-card-border p-0.5">
                        {[
                            { value: 'light' as ThemeOption, icon: 'ri-sun-line', label: 'Terang' },
                            { value: 'dark' as ThemeOption, icon: 'ri-moon-line', label: 'Gelap' },
                            { value: 'system' as ThemeOption, icon: 'ri-computer-line', label: 'Sistem' },
                        ].map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setTheme(opt.value)}
                                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1 ${theme === opt.value
                                        ? 'bg-primary text-white'
                                        : 'text-foreground-muted hover:text-foreground'
                                    }`}
                                title={opt.label}
                            >
                                <i className={opt.icon}></i>
                                <span className="hidden sm:inline">{opt.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <hr className="border-card-border" />

                {/* View Mode Setting */}
                {mounted && (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <i className="ri-layout-line text-primary"></i>
                            <span className="text-sm font-medium">Tampilan Surat</span>
                        </div>
                        <div className="inline-flex rounded-lg bg-background-alt border border-card-border p-0.5">
                            <button
                                onClick={() => handleViewModeChange('per-ayat')}
                                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1 ${viewMode === 'per-ayat'
                                        ? 'bg-primary text-white'
                                        : 'text-foreground-muted hover:text-foreground'
                                    }`}
                            >
                                <i className="ri-list-check-2"></i>
                                Per Ayat
                            </button>
                            <button
                                onClick={() => handleViewModeChange('per-surat')}
                                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1 ${viewMode === 'per-surat'
                                        ? 'bg-primary text-white'
                                        : 'text-foreground-muted hover:text-foreground'
                                    }`}
                            >
                                <i className="ri-file-text-line"></i>
                                Per Surat
                            </button>
                        </div>
                    </div>
                )}

                <hr className="border-card-border" />

                {/* App Info - Compact */}
                <div className="text-xs text-foreground-muted space-y-1.5">
                    <div className="flex items-center gap-2">
                        <i className="ri-information-line text-primary"></i>
                        <span className="font-medium text-foreground">Quran Online</span>
                        <span>v1.0.0</span>
                    </div>
                    <div className="flex items-center gap-3 pl-5">
                        <a
                            href="https://www.linkedin.com/in/teguhwin8/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            Teguh Widodo
                        </a>
                        <span>•</span>
                        <a
                            href="https://alquran.cloud"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            Al-Quran Cloud API
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
