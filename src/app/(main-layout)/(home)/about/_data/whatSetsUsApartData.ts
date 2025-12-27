export interface FeaturePoint {
  id: number;
  title: string;
  description: string;
}

export interface Statistic {
  number: string;
  label: string;
}

export const featurePoints: FeaturePoint[] = [
  {
    id: 1,
    title: 'Florida Focused',
    description:
      'Local knowledge, regional exposure, and access to the largest boating community in the U.S.',
  },
  {
    id: 2,
    title: 'Premium Listings',
    description:
      'From sleek center consoles to luxury motor yachts, every vessel is showcased to attract the right buyer.',
  },
  {
    id: 3,
    title: 'Verified Sellers',
    description:
      'We partner only with reputable owners, brokers, and dealerships for total peace of mind.',
  },
  {
    id: 4,
    title: 'Seamless Experience',
    description:
      'Powerful search tools, clear pricing, and no hidden fees — just smooth transactions from start to finish.',
  },
];

export const statistics: Statistic[] = [
  {
    number: '24',
    label: 'Years of\nYachting Excellence',
  },
  {
    number: '2000',
    label: 'Boats\nSold in 2024',
  },
  {
    number: "1000'S",
    label: 'of Listings\nviewed monthly',
  },
];

export const yachtImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    alt: 'Superyacht in clear water',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    alt: 'Modern luxury yacht',
  },
];
