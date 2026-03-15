import { Metadata } from 'next';
import { getYBBoatById } from '@/services/boats/yachtbroker';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const boat = await getYBBoatById(id);
    
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
      const description = [boat.Description, boat.Summary, boat.NotableUpgrades]
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
  } catch (error) {
    console.error('Metadata generation error:', error);
  }

  return {
    title: 'Florida Yacht Trader MLS | Jupiter Marine Sales',
    description: 'View boat details, specifications, and pricing',
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
