import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_YACHTBROKER_API_KEY;
    const brokerId = process.env.NEXT_PUBLIC_YACHTBROKER_BROKER_ID;
    if (!apiKey)
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
    if (!brokerId)
      return NextResponse.json({ error: 'Missing Broker ID' }, { status: 500 });

    const url = new URL('https://api.yachtbroker.org/filters/vessel');
    url.searchParams.set('key', apiKey);
    url.searchParams.set('id', brokerId);
    url.searchParams.set('status', 'On,Under Contract');

    const res = await fetch(url.toString());
    if (!res.ok)
      return NextResponse.json(
        { error: 'Failed to fetch filters' },
        { status: res.status },
      );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('YachtBroker filters API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
