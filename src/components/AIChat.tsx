'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, FormEvent, ReactNode } from 'react';

// Helper to get text content from message
function getMessageText(message: { content?: string; parts?: Array<{ type: string; text?: string }> }): string {
    if (typeof message.content === 'string') {
        return message.content;
    }
    if (Array.isArray(message.parts)) {
        return message.parts
            .filter((part) => part.type === 'text' && typeof part.text === 'string')
            .map((part) => part.text)
            .join('');
    }
    return '';
}

// Parse markdown: bold, links
function parseMarkdown(text: string): ReactNode[] {
    // Match: **bold**, [text](url)
    const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
    const parts = text.split(regex);

    return parts.map((part, i) => {
        // Bold: **text**
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        // Link: [text](url)
        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
            return (
                <a
                    key={i}
                    href={linkMatch[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 underline hover:no-underline"
                >
                    {linkMatch[1]}
                </a>
            );
        }
        return part;
    });
}

interface AIChatProps {
    isOpen: boolean;
    onClose: () => void;
    onToggle: () => void;
}

export default function AIChat({ isOpen, onClose, onToggle }: AIChatProps) {
    const [inputValue, setInputValue] = React.useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // useChat defaults to /api/chat endpoint
    // Provide explicit id to avoid Math.random during SSR
    const { messages, sendMessage, status, error } = useChat({
        id: 'quran-ai-chat',
    });

    const isLoading = status === 'streaming' || status === 'submitted';

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const message = inputValue.trim();
        setInputValue('');
        await sendMessage({ text: message });
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion);
    };

    return (
        <>
            {/* Floating Action Button - Desktop only */}
            <button
                onClick={onToggle}
                className="ai-fab hidden md:flex"
                aria-label={isOpen ? 'Tutup AI Chat' : 'Buka AI Chat'}
            >
                <i className={`${isOpen ? 'ri-close-line' : 'ri-sparkling-2-fill'} text-2xl`}></i>
            </button>

            {/* Chat Panel */}
            {isOpen && (
                <div className="ai-chat-panel">
                    {/* Header */}
                    <div className="ai-chat-header">
                        <div className="flex items-center gap-2">
                            <i className="ri-sparkling-2-fill text-gold"></i>
                            <span className="font-semibold">Tanya AI tentang Al-Quran</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="icon-btn-sm"
                            aria-label="Tutup"
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="ai-chat-messages">
                        {messages.length === 0 && (
                            <div className="ai-chat-welcome">
                                <i className="ri-quill-pen-line text-4xl text-gold mb-3"></i>
                                <p className="text-foreground-muted text-sm text-center">
                                    Assalamualaikum! Saya bisa membantu menjawab pertanyaan tentang Al-Quran.
                                </p>
                                <div className="ai-chat-suggestions">
                                    <button
                                        onClick={() => handleSuggestionClick('Surah apa yang membahas tentang sabar?')}
                                        className="ai-suggestion-chip"
                                    >
                                        Ayat tentang sabar
                                    </button>
                                    <button
                                        onClick={() => handleSuggestionClick('Jelaskan makna Surah Al-Fatihah')}
                                        className="ai-suggestion-chip"
                                    >
                                        Makna Al-Fatihah
                                    </button>
                                    <button
                                        onClick={() => handleSuggestionClick('Apa keutamaan membaca Ayat Kursi?')}
                                        className="ai-suggestion-chip"
                                    >
                                        Keutamaan Ayat Kursi
                                    </button>
                                </div>
                            </div>
                        )}

                        {messages.map((message) => {
                            const textContent = getMessageText(message as { content?: string; parts?: Array<{ type: string; text?: string }> });
                            return (
                                <div
                                    key={message.id}
                                    className={`ai-message ${message.role === 'user' ? 'ai-message-user' : 'ai-message-assistant'}`}
                                >
                                    {message.role === 'assistant' && (
                                        <div className="ai-message-avatar">
                                            <i className="ri-sparkling-2-fill text-xs"></i>
                                        </div>
                                    )}
                                    <div className={`ai-message-content ${message.role === 'user' ? 'ai-message-content-user' : 'ai-message-content-assistant'}`}>
                                        {textContent.split('\n').map((line: string, i: number) => (
                                            <p key={i} className={line === '' ? 'h-2' : ''}>
                                                {parseMarkdown(line)}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {isLoading && (
                            <div className="ai-message ai-message-assistant">
                                <div className="ai-message-avatar">
                                    <i className="ri-sparkling-2-fill text-xs"></i>
                                </div>
                                <div className="ai-message-content ai-message-content-assistant">
                                    <div className="ai-typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="ai-error">
                                <i className="ri-error-warning-line mr-2"></i>
                                Maaf, terjadi kesalahan. Silakan coba lagi.
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="ai-chat-input">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Tanya tentang Al-Quran..."
                            className="ai-input-field"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !inputValue.trim()}
                            className="ai-send-btn"
                            aria-label="Kirim"
                        >
                            <i className="ri-send-plane-2-fill"></i>
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

// Need to import React for useState
import React from 'react';
