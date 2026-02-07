import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pengaturan',
    description: 'Sesuaikan tampilan dan preferensi aplikasi Quran Online sesuai kebutuhan Anda.',
    openGraph: {
        title: 'Pengaturan | Quran Online',
        description: 'Sesuaikan tampilan dan preferensi aplikasi Quran Online.',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Pengaturan | Quran Online',
        description: 'Sesuaikan tampilan aplikasi Quran Online.',
    },
};

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
