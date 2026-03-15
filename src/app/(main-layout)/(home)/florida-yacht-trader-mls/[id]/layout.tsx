import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jupitermarinesales.com';
    const res = await fetch(`${baseUrl}/api/yachtbroker/vessel/${id}`, {
      cache: 'no-store',
    });

    if (res.ok) {
      const json = await res.json();
      const boat = json.data;

      if (boat) {
        const title =
          boat.VesselName ||
          `${boat.Year || ''} ${boat.Manufacturer || ''} ${boat.Model || ''}`.trim() ||
          'Unknown Vessel';

        const price = boat.PriceHidden
          ? 'Price on request'
          : boat.PriceUSD
            ? `$${boat.PriceUSD.toLocaleString()}`
            : 'Price on request';

        const description =
          [boat.Description, boat.Summary, boat.NotableUpgrades]
            .filter(Boolean)
            .join(' ')
            .replace(/<[^>]*>/g, ' ')
            .trim()
            .slice(0, 160) || `${title} for sale at ${price}`;

        const image =
          boat.gallery?.[0]?.Large ||
          boat.gallery?.[0]?.HD ||
          (typeof boat.DisplayPicture === 'object'
            ? boat.DisplayPicture?.Large || boat.DisplayPicture?.HD
            : boat.DisplayPicture) ||
          '';

        return {
          title: `${title} - ${price} | Jupiter Marine Sales`,
          description,
          openGraph: {
            title: `${title} - ${price}`,
            description,
            images: image ? [{ url: image, width: 1200, height: 630 }] : [],
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
