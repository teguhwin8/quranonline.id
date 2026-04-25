'use client';

import { useState, useEffect } from 'react';
import { PDFSettings, DEFAULT_PDF_SETTINGS } from '@/components/PDFSettingsModal';

const STORAGE_KEY = 'pdf-settings';

export function usePDFSettings() {
    const [settings, setSettings] = useState<PDFSettings>(DEFAULT_PDF_SETTINGS);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                // Merge with defaults so new fields added in future don't break
                setSettings({ ...DEFAULT_PDF_SETTINGS, ...JSON.parse(stored) });
            }
        } catch {
            // Ignore parse errors, fall back to defaults
        }
        setIsLoaded(true);
    }, []);

    // Persist to localStorage whenever settings change (after initial load)
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        }
    }, [settings, isLoaded]);

    return { settings, setSettings };
}
