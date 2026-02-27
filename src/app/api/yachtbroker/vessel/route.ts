import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_YACHTBROKER_API_KEY;
    if (!apiKey)
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 });

    const page = request.nextUrl.searchParams.get('page') || '1';

    const url = new URL('https://api.yachtbroker.org/vessel');
    url.searchParams.set('key', apiKey);
    url.searchParams.set('id', '87254');
    url.searchParams.set('gallery', 'true');
    url.searchParams.set('engines', 'true');
    url.searchParams.set('generators', 'true');
    url.searchParams.set('textblocks', 'true');
    url.searchParams.set('media', 'true');
    url.searchParams.set('status', 'On,Under Contract');
    url.searchParams.set('page', page);
    url.searchParams.set('per_page', '15');

    const res = await fetch(url.toString());
    if (!res.ok)
      return NextResponse.json({ error: 'Failed to fetch' }, { status: res.status });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('YachtBroker vessel API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
