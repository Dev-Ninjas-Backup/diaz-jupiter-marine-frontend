import GradientBannerCustom from '@/components/CustomComponents/GradientBannerCustom';
import { getYBBoatById, YBBoat } from '@/services/boats/yachtbroker';
import { BoatDetails } from '@/types/product-types';
import { Metadata } from 'next';
import ItemDetailsComponents from './_components/ItemDetailsComponents';
import BackButton from './_components/BackButton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const boat = await getYBBoatById(id);
    if (!boat) {
      return {
        title: 'Boat Not Found | Jupiter Marine Sales',
        description: 'The requested boat listing could not be found.',
      };
    }

    const title =
      boat.VesselName ||
      `${boat.Year || ''} ${boat.Manufacturer || ''} ${boat.Model || ''}`.trim() ||
      'Unknown Vessel';
    const price = boat.PriceHidden
      ? 'Price on request'
      : boat.PriceUSD
        ? `$${boat.PriceUSD.toLocaleString()}`
        : 'Price on request';
    const description = [
      boat.Description,
      boat.Summary,
      boat.NotableUpgrades,
    ]
      .filter(Boolean)
      .join(' ')
      .replace(/<[^>]*>/g, ' ')
      .trim()
      .slice(0, 160);
    const image =
      boat.gallery?.[0]?.Large ||
      boat.gallery?.[0]?.HD ||
      (typeof boat.DisplayPicture === 'object'
        ? boat.DisplayPicture?.Large || boat.DisplayPicture?.HD
        : boat.DisplayPicture) ||
      '';

    return {
      title: `${title} - ${price} | Jupiter Marine Sales`,
      description: description || `${title} for sale at ${price}`,
      openGraph: {
        title: `${title} - ${price}`,
        description: description || `${title} for sale at ${price}`,
        images: image ? [{ url: image, width: 1200, height: 630 }] : [],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} - ${price}`,
        description: description || `${title} for sale at ${price}`,
        images: image ? [image] : [],
      },
    };
  } catch (error) {
    console.error('Metadata generation error:', error);
    return {
      title: 'Boat Details | Jupiter Marine Sales',
      description: 'View boat details and specifications',
    };
  }
}

const mapYBToBoatDetails = (b: YBBoat): BoatDetails => ({
  id: String(b.ID),
  title:
    b.VesselName ||
    `${b.Year || ''} ${b.Manufacturer || ''} ${b.Model || ''}`.trim() ||
    'Unknown Vessel',
  price: b.PriceHidden
    ? 'Price on request'
    : b.PriceUSD
      ? `$${b.PriceUSD.toLocaleString()}`
      : 'Price on request',
  source: 'yachtbroker',
  description: [b.Description, b.Summary, b.NotableUpgrades]
    .filter(Boolean)
    .join('\n\n')
    .replace(/<[^>]*>/g, ' ')
    .trim(),
  images: (b.gallery || [])
    .map((g) => ({ uri: g.Large || g.HD || '' }))
    .filter((i) => i.uri),
  specifications: [
    { key: 'Make', value: b.Manufacturer || null },
    { key: 'Model', value: b.Model || null },
    { key: 'Year', value: b.Year || null },
    {
      key: 'Length',
      value: b.DisplayLengthFeet ? `${b.DisplayLengthFeet} ft` : null,
    },
    {
      key: 'Beam',
      value: b.BeamFeet
        ? `${b.BeamFeet}'${b.BeamInch ? ` ${b.BeamInch}"` : ''}`
        : null,
    },
    { key: 'Hull Material', value: b.HullMaterial || null },
    { key: 'Fuel Type', value: b.FuelType || null },
    { key: 'Category', value: b.Category || null },
    { key: 'Condition', value: b.Condition || null },
    { key: 'Engines', value: b.EngineQty ?? null },
    { key: 'Cabins', value: b.CabinCount ?? null },
    { key: 'Heads', value: b.HeadCount ?? null },
    {
      key: 'Max Draft',
      value: b.MaximumDraftFeet ? `${b.MaximumDraftFeet} ft` : null,
    },
  ].filter((s) => s.value !== null && s.value !== ''),
  engines: (b.Engines || []).map((e) => ({
    Make: e.Make,
    Model: e.Model,
    Year: e.Year,
    Hours: e.Hours,
    FuelType: e.FuelType,
    Power: e.EnginePower,
    Type: e.Type,
  })),
  location: {
    city: b.City || undefined,
    state: b.State || undefined,
    country: b.Country || undefined,
  },
  additionalInfo: [
    { key: 'City', value: b.City || null },
    { key: 'State', value: b.State || null },
    { key: 'Country', value: b.Country || null },
    {
      key: 'Location',
      value: [b.City, b.State].filter(Boolean).join(', ') || null,
    },
  ].filter((a) => a.value !== null && a.value !== ''),
});

const FloridaYachtTraderMLSDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  let boat: YBBoat | null = null;
  let error: string | null = null;

  try {
    boat = await getYBBoatById(id);
    if (!boat) {
      error = 'Boat not found';
    }
  } catch {
    error = 'Failed to load boat details';
  }

  if (error || !boat) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error || 'Boat not found'}</p>
      </div>
    );
  }

  const boatDetails = mapYBToBoatDetails(boat);
  const location =
    boatDetails.additionalInfo?.find((i) => i.key === 'Location')?.value || '';

  return (
    <div>
      <GradientBannerCustom>
        <div className="text-white flex flex-row md:flex-row items-start justify-between gap-3 w-full md:pt-4 px-4 pt-2 pb-2">
          <div className="flex flex-row items-center justify-start gap-3 font-semibold text-sm md:text-xl lg:text-2xl">
            <BackButton />
            <h1>{boatDetails.title}</h1>
          </div>
          <div className="text-right md:text-left text-sm md:text-xl lg:text-2xl pl-5 w-full md:w-max">
            <p>Price: {boatDetails.price}</p>
            {location && (
              <p className="text-xs md:text-base lg:text-lg">
                {String(location)}
              </p>
            )}
          </div>
        </div>
      </GradientBannerCustom>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <ItemDetailsComponents boatDetails={boatDetails} />
      </div>
    </div>
  );
};

export default FloridaYachtTraderMLSDetailsPage;
