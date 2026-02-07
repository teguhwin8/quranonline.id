'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavbarProps {
    onAIClick?: () => void;
    isAIOpen?: boolean;
}

export default function Navbar({ onAIClick, isAIOpen }: NavbarProps) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    };

    return (
        <>
            {/* Header - Top Bar */}
            <header className="sticky top-0 z-50 bg-header-bg text-header-text shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group" aria-label="Quran Online - Halaman Utama">
                            <Image
                                src="/logo-quranonline.id.png"
                                alt="Logo Quran Online - Al-Quran Digital Indonesia dengan Terjemahan"
                                width={44}
                                height={44}
                            />
                            <span className="font-bold text-lg tracking-wide">Quran Online</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav aria-label="Menu navigasi utama" className="hidden md:flex items-center gap-6">
                            <Link
                                href="/"
                                className={`transition-colors font-medium flex items-center gap-1 ${isActive('/') ? 'text-white' : 'text-white/80 hover:text-white'}`}
                            >
                                <i className="ri-home-4-line"></i>
                                Beranda
                            </Link>
                            <Link
                                href="/bookmarks"
                                className={`transition-colors font-medium flex items-center gap-1 ${isActive('/bookmarks') ? 'text-white' : 'text-white/80 hover:text-white'}`}
                            >
                                <i className="ri-bookmark-line"></i>
                                Bookmark
                            </Link>
                            <Link
                                href="/search"
                                className={`transition-colors font-medium flex items-center gap-1 ${isActive('/search') ? 'text-white' : 'text-white/80 hover:text-white'}`}
                            >
                                <i className="ri-search-line"></i>
                                Cari Ayat
                            </Link>
                            <Link
                                href="/settings"
                                className={`transition-colors font-medium flex items-center gap-1 ${isActive('/settings') ? 'text-white' : 'text-white/80 hover:text-white'}`}
                            >
                                <i className="ri-settings-3-line"></i>
                                Pengaturan
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Mobile Bottom Navigation - 5 equal items */}
            <nav aria-label="Menu navigasi mobile" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-header-bg text-header-text shadow-[0_-4px_20px_rgba(0,0,0,0.15)] border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
                <div className="flex items-end h-16">
                    {/* 1. Beranda */}
                    <Link
                        href="/"
                        aria-label="Beranda"
                        className={`flex-1 flex flex-col items-center justify-center gap-0.5 pt-2 pb-2 transition-all ${isActive('/') ? 'text-gold' : 'text-white/60 active:text-white'}`}
                    >
                        <i className={`ri-home-4-${isActive('/') ? 'fill' : 'line'} text-xl`} aria-hidden="true"></i>
                        <span className="text-[10px] font-medium">Beranda</span>
                    </Link>

                    {/* 2. Bookmark */}
                    <Link
                        href="/bookmarks"
                        aria-label="Bookmark ayat tersimpan"
                        className={`flex-1 flex flex-col items-center justify-center gap-0.5 pt-2 pb-2 transition-all ${isActive('/bookmarks') ? 'text-gold' : 'text-white/60 active:text-white'}`}
                    >
                        <i className={`ri-bookmark-${isActive('/bookmarks') ? 'fill' : 'line'} text-xl`} aria-hidden="true"></i>
                        <span className="text-[10px] font-medium">Bookmark</span>
                    </Link>

                    {/* 3. AI - Center with special styling */}
                    <div className="flex-1 flex items-center justify-center pb-2">
                        <button
                            onClick={onAIClick}
                            className="ai-nav-btn"
                            aria-label={isAIOpen ? 'Tutup AI Chat' : 'Buka AI Chat'}
                        >
                            <i className={`${isAIOpen ? 'ri-close-line' : 'ri-sparkling-2-fill'} text-lg`}></i>
                        </button>
                    </div>

                    {/* 4. Cari */}
                    <Link
                        href="/search"
                        aria-label="Cari ayat Al-Quran"
                        className={`flex-1 flex flex-col items-center justify-center gap-0.5 pt-2 pb-2 transition-all ${isActive('/search') ? 'text-gold' : 'text-white/60 active:text-white'}`}
                    >
                        <i className={`ri-search-${isActive('/search') ? 'fill' : 'line'} text-xl`} aria-hidden="true"></i>
                        <span className="text-[10px] font-medium">Cari</span>
                    </Link>

                    {/* 5. Pengaturan */}
                    <Link
                        href="/settings"
                        aria-label="Pengaturan aplikasi"
                        className={`flex-1 flex flex-col items-center justify-center gap-0.5 pt-2 pb-2 transition-all ${isActive('/settings') ? 'text-gold' : 'text-white/60 active:text-white'}`}
                    >
                        <i className={`ri-settings-3-${isActive('/settings') ? 'fill' : 'line'} text-xl`} aria-hidden="true"></i>
                        <span className="text-[10px] font-medium">Pengaturan</span>
                    </Link>
                </div>
            </nav>
        </>
    );
}
