import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bookmark Ayat',
    description: 'Lihat dan kelola ayat-ayat Al-Quran yang telah Anda simpan. Akses cepat ke ayat favorit Anda.',
    openGraph: {
        title: 'Bookmark Ayat | Quran Online',
        description: 'Lihat dan kelola ayat-ayat Al-Quran yang telah Anda simpan.',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Bookmark Ayat | Quran Online',
        description: 'Akses cepat ke ayat Al-Quran favorit Anda.',
    },
};

export default function BookmarksLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
