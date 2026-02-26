'use client';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GradientBannerCustom from '@/components/CustomComponents/GradientBannerCustom';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import { getYBBoatById, YBBoat } from '@/services/boats/yachtbroker';
import { BoatDetails, BoatDetailsResponse } from '@/types/product-types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ItemDetailsComponents from './_components/ItemDetailsComponents';
import SendMessage from './_components/SendMessage';

const mapYBToBoatDetails = (b: YBBoat): BoatDetails => ({
  id: String(b.ID),
  title: b.VesselName || `${b.Year || ''} ${b.Manufacturer || ''} ${b.Model || ''}`.trim() || 'Unknown Vessel',
  price: b.PriceHidden ? 'Price on request' : b.PriceUSD ? `$${b.PriceUSD.toLocaleString()}` : 'Price on request',
  source: 'yachtbroker',
  description: [b.Description, b.Summary, b.NotableUpgrades].filter(Boolean).join('\n\n').replace(/<[^>]*>/g, ' ').trim(),
  images: (b.gallery || []).map((g) => ({ uri: g.Large || g.HD || '' })).filter((i) => i.uri),
  specifications: [
    { key: 'Make', value: b.Manufacturer || null },
    { key: 'Model', value: b.Model || null },
    { key: 'Year', value: b.Year || null },
    { key: 'Length', value: b.DisplayLengthFeet ? `${b.DisplayLengthFeet} ft` : null },
    { key: 'Beam', value: b.BeamFeet ? `${b.BeamFeet}'${b.BeamInch ? ` ${b.BeamInch}"` : ''}` : null },
    { key: 'Hull Material', value: b.HullMaterial || null },
    { key: 'Fuel Type', value: b.FuelType || null },
    { key: 'Category', value: b.Category || null },
    { key: 'Condition', value: b.Condition || null },
    { key: 'Engines', value: b.EngineQty ?? null },
    { key: 'Cabins', value: b.CabinCount ?? null },
    { key: 'Heads', value: b.HeadCount ?? null },
    { key: 'Max Draft', value: b.MaximumDraftFeet ? `${b.MaximumDraftFeet} ft` : null },
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
  additionalInfo: [
    { key: 'City', value: b.City || null },
    { key: 'State', value: b.State || null },
    { key: 'Country', value: b.Country || null },
    { key: 'Location', value: [b.City, b.State].filter(Boolean).join(', ') || null },
  ].filter((a) => a.value !== null && a.value !== ''),
});

const FloridaYachtTraderMLSDetailsPage = () => {
  const id = useParams().id as string;
  const navigate = useRouter();
  const [boatDetails, setBoatDetails] = useState<BoatDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      setIsLoading(true);
      try {
        const boat = await getYBBoatById(id);
        if (!boat) { setError('Boat not found'); return; }
        setBoatDetails({ success: true, message: '', data: mapYBToBoatDetails(boat) });
      } catch {
        setError('Failed to load boat details');
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (isLoading) return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner /></div>;
  if (error || !boatDetails?.data) return <div className="flex justify-center items-center min-h-screen"><p className="text-red-500">{error || 'Boat not found'}</p></div>;

  const boat = boatDetails.data;
  const location = boat.additionalInfo?.find((i) => i.key === 'Location')?.value || '';

  return (
    <div>
      <GradientBannerCustom>
        <div className="text-white flex flex-col md:flex-row items-start justify-between gap-3 w-full pt-10 md:pt-12">
          <div className="flex flex-row items-center justify-start gap-3 font-semibold text-sm md:text-xl lg:text-2xl">
            <FaArrowLeft className="cursor-pointer" onClick={() => navigate.back()} />
            <h1>{boat.title}</h1>
          </div>
          <div className="text-right md:text-left text-sm md:text-xl lg:text-2xl pl-5 w-full md:w-max">
            <p>Price: {boat.price}</p>
            {location && <p className="text-xs md:text-base lg:text-lg">{String(location)}</p>}
          </div>
        </div>
      </GradientBannerCustom>
      <CustomContainer>
        <div className="flex flex-col md:flex-row items-start gap-10 py-5">
          <div className="md:w-2/3">
            <ItemDetailsComponents boatDetails={boat} />
          </div>
          <div className="md:w-1/3">
            <SendMessage listingId={id} />
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default FloridaYachtTraderMLSDetailsPage;
