'use client';

import { useTheme } from '@/hooks/useTheme';
import Link from 'next/link';

type ThemeOption = 'light' | 'dark' | 'system';

const themeOptions: { value: ThemeOption; label: string; icon: string }[] = [
    { value: 'light', label: 'Terang', icon: 'ri-sun-line' },
    { value: 'dark', label: 'Gelap', icon: 'ri-moon-line' },
    { value: 'system', label: 'Sistem', icon: 'ri-computer-line' },
];

export default function SettingsPage() {
    const { theme, setTheme, resolvedTheme } = useTheme();

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-4 transition-colors"
                >
                    <i className="ri-arrow-left-line"></i>
                    Kembali
                </Link>
                <h1 className="text-2xl font-bold text-foreground">
                    Pengaturan
                </h1>
                <p className="text-foreground-muted">
                    Sesuaikan tampilan aplikasi
                </p>
            </div>

            {/* Theme Settings */}
            <section className="card">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <i className="ri-palette-line text-primary"></i>
                    Tema Tampilan
                </h2>
                <p className="text-foreground-muted text-sm mb-6">
                    Pilih tema yang nyaman untuk mata Anda. Mode sistem akan mengikuti pengaturan perangkat.
                </p>

                <div className="grid grid-cols-3 gap-3">
                    {themeOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setTheme(option.value)}
                            className={`
                                flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
                                ${theme === option.value
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-card-border hover:border-primary/50 text-foreground-muted hover:text-foreground'
                                }
                            `}
                        >
                            <i className={`${option.icon} text-2xl`}></i>
                            <span className="text-sm font-medium">{option.label}</span>
                            {theme === option.value && (
                                <i className="ri-check-line text-primary"></i>
                            )}
                        </button>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-card-border">
                    <p className="text-sm text-foreground-muted">
                        Tema aktif saat ini: <span className="font-medium text-foreground">{resolvedTheme === 'dark' ? 'Gelap' : 'Terang'}</span>
                    </p>
                </div>
            </section>

            {/* App Info */}
            <section className="card mt-6">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <i className="ri-information-line text-primary"></i>
                    Tentang Aplikasi
                </h2>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-foreground-muted">Versi</span>
                        <span className="text-foreground">1.0.0</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-foreground-muted">Pengembang</span>
                        <a
                            href="https://www.linkedin.com/in/teguhwin8/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            Teguh Widodo
                        </a>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-foreground-muted">Sumber Data</span>
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
            </section>
        </div>
    );
}
