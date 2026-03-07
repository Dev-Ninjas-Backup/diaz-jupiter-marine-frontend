import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

    // For YachtBroker MLS boats
    const res = await fetch(`${baseUrl}/yachtbroker/boats/${id}`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const boat = await res.json();

      if (boat) {
        const title =
          boat.VesselName ||
          `${boat.Year || ''} ${boat.Manufacturer || ''} ${boat.Model || ''}`.trim() ||
          'Yacht Details';

        const description = boat.Description
          ? boat.Description.replace(/<[^>]*>/g, '').slice(0, 160)
          : `${title} - View details, specifications, and pricing`;

        const image = boat.gallery?.[0]?.Large || boat.gallery?.[0]?.HD || '';

        return {
          title: `${title} | Jupiter Marine Sales`,
          description,
          openGraph: {
            title,
            description,
            images: image ? [image] : [],
            type: 'website',
          },
          twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: image ? [image] : [],
          },
        };
      }
    }
  } catch {}

  return {
    title: 'MLS Boat Details | Jupiter Marine Sales',
    description: 'View MLS boat details, specifications, and pricing',
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
