import { NextRequest, NextResponse } from 'next/server';
import { searchQuran } from '@/lib/api';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
        return NextResponse.json(
            { error: 'Query must be at least 2 characters', matches: [] },
            { status: 400 }
        );
    }

    try {
        const results = await searchQuran(query);
        return NextResponse.json(results);
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json(
            { error: 'Search failed', matches: [] },
            { status: 500 }
        );
    }
}
