import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_YACHTBROKER_API_KEY;
    const brokerId = process.env.NEXT_PUBLIC_YACHTBROKER_BROKER_ID;
    if (!apiKey)
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
    if (!brokerId)
      return NextResponse.json({ error: 'Missing Broker ID' }, { status: 500 });

    const { id } = await params;

    const url = new URL('https://api.yachtbroker.org/vessel');
    url.searchParams.set('key', apiKey);
    url.searchParams.set('id', brokerId);
    url.searchParams.set('vessel_ids', id);
    url.searchParams.set('gallery', 'true');
    url.searchParams.set('engines', 'true');
    url.searchParams.set('generators', 'true');
    url.searchParams.set('textblocks', 'true');
    url.searchParams.set('status', 'On,Under Contract');

    const res = await fetch(url.toString());
    if (!res.ok)
      return NextResponse.json({ error: 'Boat not found' }, { status: 404 });

    const data = await res.json();
    const boats: YBBoat[] = data['V-Data'] || [];
    const found = boats.find((b: YBBoat) => String(b.ID) === id);

    if (found) return NextResponse.json({ data: found });
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
