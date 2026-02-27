import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BOATS_COM_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_BOATS_COM_API_KEY;

    if (!baseUrl || !apiKey) {
      return NextResponse.json(
        { error: 'Server configuration error: missing environment variables' },
        { status: 500 },
      );
    }

    const { searchParams } = new URL(request.url);

    const url = new URL(baseUrl);
    url.searchParams.set('key', apiKey);

    // Forward supported filter/pagination params if provided
    [
      'status',
      'salesstatus',
      'sort',
      'rows',
      'start',
      'make',
      'model',
      'year',
      'condition',
      'class',
      'state',
      'country',
      'price',
      'length',
      'fuel',
      'hull',
      'engines',
      'AdvancedKeywordSearch',
    ].forEach((param) => {
      const val = searchParams.get(param);
      if (val) url.searchParams.set(param, val);
    });

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch boats' },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json({
      results: data.results || [],
      numResults: data.numResults || 0,
    });
  } catch (error) {
    console.error('Boats.com API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
