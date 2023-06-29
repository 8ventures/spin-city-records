export interface Review {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  comment: string;
  userId: string;
}

export interface Artist {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  bio: string;
  artistPicture: string;
  albums: Album[];
}

export interface Album {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  label: string;
  artwork: string;
  year: number;
  artist: Artist;
  artistId: string;
  listings: Listing[];
  collection: Collection[];
}

export interface Listing {
  id: string;
  createdAt: number;
  updatedAt: number;
  price: number;
  currency: string;
  weight: string;
  format: string;
  description: string;
  condition: string;
  speed: string;
  edition: Edition[];
  seller: Seller;
  sellerId: string;
  album: Album;
  albumId: string;
}

export interface Edition {
  id: string;
  type: string;
  listings: Listing[];
}

export interface Seller {
  id: string;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  location: string;
  listings: Listing[];
}

export interface ChatMesssage {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  message: string;
  senderId: string;
  receiverId: string;
}

export interface Collection {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  albums: Album[];
}
