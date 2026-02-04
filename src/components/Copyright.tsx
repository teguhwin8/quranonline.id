'use client';

import { useState, useEffect } from 'react';

export default function Copyright() {
    const [year, setYear] = useState(2026);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <p className="mb-2">
            © {year} Quran Online Indonesia. Semua hak dilindungi.
        </p>
    );
}
