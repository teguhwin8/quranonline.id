'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import GlobalAudioPlayer from '@/components/GlobalAudioPlayer';
import AIChat from '@/components/AIChat';

interface ClientLayoutProps {
    children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const [isAIOpen, setIsAIOpen] = useState(false);

    const handleAIToggle = () => {
        setIsAIOpen(!isAIOpen);
    };

    const handleAIClose = () => {
        setIsAIOpen(false);
    };

    return (
        <>
            <Navbar onAIClick={handleAIToggle} isAIOpen={isAIOpen} />
            <main className="min-h-screen pb-24 md:pb-20">
                {children}
            </main>
            <GlobalAudioPlayer />
            <AIChat
                isOpen={isAIOpen}
                onClose={handleAIClose}
                onToggle={handleAIToggle}
            />
        </>
    );
}
