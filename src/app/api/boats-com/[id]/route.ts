import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const baseUrl = process.env.NEXT_PUBLIC_BOATS_COM_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_BOATS_COM_API_KEY;

    if (!baseUrl || !apiKey) {
      return NextResponse.json(
        { error: 'Server configuration error: missing environment variables' },
        { status: 500 },
      );
    }

    // Fetch all boats and find the specific one
    const res = await fetch(`${baseUrl}?key=${apiKey}&status=Active`, {
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
    const results: Record<string, unknown>[] = data.results || [];

    const found = results.find(
      (boat) => String(boat.DocumentID) === String(id),
    );
    if (!found) {
      return NextResponse.json({ error: 'Boat not found' }, { status: 404 });
    }

    return NextResponse.json({ data: found });
  } catch (error) {
    console.error('Boats.com API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
