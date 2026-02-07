'use client';

import { useAudio } from '@/hooks/useAudio';
import Copyright from './Copyright';

export default function Footer() {
    const { audioState } = useAudio();

    // Check if player is visible
    const hasActivePlayer = audioState.currentAyahIndex !== null && audioState.ayahs[audioState.currentAyahIndex]?.audio;

    // Dynamic padding classes:
    // Mobile: navbar (~56px) + player if active (~80px)
    // Desktop: only player if active (~80px)
    const paddingClass = hasActivePlayer
        ? 'pb-36 md:pb-24' // Mobile: navbar + player, Desktop: player only
        : 'pb-20 md:pb-8';  // Mobile: navbar only, Desktop: normal

    return (
        <footer className={`bg-card-bg border-t border-card-border py-8 ${paddingClass} text-center text-foreground-muted text-sm transition-all duration-300`}>
            <div className="max-w-7xl mx-auto px-4">
                <Copyright />
                <p className="mb-2">
                    Dibuat dengan ❤️ oleh <a href="https://www.linkedin.com/in/teguhwin8/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Teguh Widodo</a>
                </p>
                <p>
                    Sumber data: <a href="https://alquran.cloud" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Al-Quran Cloud API</a>
                </p>
            </div>
        </footer>
    );
}
