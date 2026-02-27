import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_YACHTBROKER_API_KEY;
    if (!apiKey)
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 });

    const { searchParams } = request.nextUrl;
    const page = searchParams.get('page') || '1';

    const url = new URL('https://api.yachtbroker.org/prosearch');
    url.searchParams.set('key', apiKey);
    url.searchParams.set('id', '87254');
    url.searchParams.set('status', 'On,Under Contract');
    url.searchParams.set('page', page);

    // Forward filter params
    ['price', 'brand', 'model', 'year', 'length', 'beam', 'engines', 'cabins', 'heads', 'category', 'keyword'].forEach((param) => {
      const val = searchParams.get(param);
      if (val) url.searchParams.set(param, val);
    });

    const res = await fetch(url.toString(), {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok)
      return NextResponse.json({ error: 'Failed to fetch' }, { status: res.status });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('YachtBroker vessel API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
