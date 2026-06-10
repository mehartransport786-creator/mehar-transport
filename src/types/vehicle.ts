export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  type: string;
  nameAr: string;
  typeAr: string;
  passengers: number;
  luggage: number;
  luxuryLevel: number;
  airportTransfer: boolean;
  umrahTransfer: boolean;
  intercityTravel: boolean;
  vipService: boolean;
  basePrice: number;
  image: string;
  gallery: string[];
  features: string[];
  featuresAr: string[];
  description: string;
  descriptionAr: string;
  targetAudience: string[];
  specialLabel?: string;
  specialLabelAr?: string;
  badge?: string;
  badgeAr?: string;
}

export interface VehicleTheme {
  primary: string;
  secondary: string;
  personality: string;
  personalityAr: string;
}

export interface VehicleStory {
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
}

export interface VehiclePerfectFor {
  id: string;
  label: string;
  labelAr: string;
}

export interface VehicleComfortFeature {
  id: string;
  label: string;
  labelAr: string;
}

export interface VehicleFAQ {
  q: string;
  a: string;
  qAr: string;
  aAr: string;
}

export interface VehicleReview {
  name: string;
  country: string;
  route: string;
  rating: number;
  review: string;
  reviewAr: string;
  image: string;
}

export interface VehicleSeoContent {
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
}

export interface VehicleDetails {
  theme: VehicleTheme;
  story: VehicleStory;
  perfectFor: VehiclePerfectFor[];
  comfortFeatures: VehicleComfortFeature[];
  faqs: VehicleFAQ[];
  reviews: VehicleReview[];
  seoContent: VehicleSeoContent;
}

export interface Route {
  id: string;
  slug: string;
  origin: string;
  destination: string;
  originAr: string;
  destinationAr: string;
  distance: string;
  duration: string;
  startingPrice: number;
  image: string;
}
