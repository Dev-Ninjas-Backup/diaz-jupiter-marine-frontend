import exampleimg1 from '@/assets/yacht-images/image1.jpg';
import exampleimg2 from '@/assets/yacht-images/image2.jpg';
import exampleimg3 from '@/assets/yacht-images/image3.jpg';
import exampleimg4 from '@/assets/yacht-images/image4.jpg';
import exampleimg5 from '@/assets/yacht-images/image5.jpg';
import { SubscriptionPlan } from '@/types/subscription-types-demo';

import brand1Img from '@/assets/brands/brand1.png';
import brand2Img from '@/assets/brands/brand2.png';
import brand3Img from '@/assets/brands/brand3.png';
import brand4Img from '@/assets/brands/brand4.png';
import brand5Img from '@/assets/brands/brand5.png';
import brand6Img from '@/assets/brands/brand6.png';
import brand7Img from '@/assets/brands/brand7.png';
import brand8Img from '@/assets/brands/brand8.png';
import brand9Img from '@/assets/brands/brand9.png';
import brand10Img from '@/assets/brands/brand10.png';
import brand11Img from '@/assets/brands/brand11.png';
import brand12Img from '@/assets/brands/brand12.png';

import centerConsoleImg from '@/assets/popular-categories/center-console.png';
import sportfishImg from '@/assets/popular-categories/sportfish.png';
import luxuryYachtsImg from '@/assets/popular-categories/luxury-yachts.png';
import catamaransImg from '@/assets/popular-categories/catamarans.png';
import cruisersImg from '@/assets/popular-categories/cruisers.png';
import whyImg1 from '@/assets/local-marketplace/img1.jpg';
import whyImg2 from '@/assets/local-marketplace/img2.png';
import whyImg3 from '@/assets/local-marketplace/img3.png';

