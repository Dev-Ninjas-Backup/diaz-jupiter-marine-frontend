import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_YACHTBROKER_API_KEY;
    if (!apiKey)
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 });

    const url = new URL('https://api.yachtbroker.org/profilters');
    url.searchParams.set('key', apiKey);
    url.searchParams.set('id', '87254');

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok)
      return NextResponse.json(
        { error: 'Failed to fetch' },
        { status: res.status },
      );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('YachtBroker profilters API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
