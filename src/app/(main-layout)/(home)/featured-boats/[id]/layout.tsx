import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/boats-com/${id}`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const json = await res.json();
      const boat = json.data;

      if (boat) {
        const title =
          boat.listingTitle ||
          `${boat.modelYear || ''} ${boat.makeString || ''} ${boat.model || ''}`.trim() ||
          'Featured Boat';

        const description =
          [boat.description, boat.additionalDescription]
            .filter(Boolean)
            .join(' ')
            .replace(/<[^>]*>/g, ' ') // Strip HTML tags
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 160) ||
          `${title} - View details, specifications, and pricing`;

        const image = boat.images?.[0]?.uri || '';

        return {
          title: `${title} | Jupiter Marine Sales`,
          description,
          openGraph: {
            title: `${title} | Jupiter Marine Sales`,
            description,
            images: image ? [{ url: image }] : [],
            type: 'website',
          },
          twitter: {
            card: 'summary_large_image',
            title: `${title} | Jupiter Marine Sales`,
            description,
            images: image ? [image] : [],
          },
        };
      }
    }
  } catch (error) {
    console.error('Error generating metadata for featured boat:', error);
  }

  return {
    title: 'Featured Boat Details | Jupiter Marine Sales',
    description: 'View featured boat details, specifications, and pricing',
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