export const demodata = [
  {
    brand_make: 'Viking',
    model: '80 Enclosed Skybridge',
    built_year: 2018,
    length: '80 ft',
    number_of_engine: 2,
    class: 'Flybridge',
    material: 'Fiberglass',
    number_of_cabin: 2,
    number_of_heads: 5,
    beam_size: '21 ft 4 in',
    fuel_type: 'Diesel',
    max_draft: '5 ft 7 in',
    name: 'ON THE EDGE',
    location: 'Montauk, NY',
    condition: 'Used',
    price: 6250000,
    images: [exampleimg1, exampleimg2, exampleimg3, exampleimg4, exampleimg5],
    image: exampleimg1,
  },
  {
    brand_make: 'Sunseeker',
    model: '76 Yacht',
    built_year: 2020,
    length: '76 ft',
    number_of_engine: 2,
    class: 'Motor Yacht',
    material: 'Fiberglass',
    number_of_cabin: 4,
    number_of_heads: 4,
    beam_size: '18 ft 9 in',
    fuel_type: 'Diesel',
    max_draft: '5 ft 3 in',
    name: 'AZURE DREAM',
    location: 'Miami, FL',
    condition: 'Used',
    price: 4850000,
    images: [exampleimg2, exampleimg3, exampleimg4, exampleimg5, exampleimg1],
    image: exampleimg2,
  },
  {
    brand_make: 'Azimut',
    model: 'Grande 95RPH',
    built_year: 2019,
    length: '95 ft',
    number_of_engine: 2,
    class: 'Flybridge',
    material: 'Fiberglass',
    number_of_cabin: 5,
    number_of_heads: 6,
    beam_size: '23 ft 2 in',
    fuel_type: 'Diesel',
    max_draft: '6 ft 8 in',
    name: 'BELLA VITA',
    location: 'Fort Lauderdale, FL',
    condition: 'Used',
    price: 8900000,
    images: [exampleimg3, exampleimg4, exampleimg5, exampleimg1, exampleimg2],
    image: exampleimg3,
  },
  {
    brand_make: 'Princess',
    model: '88 Motor Yacht',
    built_year: 2021,
    length: '88 ft',
    number_of_engine: 2,
    class: 'Motor Yacht',
    material: 'Fiberglass',
    number_of_cabin: 4,
    number_of_heads: 5,
    beam_size: '21 ft 8 in',
    fuel_type: 'Diesel',
    max_draft: '6 ft 2 in',
    name: 'SERENITY NOW',
    location: 'Newport, RI',
    condition: 'Used',
    price: 7500000,
    images: [exampleimg4, exampleimg5, exampleimg1, exampleimg2, exampleimg3],
    image: exampleimg4,
  },
  {
    brand_make: 'Ferretti',
    model: '720 Flybridge',
    built_year: 2017,
    length: '72 ft',
    number_of_engine: 2,
    class: 'Flybridge',
    material: 'Fiberglass',
    number_of_cabin: 3,
    number_of_heads: 3,
    beam_size: '19 ft 6 in',
    fuel_type: 'Diesel',
    max_draft: '5 ft 9 in',
    name: 'OCEAN BREEZE',
    location: 'San Diego, CA',
    condition: 'Used',
    price: 3750000,
    images: [exampleimg5, exampleimg1, exampleimg2, exampleimg3, exampleimg4],
    image: exampleimg5,
  },
  {
    brand_make: 'Hatteras',
    model: 'M90 Panacera',
    built_year: 2022,
    length: '90 ft',
    number_of_engine: 2,
    class: 'Motor Yacht',
    material: 'Fiberglass',
    number_of_cabin: 4,
    number_of_heads: 5,
    beam_size: '23 ft 11 in',
    fuel_type: 'Diesel',
    max_draft: '6 ft 5 in',
    name: 'TRANQUILITY',
    location: 'Charleston, SC',
    condition: 'Used',
    price: 9200000,
    images: [exampleimg1, exampleimg3, exampleimg5, exampleimg2, exampleimg4],
    image: exampleimg1,
  },
  {
    brand_make: 'Pershing',
    model: '82 VHP',
    built_year: 2019,
    length: '82 ft',
    number_of_engine: 3,
    class: 'Sport Yacht',
    material: 'Fiberglass',
    number_of_cabin: 3,
    number_of_heads: 3,
    beam_size: '19 ft 4 in',
    fuel_type: 'Diesel',
    max_draft: '5 ft 11 in',
    name: 'VELOCITY',
    location: 'West Palm Beach, FL',
    condition: 'Used',
    price: 5900000,
    images: [exampleimg2, exampleimg4, exampleimg1, exampleimg5, exampleimg3],
    image: exampleimg2,
  },
  {
    brand_make: 'Maritimo',
    model: 'X60 Flybridge',
    built_year: 2020,
    length: '60 ft',
    number_of_engine: 2,
    class: 'Flybridge',
    material: 'Fiberglass',
    number_of_cabin: 3,
    number_of_heads: 2,
    beam_size: '17 ft 3 in',
    fuel_type: 'Diesel',
    max_draft: '4 ft 10 in',
    name: 'SOUTHERN CROSS',
    location: 'Seattle, WA',
    condition: 'Used',
    price: 2850000,
    images: [exampleimg3, exampleimg5, exampleimg2, exampleimg4, exampleimg1],
    image: exampleimg3,
  },
  {
    brand_make: 'Benetti',
    model: 'Delfino 95',
    built_year: 2018,
    length: '95 ft',
    number_of_engine: 2,
    class: 'Motor Yacht',
    material: 'Fiberglass',
    number_of_cabin: 5,
    number_of_heads: 6,
    beam_size: '22 ft 7 in',
    fuel_type: 'Diesel',
    max_draft: '6 ft 9 in',
    name: 'MIDNIGHT SUN',
    location: 'Naples, FL',
    condition: 'Used',
    price: 10500000,
    images: [exampleimg4, exampleimg2, exampleimg5, exampleimg1, exampleimg3],
    image: exampleimg4,
  },
  {
    brand_make: 'Tiara',
    model: '53 Flybridge',
    built_year: 2021,
    length: '53 ft',
    number_of_engine: 2,
    class: 'Flybridge',
    material: 'Fiberglass',
    number_of_cabin: 2,
    number_of_heads: 2,
    beam_size: '16 ft 2 in',
    fuel_type: 'Diesel',
    max_draft: '4 ft 6 in',
    name: 'ISLAND TIME',
    location: 'Annapolis, MD',
    condition: 'Used',
    price: 1950000,
    images: [exampleimg5, exampleimg3, exampleimg4, exampleimg2, exampleimg1],
    image: exampleimg5,
  },
];

