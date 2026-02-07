'use client';

import { memo } from 'react';

export type ViewMode = 'per-ayat' | 'per-surat';

interface SurahViewToggleProps {
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
}

function SurahViewToggle({ viewMode, onViewModeChange }: SurahViewToggleProps) {
    return (
        <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-sm text-foreground-muted mr-2">Tampilan:</span>
            <div className="inline-flex rounded-lg bg-card-bg border border-card-border p-1">
                <button
                    onClick={() => onViewModeChange('per-ayat')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'per-ayat'
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-foreground hover:bg-background-alt'
                        }`}
                >
                    <i className="ri-list-check-2 mr-1.5"></i>
                    Per Ayat
                </button>
                <button
                    onClick={() => onViewModeChange('per-surat')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'per-surat'
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-foreground hover:bg-background-alt'
                        }`}
                >
                    <i className="ri-file-text-line mr-1.5"></i>
                    Per Surat
                </button>
            </div>
        </div>
    );
}

export default memo(SurahViewToggle);
