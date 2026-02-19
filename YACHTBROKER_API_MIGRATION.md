# YachtBroker API Migration Guide

## Changes Made

### 1. Environment Variables (.env)
Added new YachtBroker API credentials:
```env
NEXT_PUBLIC_YACHTBROKER_API_URL=https://api.yachtbroker.org
NEXT_PUBLIC_YACHTBROKER_API_KEY=779715cd1327329def57a63b19916ecec1078683
NEXT_PUBLIC_YACHTBROKER_BROKER_ID=87254
```

### 2. API Service Update (src/services/boats/index.ts)
- **getAllBoats()**: Now fetches from YachtBroker API
  - Old: `api.floridayachttrader.com/api/boats/all`
  - New: `api.yachtbroker.org/listings?page={page}&key={key}&id={id}`
  
- **getBoatById()**: Updated for single boat fetch
  - Old: `api.floridayachttrader.com/api/boats/{id}/transform`
  - New: `api.yachtbroker.org/listings/{id}?key={key}`

### 3. Response Mapping (AllListing.tsx)
Updated interface and data conversion:

#### Old API Response Structure:
```typescript
{
  DocumentID: string
  MakeString: string
  Model: string
  ModelYear: number
  Price: string | number
  Images: { Uri: string }
}
```

#### New API Response Structure:
```typescript
{
  ID: number
  Manufacturer: string
  Model: string
  Year: number
  PriceUSD: number
  DisplayPicture: { Large: string, HD: string }
  VesselName: string
  City: string
  State: string
}
```

### 4. Data Flow

```
Page Load
    ↓
getAllBoats({ page: 1, limit: 9 })
    ↓
GET https://api.yachtbroker.org/listings?page=1&key=xxx&id=87254
    ↓
Response: { "V-Data": [...boats], "current_page": 1, "total": 13 }
    ↓
Convert YachtBrokerBoatResponse → YachtProduct
    ↓
Display in ProductCard components
```

## Field Mapping

| YachtProduct Field | Old API Field | New API Field |
|-------------------|---------------|---------------|
| id | DocumentID | ID |
| brand_make | MakeString | Manufacturer |
| model | Model | Model |
| built_year | ModelYear | Year |
| price | Price | PriceUSD |
| image | Images.Uri | DisplayPicture.Large |
| name | MakeString + Model | VesselName |
| location | BoatLocation | City + State |
| length | LengthOverall | LOAFeet |
| beam_size | BeamMeasure | BeamFeet + BeamInch |
| fuel_type | Engines[0].Fuel | FuelType |
| condition | "Used" (default) | Condition |
| class | "Power" (default) | Type |
| material | "Fiberglass" (default) | HullMaterial |
| number_of_cabin | 0 (default) | CabinCount |
| number_of_heads | 0 (default) | CrewHeadCount |

## Testing Checklist

- [ ] Initial page load shows boats from YachtBroker API
- [ ] Pagination works correctly
- [ ] Boat cards display all information properly
- [ ] Images load correctly
- [ ] Price formatting is correct
- [ ] Location displays properly
- [ ] Clicking on a boat card navigates to detail page
- [ ] AI Search still works (uses different API)
- [ ] Filter Search still works (uses different API)

## Notes

- AI Search and Filter Search still use the old AI API endpoints
- Only the default boat listing uses the new YachtBroker API
- API key is stored in environment variables for security
- Response includes pagination metadata (current_page, total, per_page)
- Boats are in the `V-Data` array of the response

## Rollback

If needed to rollback, restore these files from git:
1. `.env`
2. `src/services/boats/index.ts`
3. `src/app/(main-layout)/(home)/search-listing/_components/AllListing.tsx`
