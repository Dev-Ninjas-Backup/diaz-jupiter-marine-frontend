import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const id = searchParams.get('id');

    const baseUrl = process.env.NEXT_PUBLIC_YACHTBROKER_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_YACHTBROKER_API_KEY;
    const brokerId = process.env.NEXT_PUBLIC_YACHTBROKER_BROKER_ID;

    if (!baseUrl || !apiKey || !brokerId) {
      console.error('Missing env vars:', {
        baseUrl: !!baseUrl,
        apiKey: !!apiKey,
        brokerId: !!brokerId,
      });
      return NextResponse.json(
        { error: 'Server configuration error: missing environment variables' },
        { status: 500 },
      );
    }
    const url = `${baseUrl}/listings?page=${page}&key=${apiKey}&id=${id || brokerId}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch listings' },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('YachtBroker API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
