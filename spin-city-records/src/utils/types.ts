export type Album = {
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
  Collection: Collection[];
};

export type Artist = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  bio: string;
  artwork: string;
  albums: Album[];
};

export type Review = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  comment: string;
  userId: string;
};

export type Listing = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  currency: string;
  weight: string;
  format: string;
  description: string;
  condition: string;
  speed: string;
  edition?: Edition[];
  stripeProduct: string;
  stripePrice: string;
  seller?: Seller;
  stripeId: string;
  album?: Album;
  albumId: string;
  order?: Order | null;
  orderId?: string | null;
};

export type Collection = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  name: string;
  albums: Album[];
};

export type Order = {
  id: string;
  userId: string;
  sellerId: string;
  status: string;
  Listings: Listing[];
  completed: boolean;
};

export type ChatMesssage = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  message: string;
  senderId: string;
  receiverId: string;
};

export type Edition = {
  id: number;
  type: string;
  listings?: Listing[];
};

export type Seller = {
  id: string;
  stripeId: string;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  name: string;
  bio: string;
  email: string | null;
  location: string;
  listings: Listing[];
};
