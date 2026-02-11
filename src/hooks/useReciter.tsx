'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Reciter } from '@/types/quran';

const RECITER_STORAGE_KEY = 'quran-reciter';
const DEFAULT_RECITER = 'ar.alafasy';

// All available reciters from Al-Quran Cloud API (format=audio, language=ar, type=versebyverse)
export const AVAILABLE_RECITERS: Reciter[] = [
    { identifier: 'ar.alafasy', name: 'مشاري العفاسي', englishName: 'Mishary Alafasy' },
    { identifier: 'ar.abdurrahmaansudais', name: 'عبدالرحمن السديس', englishName: 'Abdurrahmaan As-Sudais' },
    { identifier: 'ar.abdullahbasfar', name: 'عبد الله بصفر', englishName: 'Abdullah Basfar' },
    { identifier: 'ar.abdulsamad', name: 'عبدالباسط عبدالصمد', englishName: 'Abdul Samad' },
    { identifier: 'ar.shaatree', name: 'أبو بكر الشاطري', englishName: 'Abu Bakr Ash-Shaatree' },
    { identifier: 'ar.ahmedajamy', name: 'أحمد بن علي العجمي', englishName: 'Ahmed ibn Ali al-Ajamy' },
    { identifier: 'ar.hanirifai', name: 'هاني الرفاعي', englishName: 'Hani Rifai' },
    { identifier: 'ar.husary', name: 'محمود خليل الحصري', englishName: 'Mahmoud Khalil Al-Husary' },
    { identifier: 'ar.husarymujawwad', name: 'محمود خليل الحصري (المجود)', englishName: 'Al-Husary (Mujawwad)' },
    { identifier: 'ar.hudhaify', name: 'علي بن عبدالرحمن الحذيفي', englishName: 'Ali Al-Hudhaify' },
    { identifier: 'ar.ibrahimakhbar', name: 'إبراهيم الأخضر', englishName: 'Ibrahim Akhdar' },
    { identifier: 'ar.mahermuaiqly', name: 'ماهر المعيقلي', englishName: 'Maher Al Muaiqly' },
    { identifier: 'ar.muhammadayyoub', name: 'محمد أيوب', englishName: 'Muhammad Ayyoub' },
    { identifier: 'ar.muhammadjibreel', name: 'محمد جبريل', englishName: 'Muhammad Jibreel' },
    { identifier: 'ar.saoodshuraym', name: 'سعود الشريم', englishName: 'Saood Ash-Shuraym' },
    { identifier: 'ar.parhizgar', name: 'شهریار پرهیزگار', englishName: 'Parhizgar' },
    { identifier: 'ar.aymanswoaid', name: 'أيمن سويد', englishName: 'Ayman Sowaid' },
];

interface ReciterContextType {
    selectedReciter: string;
    setReciter: (identifier: string) => void;
    reciters: Reciter[];
    getReciterName: (identifier: string) => string;
    getBismillahUrl: () => string;
}

const ReciterContext = createContext<ReciterContextType | undefined>(undefined);

export function ReciterProvider({ children }: { children: ReactNode }) {
    const [selectedReciter, setSelectedReciter] = useState<string>(DEFAULT_RECITER);
    const [mounted, setMounted] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem(RECITER_STORAGE_KEY);
        if (saved && AVAILABLE_RECITERS.some(r => r.identifier === saved)) {
            setSelectedReciter(saved);
        }
    }, []);

    const setReciter = useCallback((identifier: string) => {
        if (AVAILABLE_RECITERS.some(r => r.identifier === identifier)) {
            setSelectedReciter(identifier);
            localStorage.setItem(RECITER_STORAGE_KEY, identifier);
        }
    }, []);

    const getReciterName = useCallback((identifier: string) => {
        const reciter = AVAILABLE_RECITERS.find(r => r.identifier === identifier);
        return reciter?.englishName || identifier;
    }, []);

    const getBismillahUrl = useCallback(() => {
        return `https://cdn.islamic.network/quran/audio/128/${selectedReciter}/1.mp3`;
    }, [selectedReciter]);

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <ReciterContext.Provider value={{
                selectedReciter: DEFAULT_RECITER,
                setReciter: () => { },
                reciters: AVAILABLE_RECITERS,
                getReciterName,
                getBismillahUrl: () => `https://cdn.islamic.network/quran/audio/128/${DEFAULT_RECITER}/1.mp3`,
            }}>
                {children}
            </ReciterContext.Provider>
        );
    }

    return (
        <ReciterContext.Provider value={{
            selectedReciter,
            setReciter,
            reciters: AVAILABLE_RECITERS,
            getReciterName,
            getBismillahUrl,
        }}>
            {children}
        </ReciterContext.Provider>
    );
}

export function useReciter(): ReciterContextType {
    const context = useContext(ReciterContext);

    if (context === undefined) {
        // SSR fallback
        return {
            selectedReciter: DEFAULT_RECITER,
            setReciter: () => { },
            reciters: AVAILABLE_RECITERS,
            getReciterName: (identifier: string) => {
                const reciter = AVAILABLE_RECITERS.find(r => r.identifier === identifier);
                return reciter?.englishName || identifier;
            },
            getBismillahUrl: () => `https://cdn.islamic.network/quran/audio/128/${DEFAULT_RECITER}/1.mp3`,
        };
    }

    return context;
}

export { DEFAULT_RECITER };