export const democategoriesdata = [
  {
    id: 1,
    name: 'Center Consoles',
    image: centerConsoleImg,
  },
  {
    id: 2,
    name: 'SportFish',
    image: sportfishImg,
  },
  {
    id: 3,
    name: 'Luxury Yachts ',
    image: luxuryYachtsImg,
  },
  {
    id: 4,
    name: 'Catamarans',
    image: catamaransImg,
  },
  {
    id: 5,
    name: 'Cruisers',
    image: cruisersImg,
  },
];

export const whyUsData = {
  label: 'Why us?',
  heading: "Florida's #1 Local Yacht Marketplace",
  description:
    "FloridaYachtTrader.com makes it easy for buyers and sellers to connect in one trusted place. From center consoles to luxury yachts, we're the go-to marketplace built for Florida boaters. With powerful search tools, premium listings, and local expertise, finding your dream yacht has never been simpler.",
  stats: [
    { value: '24+ Years', label: 'Yachting Excellence' },
    { value: '2000+', label: 'Boats Sold Per Year' },
    { value: '1000+', label: 'Listings viewed monthly' },
  ],
  cta: 'List Your Boat For Sale',
  images: [whyImg1, whyImg2, whyImg3],
};

export const demoBlogData = [
  {
    id: 1,
    title: "The Future of Boating: Smarter Tech – That's Already Here",
    slug: 'future-of-boating-smarter-tech',
    category: 'Technology',
    readTime: '5 min read',
    publishDate: '2025-09-10',
    author: 'Marine Tech Editor',
    excerpt:
      'Smarter Boating: The Future is Already Here. What if your boat could anticipate your needs before you even step aboard?',
    featuredImage: {
      url: exampleimg1,
      alt: 'Modern boat cockpit with advanced digital displays and navigation systems',
      caption: 'Advanced smart technology integration in modern boat cockpits',
    },
    tags: [
      'smart technology',
      'boat automation',
      'marine electronics',
      'future trends',
    ],
    featured: true,
    views: 1250,
  },
  {
    id: 2,
    title: '2019 Formula 430 SSC – Ultimate Performance & Luxury',
    slug: '2019-formula-430-ssc-review',
    category: 'Boat Reviews',
    readTime: '5 min read',
    publishDate: '2025-09-10',
    author: 'Performance Boat Reviewer',
    excerpt:
      'Experience unmatched power and luxury with this 2019 Formula 430 SSC. A comprehensive review of one of the finest performance cruisers on the market.',
    featuredImage: {
      url: exampleimg2,
      alt: '2019 Formula 430 SSC luxury performance boat on water with lighthouse in background',
      caption: 'The stunning Formula 430 SSC combining speed and luxury',
    },
    specifications: {
      model: 'Formula 430 SSC',
      year: 2019,
      length: '43 feet',
      type: 'Performance Cruiser',
    },
    tags: [
      'Formula boats',
      'performance cruiser',
      'luxury yachts',
      'boat review',
    ],
    featured: true,
    views: 2100,
  },
  {
    id: 3,
    title: '2018 Sunseeker Predator 74 – Immaculate Condition, Fully U...',
    slug: '2018-sunseeker-predator-74-review',
    category: 'Boat Reviews',
    readTime: '5 min read',
    publishDate: '2025-08-27',
    author: 'Yacht Specialist',
    excerpt:
      'This 2018 Sunseeker Predator 74 is a perfect 10/10 – combining breathtaking performance with luxury accommodations and pristine condition.',
    featuredImage: {
      url: exampleimg3,
      alt: '2018 Sunseeker Predator 74 yacht cruising on open water',
      caption: 'Sunseeker Predator 74 - Performance yacht perfection',
    },
    specifications: {
      model: 'Sunseeker Predator 74',
      year: 2018,
      length: '74 feet',
      condition: 'Immaculate - 10/10',
      type: 'Performance Yacht',
    },
    tags: ['Sunseeker', 'performance yacht', 'luxury yacht', 'predator series'],
    featured: true,
    views: 1875,
  },
  {
    id: 4,
    title: 'Market Trends and Sales Projections',
    slug: 'boating-market-trends-2025',
    category: 'Market Analysis',
    readTime: '5 min read',
    publishDate: '2025-08-18',
    author: 'Marine Industry Analyst',
    excerpt:
      'As we progress through 2025, the recreational boating industry is experiencing significant shifts in consumer preferences and market dynamics.',
    featuredImage: {
      url: exampleimg4,
      alt: 'Modern luxury yacht docked at marina with waterfront properties',
      caption: 'Luxury yacht market showing strong growth in 2025',
    },
    tags: [
      'market trends',
      'sales projections',
      'industry analysis',
      '2025 outlook',
    ],
    featured: false,
    views: 980,
  },
  {
    id: 5,
    title: "Smart Navigation Systems: A Buyer's Guide",
    slug: 'smart-navigation-systems-guide',
    category: 'Technology',
    readTime: '7 min read',
    publishDate: '2025-09-05',
    author: 'Marine Tech Editor',
    excerpt:
      'From touchscreen chartplotters to AI-assisted autopilots, discover the latest in marine navigation technology.',
    featuredImage: {
      url: exampleimg5,
      alt: 'Multiple navigation displays showing charts and radar',
      caption: 'Modern integrated navigation systems',
    },
    tags: ['navigation', 'GPS', 'chartplotters', 'marine electronics'],
    featured: false,
    views: 1420,
  },
  {
    id: 6,
    title: 'Luxury Performance Cruisers: 2025 Comparison',
    slug: 'luxury-performance-cruisers-2025',
    category: 'Comparisons',
    readTime: '10 min read',
    publishDate: '2025-08-30',
    author: 'Performance Boat Reviewer',
    excerpt:
      'A comprehensive comparison of the top luxury performance cruisers available in 2025, including Formula, Sunseeker, and Azimut.',
    featuredImage: {
      url: exampleimg5,
      alt: 'Three luxury performance cruisers side by side',
      caption: 'Head-to-head: Leading performance cruisers of 2025',
    },
    tags: [
      'comparison',
      'performance cruisers',
      'luxury boats',
      'buying guide',
    ],
    featured: true,
    views: 3200,
  },
  {
    id: 7,
    title: 'Marina Infrastructure: The Future of Docking',
    slug: 'marina-infrastructure-future',
    category: 'Industry News',
    readTime: '6 min read',
    publishDate: '2025-08-15',
    author: 'Industry Reporter',
    excerpt:
      'How modern marinas are adapting to accommodate larger vessels and implementing smart docking solutions.',
    featuredImage: {
      url: exampleimg1,
      alt: 'State-of-the-art marina with large yachts',
      caption: 'Next-generation marina facilities',
    },
    tags: ['marinas', 'infrastructure', 'docking', 'industry trends'],
    featured: false,
    views: 750,
  },
  {
    id: 8,
    title: 'Sunseeker Predator Series: Legacy of Performance',
    slug: 'sunseeker-predator-series-legacy',
    category: 'Brand Spotlight',
    readTime: '8 min read',
    publishDate: '2025-08-20',
    author: 'Yacht Specialist',
    excerpt:
      "Exploring the history and evolution of Sunseeker's iconic Predator series from its inception to today's cutting-edge models.",
    featuredImage: {
      url: exampleimg2,
      alt: 'Evolution of Sunseeker Predator models',
      caption: 'Decades of performance excellence',
    },
    tags: ['Sunseeker', 'brand history', 'predator series', 'yacht heritage'],
    featured: false,
    views: 1650,
  },
  {
    id: 9,
    title: 'Boat Maintenance Tech: Apps and Automation',
    slug: 'boat-maintenance-tech-apps',
    category: 'Technology',
    readTime: '5 min read',
    publishDate: '2025-09-08',
    author: 'Marine Tech Editor',
    excerpt:
      'Revolutionary apps and automated systems that make boat maintenance easier than ever, from engine monitoring to hull cleaning schedules.',
    featuredImage: {
      url: exampleimg1,
      alt: 'Smartphone showing boat maintenance app interface',
      caption: 'Smart maintenance tracking at your fingertips',
    },
    tags: ['maintenance', 'apps', 'automation', 'boat care'],
    featured: false,
    views: 1100,
  },
  {
    id: 10,
    title: 'Investment Opportunities in Recreational Boating',
    slug: 'boating-investment-opportunities-2025',
    category: 'Market Analysis',
    readTime: '9 min read',
    publishDate: '2025-08-25',
    author: 'Marine Industry Analyst',
    excerpt:
      'Analyzing the recreational boating market as an investment opportunity, including charter operations, fractional ownership, and market growth projections.',
    featuredImage: {
      url: exampleimg4,
      alt: 'Luxury yacht fleet at sunset',
      caption: 'The growing charter and ownership markets',
    },
    tags: [
      'investment',
      'charter',
      'market analysis',
      'business opportunities',
    ],
    featured: false,
    views: 2450,
  },
];

