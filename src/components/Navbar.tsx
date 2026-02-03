'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-header-bg text-header-text shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Image
                            src="/logo-quranonline.id.png"
                            alt="Quran Online"
                            width={44}
                            height={44}
                        />
                        <span className="font-bold text-lg tracking-wide hidden sm:block">Quran Online</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-white/80 hover:text-white transition-colors font-medium flex items-center gap-1"
                        >
                            <i className="ri-home-4-line"></i>
                            Beranda
                        </Link>
                        <Link
                            href="/bookmarks"
                            className="text-white/80 hover:text-white transition-colors font-medium flex items-center gap-1"
                        >
                            <i className="ri-bookmark-line"></i>
                            Bookmark
                        </Link>
                        <Link
                            href="/search"
                            className="text-white/80 hover:text-white transition-colors font-medium flex items-center gap-1"
                        >
                            <i className="ri-search-line"></i>
                            Cari Ayat
                        </Link>
                        <Link
                            href="/settings"
                            className="text-white/80 hover:text-white transition-colors font-medium flex items-center gap-1"
                        >
                            <i className="ri-settings-3-line"></i>
                            Pengaturan
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <nav className="md:hidden py-4 border-t border-white/10 fade-in">
                        <div className="flex flex-col gap-2">
                            <Link
                                href="/"
                                className="px-4 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <i className="ri-home-4-line"></i>
                                Beranda
                            </Link>
                            <Link
                                href="/bookmarks"
                                className="px-4 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <i className="ri-bookmark-line"></i>
                                Bookmark
                            </Link>
                            <Link
                                href="/search"
                                className="px-4 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <i className="ri-search-line"></i>
                                Cari Ayat
                            </Link>
                            <Link
                                href="/settings"
                                className="px-4 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <i className="ri-settings-3-line"></i>
                                Pengaturan
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
