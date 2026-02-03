import { NextResponse } from 'next/server';
import { getSurahComplete } from '@/lib/api';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ number: string }> }
) {
    const { number } = await params;
    const surahNumber = parseInt(number, 10);

    if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
        return NextResponse.json(
            { error: 'Invalid surah number' },
            { status: 400 }
        );
    }

    try {
        const data = await getSurahComplete(surahNumber);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Failed to fetch surah:', error);
        return NextResponse.json(
            { error: 'Failed to fetch surah data' },
            { status: 500 }
        );
    }
}