export const brandImages = [
  {
    id: 1,
    image: brand1Img,
  },
  {
    id: 2,
    image: brand2Img,
  },
  {
    id: 3,
    image: brand3Img,
  },
  {
    id: 4,
    image: brand4Img,
  },
  {
    id: 5,
    image: brand5Img,
  },
  {
    id: 6,
    image: brand6Img,
  },
  {
    id: 7,
    image: brand7Img,
  },
  {
    id: 8,
    image: brand8Img,
  },
  {
    id: 9,
    image: brand9Img,
  },
  {
    id: 10,
    image: brand10Img,
  },
  {
    id: 11,
    image: brand11Img,
  },
  {
    id: 12,
    image: brand12Img,
  },
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 1,
    name: 'Gold Package',
    price: 9.99,
    currency: 'USD',
    billingCycle: 'month',
    featured: false,
    features: [
      'List in minutes!',
      'Fast, affordable, effective',
      'Entry-Level Package Maximum Exposure',
      'No social media drama - just real buyers',
      '5 Pics and 500 word description!',
      'First month FREE with promo code',
      'No overpay to sell your boat',
    ],
    buttonText: 'Get Started Now',
    buttonStyle: 'dark',
  },
  {
    id: 2,
    name: 'Platinum Package',
    price: 15.99,
    currency: 'USD',
    billingCycle: 'month',
    featured: true,
    featuredLabel: 'BEST VALUE!',
    features: [
      'List in minutes!',
      'Fast, affordable, effective',
      'More space, more visuals, more opportunity',
      'No social media drama - just real buyers',
      '10 Pics and 1000 word description!',
      '2 months FREE with promo code',
      'No overpay to sell your boat',
    ],
    buttonText: 'Get Started Now',
    buttonStyle: 'primary',
  },
  {
    id: 3,
    name: 'Diamond Elite Brokerage',
    price: 29.99,
    currency: 'USD',
    billingCycle: 'month',
    featured: false,
    features: [
      'Brokers & Pro Sales Agencies',
      'Fast, affordable, effective',
      'Multiple listings included under one package',
      'Showcase your watercraft, boats, and yachts like a pro',
      '75 Pics and 5000 word description!',
      '2 months FREE with promo code',
      'No overpay to sell your boat',
    ],
    buttonText: 'Get Started Now',
    buttonStyle: 'dark',
  },
];

