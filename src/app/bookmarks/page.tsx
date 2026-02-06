'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useBookmarks } from '@/hooks/useBookmarks';

export default function BookmarksPage() {
    const { bookmarks, isLoaded, removeBookmark, clearAllBookmarks } = useBookmarks();
    const [showConfirmClear, setShowConfirmClear] = useState(false);

    if (!isLoaded) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-card-border rounded w-1/3"></div>
                    <div className="h-24 bg-card-border rounded"></div>
                    <div className="h-24 bg-card-border rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-foreground mb-1">
                        Bookmark Saya
                    </h1>
                    <p className="text-foreground-muted">
                        {bookmarks.length} ayat tersimpan
                    </p>
                </div>

                {bookmarks.length > 0 && (
                    <button
                        onClick={() => setShowConfirmClear(true)}
                        className="btn btn-ghost text-red-500 hover:bg-red-50"
                    >
                        <i className="ri-delete-bin-line"></i>
                        Hapus Semua
                    </button>
                )}
            </div>

            {/* Empty State */}
            {bookmarks.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                        <i className="ri-bookmark-line text-4xl text-gold"></i>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                        Belum ada bookmark
                    </h2>
                    <p className="text-foreground-muted mb-6">
                        Simpan ayat favorit Anda dengan menekan ikon bookmark saat membaca.
                    </p>
                    <Link href="/" className="btn btn-primary">
                        <i className="ri-book-open-line"></i>
                        Mulai Membaca
                    </Link>
                </div>
            ) : (
                <div className="space-y-4 stagger-children">
                    {bookmarks
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .map((bookmark) => (
                            <Link
                                key={`${bookmark.surahNumber}-${bookmark.ayahNumber}`}
                                href={`/surah/${bookmark.surahNumber}#ayah-${bookmark.ayahNumber}`}
                                className="card block hover:border-primary transition-colors cursor-pointer"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Ayah Number Badge */}
                                    <div className="ayah-number shrink-0">
                                        {bookmark.ayahNumber}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-semibold text-foreground">
                                                {bookmark.surahName} : {bookmark.ayahNumber}
                                            </span>

                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    removeBookmark(bookmark.surahNumber, bookmark.ayahNumber);
                                                }}
                                                className="icon-btn text-red-500 hover:bg-red-50"
                                                aria-label="Hapus bookmark"
                                            >
                                                <i className="ri-delete-bin-line text-lg"></i>
                                            </button>
                                        </div>

                                        {/* Arabic Text */}
                                        <p className="font-arabic text-xl mb-3 line-clamp-2">
                                            {bookmark.arabicText}
                                        </p>

                                        {/* Translation */}
                                        <p className="text-foreground-muted text-sm line-clamp-2">
                                            {bookmark.translation}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            )}

            {/* Confirm Clear Modal */}
            {showConfirmClear && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 fade-in">
                    <div className="bg-card-bg rounded-xl p-6 max-w-sm w-full shadow-xl">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            Hapus Semua Bookmark?
                        </h3>
                        <p className="text-foreground-muted mb-6">
                            Tindakan ini tidak dapat dibatalkan. Semua bookmark Anda akan dihapus.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirmClear(false)}
                                className="btn btn-ghost flex-1"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => {
                                    clearAllBookmarks();
                                    setShowConfirmClear(false);
                                }}
                                className="btn flex-1 bg-red-500 text-white hover:bg-red-600"
                            >
                                <i className="ri-delete-bin-line"></i>
                                Hapus Semua
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
