import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: rawId } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

    // Parse the composite ID: "source__actualId"
    const [source, ...rest] = rawId.split('__');
    const actualId = rest.join('__');

    // 1. If it's a boats-com listing
    if (source === 'boats-com' && actualId) {
      const res = await fetch(`${baseUrl}/boats-com/${actualId}`, {
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
              .replace(/<[^>]*>/g, ' ')
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
    }

    // 2. If it's a yachtbroker listing
    if (source === 'yachtbroker' && actualId) {
      const res = await fetch(`${baseUrl}/yachtbroker/${actualId}`, {
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
    }

    // 3. Fallback: If no prefix was found or fetch failed, try direct lookups
    const fallbackIds = [rawId, actualId].filter(Boolean);
    for (const fid of fallbackIds) {
      // Try boats-com first
      try {
        const res = await fetch(`${baseUrl}/boats-com/${fid}`, {
          next: { revalidate: 3600 },
        });
        if (res.ok) {
          const json = await res.json();
          const boat = json.data;
          if (boat?.listingTitle || boat?.model) {
            const title =
              boat.listingTitle ||
              `${boat.modelYear || ''} ${boat.makeString || ''} ${boat.model || ''}`.trim();
            const description = [boat.description, boat.additionalDescription]
              .filter(Boolean)
              .join(' ')
              .replace(/<[^>]*>/g, ' ')
              .replace(/\s+/g, ' ')
              .trim()
              .slice(0, 160);
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
      } catch {}

      // Try yachtbroker next
      try {
        const res = await fetch(`${baseUrl}/yachtbroker/${fid}`, {
          next: { revalidate: 3600 },
        });
        if (res.ok) {
          const json = await res.json();
          const boat = json.data;
          if (boat?.vesselName || boat?.model) {
            const title =
              boat.vesselName ||
              `${boat.year || ''} ${boat.manufacturer || ''} ${boat.model || ''}`.trim();
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
      } catch {}
    }

    // Try custom/inventory/broker/service transform endpoint as final fallback
    const sources = ['custom', 'inventory', 'broker', 'service'];
    for (const source of sources) {
      try {
        const res = await fetch(
          `${baseUrl}/boats/${rawId}/transform?source=${source}`,
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
                images: image ? [{ url: image }] : [],
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
  } catch (error) {
    console.error('Metadata generation error in search-listing:', error);
  }

  return {
    title: 'Boat Details | Jupiter Marine Sales',
    description: 'View boat details, specifications, and pricing',
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