export const demoSpecifications = {
  'Brand Make': 'Viking',
  Model: '80 Enclosed Skybridge',
  'Built Year': '2018',
  Length: '80 ft',
  'Number of Engine': '02',
  Class: 'Flybridge',
  Material: 'Fiberglass',
  'Number of Cabin': '02',
  'Number of Heads': '05',
  'Beam Size': '21 ft 4 In',
  'Fuel Type': 'Diesel',
  'Max Draft': '5 ft 7 In',
  Name: 'ON THE EDGE',
  Location: 'Montauk, NY',
  Condition: 'Used',
  Price: '$6,250,000',
};

export const demoDescription = `Note: ONLY 1600 HOURS WITH EXTENDED WARRANTY UNTIL MAY 2025 OR 2700 HOURS

"On The Edge" is a highly custom Viking 80' Enclosed Skybridge and is truly one of a kind! Some of her customizations are noted below, but will not compare to getting aboard and appreciating this build for yourself.

- Additional 450 gallons of fuel for a total of 3,682 
- Furuno Omni Sonar- Seakeeper 35 2021
- Skybridge with custom hardtop, helm has ( 2 ) release chairs
- Day head located as you walk in on the starboard side
- Custom rod room
- Custom stairs to enclosed flybridge
- Starboard aft stateroom, custom ( 4 ) bunks
- Port stateroom VIP with electrically operated split berths accommodations
- Raised panel doors on galley cabinets
- Skybridge flooring is level, has custom sink and microwave cabinet
- Pocket door on starboard head in companionway
- Master stateroom berth levels electronically
- Amazing AME Electronics package 
- ( 2 ) of everything separated with own batteries and charging system
- Custom storage throughout boat`;

