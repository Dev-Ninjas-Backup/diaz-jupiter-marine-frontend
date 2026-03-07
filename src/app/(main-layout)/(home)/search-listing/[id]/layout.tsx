import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const sources = ['custom', 'inventory', 'broker', 'service'];

    for (const source of sources) {
      try {
        const res = await fetch(
          `${baseUrl}/boats/${id}/transform?source=${source}`,
          { next: { revalidate: 3600 } },
        );

        if (res.ok) {
          const json = await res.json();
          const boat = json.data;

          if (boat?.title) {
            const description = boat.description
              ? boat.description.slice(0, 160)
              : `${boat.title} - View details, specifications, and pricing`;
            const image = boat.images?.[0]?.uri || '';

            return {
              title: `${boat.title} | Jupiter Marine Sales`,
              description,
              openGraph: {
                title: boat.title,
                description,
                images: image ? [image] : [],
                type: 'website',
              },
              twitter: {
                card: 'summary_large_image',
                title: boat.title,
                description,
                images: image ? [image] : [],
              },
            };
          }
        }
      } catch {}
    }
  } catch {}

  return {
    title: 'Boat Details | Jupiter Marine Sales',
    description: 'View boat details, specifications, and pricing',
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
