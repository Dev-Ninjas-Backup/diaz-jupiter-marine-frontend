import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_YACHTBROKER_API_KEY;
    if (!apiKey)
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 });

    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';

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

    // Filter parameters
    const filters = [
      'keyword',
      'make',
      'model',
      'type',
      'category',
      'status',
      'yearFrom',
      'yearTo',
      'priceMin',
      'priceMax',
      'lengthFrom',
      'lengthTo',
      'city',
      'state',
      'country',
    ];

    filters.forEach((filter) => {
      const value = searchParams.get(filter);
      if (value) url.searchParams.set(filter, value);
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