export const demoBlogDetailsData = {
  id: 1,
  title: 'Smarter Boating: The Future Is Already Here',
  readTime: '8 min read',
  publishDate: 'October 1, 2025',
  sections: [
    {
      type: 'paragraph',
      content:
        'What if your boat could park itself, predict the weather, and even send you a text when it&apos;s time for maintenance? It might sound futuristic, but thanks to autonomous docking systems powered by GPS, sensors, and AI, your boat can literally guide itself to the dock—even in tough conditions. Checking the classic weather app is &apos;no longer enough&apos; when you&apos;re on the water. That&apos;s why today&apos;s smart marine systems offer hyperlocal forecasts directly at the helm. Advanced weather models give early warnings on storms, wind shifts, and wave conditions—helping you decide whether to power through or stay tied up and live to fish another day.',
    },
    {
      type: 'heading',
      content: 'Docking Without the Drama',
    },
    {
      type: 'paragraph',
      content:
        'We&apos;ve all been there. Docking can be the most stressful part of the day. Crosswinds, currents, tight slips—it&apos;s enough to make even seasoned boaters sweat. Now, thanks to autonomous docking systems powered by GPS, sensors, and AI, your boat can literally guide itself to the dock. With smooth, precise, and stress-free maneuvers—even in tough conditions.',
    },
    {
      type: 'image',
      heading: 'Smarter Weather Predictions',
      content:
        'Checking the classic weather app is &apos;no longer enough&apos; when you&apos;re on the water. That&apos;s why today&apos;s smart marine systems offer hyperlocal forecasts directly at the helm. Advanced weather models give early warnings on storms, wind shifts, and wave conditions—helping you decide whether to power through or stay tied up and live to fish another day onboard meteorologist.',
      caption: 'Advanced marine technology display',
    },
    {
      type: 'heading',
      content: 'Maintenance That Finds You',
    },
    {
      type: 'paragraph',
      content:
        'No one likes surprises when it comes to boat care. Luckily, boats are getting better at looking out for themselves. Intelligent sensors now track everything from engine hours and battery voltage to bilge pump status and navigation lights. When something needs attention, your system can ping your phone with a notification. Think of it less like a chore list and more like getting a friendly nudge: &quot;Hey, time for an oil change,&quot; or &quot;Your battery&apos;s running low.&quot; You&apos;re not just reacting anymore—you&apos;re protecting your investment and giving yourself peace of mind.',
    },
    {
      type: 'heading',
      content: 'Tech That Elevates the Experience',
    },
    {
      type: 'paragraph',
      content:
        'Smart boating isn&apos;t just about comfort. From one central app (or even a voice command), you can control underwater lights, playlists, and cabin climate. Imagine cueing up the perfect soundtrack and setting the mood lighting before you even drop anchor. Want to control your boat from your phone? Done. Need remote monitoring while it&apos;s docked? You got it. Technology is no longer just for tech enthusiasts—it&apos;s for anyone who wants to spend more time enjoying the water and less time worrying about the details.',
    },
    {
      type: 'heading',
      content: 'The Bottom Line',
    },
    {
      type: 'paragraph',
      content:
        'The future of boating isn&apos;t years away—it&apos;s already here. Whether it&apos;s docking without the drama, staying ahead of bad weather, or making sure your boat is ready when you are, today&apos;s technology is all about making boating safer, easier, and a whole lot more fun than ever.',
    },
    {
      type: 'paragraph',
      content:
        'And the best part? It&apos;s making boating safer, easier, and more fun than ever.',
    },
    {
      type: 'paragraph',
      content:
        'So next time you step aboard, ask yourself: is your boat as smart as you are?',
    },
  ],
};
