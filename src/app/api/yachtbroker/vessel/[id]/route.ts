import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_YACHTBROKER_API_KEY;
    if (!apiKey)
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 });

    const { id } = await params;

    const url = new URL('https://api.yachtbroker.org/vessel');
    url.searchParams.set('key', apiKey);
    url.searchParams.set('id', '87254');
    url.searchParams.set('gallery', 'true');
    url.searchParams.set('engines', 'true');
    url.searchParams.set('generators', 'true');
    url.searchParams.set('textblocks', 'true');
    url.searchParams.set('status', 'On,Under Contract');

    // Fetch all pages to find the boat by ID
    let page = 1;
    while (true) {
      url.searchParams.set('page', String(page));
      const res = await fetch(url.toString());
      if (!res.ok) break;
      const data = await res.json();
      const boats: YBBoat[] = data['V-Data'] || [];
      const found = boats.find((b: YBBoat) => String(b.ID) === id);
      if (found) return NextResponse.json({ data: found });
      if (page >= (data.last_page || 1)) break;
      page++;
    }

    return NextResponse.json({ error: 'Boat not found' }, { status: 404 });
  } catch (error) {
    console.error('YachtBroker vessel detail Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

interface YBBoat {
  ID: number;
  [key: string]: unknown;
}
