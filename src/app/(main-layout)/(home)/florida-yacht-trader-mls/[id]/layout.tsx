import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/yachtbroker/${id}`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const json = await res.json();
      const boat = json.data;

      if (boat) {
        const title =
          boat.vesselName ||
          `${boat.year || ''} ${boat.manufacturer || ''} ${boat.model || ''}`.trim() ||
          'MLS Boat';

        const price = boat.priceHidden
          ? 'Price on request'
          : boat.priceUsd
            ? `$${boat.priceUsd.toLocaleString()}`
            : 'Price on request';

        const description =
          [boat.description, boat.summary, boat.notableUpgrades]
            .filter(Boolean)
            .join(' ')
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 160) || `${title} for sale at ${price}`;

        const image =
          boat.displayPicture?.large ||
          boat.displayPicture?.hd ||
          boat.gallery?.[0]?.large ||
          boat.gallery?.[0]?.hd ||
          '';

        return {
          title: `${title} - ${price} | Jupiter Marine Sales`,
          description,
          openGraph: {
            title: `${title} - ${price}`,
            description,
            images: image ? [{ url: image }] : [],
            type: 'website',
          },
          twitter: {
            card: 'summary_large_image',
            title: `${title} - ${price}`,
            description,
            images: image ? [image] : [],
          },
        };
      }
    }
  } catch (error) {
    console.error('Metadata generation error:', error);
  }

  return {
    title: 'MLS Boat Details | Jupiter Marine Sales',
    description: 'View MLS boat details, specifications, and pricing',
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
