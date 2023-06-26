export interface Album {
  id: string;
  name: string;
  artist: string;
  releaseYear: number;
  label: string;
  genre: string;
  artwork: string;
  createdAt: string;
  updatedAt: string;
}

export interface Listing {
  id: string;
  createdAt: string;
  updatedAt: string;
  sellerID: string;
  albumID: string;
  price: number;
  currency: string;
  condition: string;
  weight: string;
  format: string;
  speed: string;
  special: string[];
  description: string;
}

export interface Seller {
  id: string;
  name: string;
  email: string;
  location: Location;
  rating: number;
  listings: Listing[];
}

interface Location {
  city: string;
  state: string;
  country: string;
  address: string;
  postalCode: string;
}
