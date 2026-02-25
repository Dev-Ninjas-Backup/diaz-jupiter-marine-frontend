import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json({ error: 'lat and lon are required' }, { status: 400 });
  }

  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&zoom=10`,
    {
      headers: {
        'User-Agent': 'Diaz-Jupiter-Marine-App/1.0',
        'Accept-Language': 'en',
      },
    },
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch location' }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
