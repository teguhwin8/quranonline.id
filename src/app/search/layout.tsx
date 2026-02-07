import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cari Ayat Al-Quran',
    description: 'Cari ayat Al-Quran berdasarkan kata kunci dalam terjemahan Bahasa Indonesia. Temukan ayat yang Anda cari dengan mudah.',
    openGraph: {
        title: 'Cari Ayat Al-Quran | Quran Online',
        description: 'Cari ayat Al-Quran berdasarkan kata kunci dalam terjemahan Bahasa Indonesia.',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Cari Ayat Al-Quran | Quran Online',
        description: 'Temukan ayat Al-Quran yang Anda cari dengan mudah.',
    },
};

export default function SearchLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
