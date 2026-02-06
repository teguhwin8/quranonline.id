'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Surah } from '@/types/quran';
import { SURAH_MEANING_ID } from '@/lib/surah-translations';

interface SearchAutocompleteProps {
    surahs: Surah[];
}

export default function SearchAutocomplete({ surahs }: SearchAutocompleteProps) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Surah[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Filter surahs based on query
    const filterSurahs = useCallback((searchQuery: string) => {
        if (!searchQuery.trim()) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        const normalizedQuery = searchQuery.toLowerCase().trim();
        const filtered = surahs.filter((surah) => {
            const englishName = surah.englishName.toLowerCase();
            const arabicName = surah.name;
            const meaning = SURAH_MEANING_ID[surah.number]?.toLowerCase() || '';
            const surahNumber = surah.number.toString();

            return (
                englishName.includes(normalizedQuery) ||
                arabicName.includes(searchQuery) ||
                meaning.includes(normalizedQuery) ||
                surahNumber === normalizedQuery ||
                `surah ${surahNumber}` === normalizedQuery
            );
        });

        setSuggestions(filtered.slice(0, 8)); // Limit to 8 suggestions
        setIsOpen(filtered.length > 0);
        setSelectedIndex(-1);
    }, [surahs]);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        filterSurahs(value);
    };

    // Handle surah selection
    const handleSelectSurah = (surah: Surah) => {
        router.push(`/surah/${surah.number}`);
        setIsOpen(false);
        setQuery('');
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === 'Enter' && query.trim()) {
                // If no suggestions, go to search page
                router.push(`/search?q=${encodeURIComponent(query)}`);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
                    handleSelectSurah(suggestions[selectedIndex]);
                } else if (query.trim()) {
                    router.push(`/search?q=${encodeURIComponent(query)}`);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setSelectedIndex(-1);
                break;
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative max-w-xl mx-auto">
            {/* Search Input */}
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted">
                    <i className="ri-search-line text-xl"></i>
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.trim() && filterSurahs(query)}
                    placeholder="Cari nama surah atau kata kunci..."
                    className="search-input pl-12 pr-4"
                    autoComplete="off"
                />
            </div>

            {/* Suggestions Dropdown */}
            {isOpen && suggestions.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="search-dropdown"
                    role="listbox"
                >
                    {suggestions.map((surah, index) => (
                        <div
                            key={surah.number}
                            role="option"
                            aria-selected={selectedIndex === index}
                            className={`search-dropdown-item ${selectedIndex === index ? 'selected' : ''}`}
                            onClick={() => handleSelectSurah(surah)}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="search-dropdown-number">
                                    {surah.number}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="font-medium text-foreground truncate">
                                            {surah.englishName}
                                        </span>
                                        <span className="text-lg font-arabic text-foreground-muted">
                                            {surah.name}
                                        </span>
                                    </div>
                                    <div className="text-sm text-foreground-muted truncate">
                                        {SURAH_MEANING_ID[surah.number]} • {surah.numberOfAyahs} Ayat
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Search for more link */}
                    <div
                        className="search-dropdown-item search-more-link"
                        onClick={() => {
                            router.push(`/search?q=${encodeURIComponent(query)}`);
                            setIsOpen(false);
                        }}
                    >
                        <i className="ri-search-line mr-2"></i>
                        Cari &quot;{query}&quot; di semua ayat
                    </div>
                </div>
            )}
        </div>
    );
}
