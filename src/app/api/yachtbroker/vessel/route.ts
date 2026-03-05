import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_YACHTBROKER_API_KEY;
    const brokerId = process.env.NEXT_PUBLIC_YACHTBROKER_BROKER_ID;
    const baseUrl =
      process.env.NEXT_PUBLIC_YACHTBROKER_API_URL ||
      'https://api.yachtbroker.org';

    if (!apiKey)
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
    if (!brokerId)
      return NextResponse.json({ error: 'Missing Broker ID' }, { status: 500 });

    const url = new URL(`${baseUrl}/vessel`);
    url.searchParams.set('key', apiKey);
    url.searchParams.set('id', brokerId);
    url.searchParams.set('gallery', 'true');
    url.searchParams.set('engines', 'true');
    url.searchParams.set('generators', 'true');
    url.searchParams.set('textblocks', 'true');
    url.searchParams.set('media', 'true');
    url.searchParams.set('status', 'On,Under Contract');
    url.searchParams.set('limit', '15');

    // Forward all filter params from client
    request.nextUrl.searchParams.forEach((value, key) => {
      if (key !== 'key' && key !== 'id') {
        url.searchParams.set(key, value);
      }
    });

    const res = await fetch(url.toString());
    if (!res.ok)
      return NextResponse.json(
        { error: 'Failed to fetch' },
        { status: res.status },
      );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('YachtBroker vessel API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
