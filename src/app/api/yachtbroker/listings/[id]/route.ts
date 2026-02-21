import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const baseUrl = process.env.NEXT_PUBLIC_YACHTBROKER_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_YACHTBROKER_API_KEY;
    const brokerId = process.env.NEXT_PUBLIC_YACHTBROKER_BROKER_ID;

    // Fetch page 1 first to know total pages
    const firstRes = await fetch(
      `${baseUrl}/listings?page=1&key=${apiKey}&id=${brokerId}`,
    );
    if (!firstRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch listings' },
        { status: firstRes.status },
      );
    }

    const firstData = await firstRes.json();
    const listings: Record<string, unknown>[] = firstData['V-Data'] || [];

    // Check page 1 first
    const found = listings.find((boat) => String(boat.ID) === String(id));
    if (found) {
      return NextResponse.json({ 'V-Data': found });
    }

    // If not found, fetch remaining pages in parallel
    const lastPage: number = firstData.last_page || 1;
    if (lastPage > 1) {
      const pagePromises = Array.from({ length: lastPage - 1 }, (_, i) =>
        fetch(
          `${baseUrl}/listings?page=${i + 2}&key=${apiKey}&id=${brokerId}`,
        ).then((r) => (r.ok ? r.json() : null)),
      );

      const results = await Promise.all(pagePromises);
      for (const result of results) {
        if (!result) continue;
        const match = (result['V-Data'] || []).find(
          (boat: Record<string, unknown>) => String(boat.ID) === String(id),
        );
        if (match) return NextResponse.json({ 'V-Data': match });
      }
    }

    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  } catch (error) {
    console.error('YachtBroker API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
