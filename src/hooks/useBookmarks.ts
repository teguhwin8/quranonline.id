'use client';

import { useState, useEffect, useCallback } from 'react';
import { Bookmark } from '@/types/quran';

const BOOKMARKS_KEY = 'quran-bookmarks';

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load bookmarks from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(BOOKMARKS_KEY);
        if (stored) {
            try {
                setBookmarks(JSON.parse(stored));
            } catch {
                setBookmarks([]);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save bookmarks to localStorage whenever they change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
        }
    }, [bookmarks, isLoaded]);

    const addBookmark = useCallback((bookmark: Omit<Bookmark, 'createdAt'>) => {
        setBookmarks((prev) => {
            // Check if already bookmarked
            const exists = prev.some(
                (b) =>
                    b.surahNumber === bookmark.surahNumber &&
                    b.ayahNumber === bookmark.ayahNumber
            );
            if (exists) return prev;

            return [
                ...prev,
                {
                    ...bookmark,
                    createdAt: Date.now(),
                },
            ];
        });
    }, []);

    const removeBookmark = useCallback((surahNumber: number, ayahNumber: number) => {
        setBookmarks((prev) =>
            prev.filter(
                (b) => !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber)
            )
        );
    }, []);

    const isBookmarked = useCallback(
        (surahNumber: number, ayahNumber: number) => {
            return bookmarks.some(
                (b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber
            );
        },
        [bookmarks]
    );

    const toggleBookmark = useCallback(
        (bookmark: Omit<Bookmark, 'createdAt'>) => {
            if (isBookmarked(bookmark.surahNumber, bookmark.ayahNumber)) {
                removeBookmark(bookmark.surahNumber, bookmark.ayahNumber);
            } else {
                addBookmark(bookmark);
            }
        },
        [addBookmark, removeBookmark, isBookmarked]
    );

    const clearAllBookmarks = useCallback(() => {
        setBookmarks([]);
    }, []);

    return {
        bookmarks,
        isLoaded,
        addBookmark,
        removeBookmark,
        isBookmarked,
        toggleBookmark,
        clearAllBookmarks,
    };
}
