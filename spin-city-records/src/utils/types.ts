export interface Review {
  id: string,
  createdAt: Date,
  updatedAt: Date,
  userID: string,
  rating: number,
  comment: string
}

export interface Artist {
    id: string,
    artist: string,
    bio: string,
    artistPicture: string,
    createdAt: Date,
    updatedAt: Date
}

export interface Album {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  label: string
  artwork: string
  year: number
  duration: number
  artist: Artist
  listings: Listing[]
  collection: Collection[]
}
export interface Listing {
  id: string
  createdAt: number
  updatedAt: number
  price: number
  currency: string
  weight: string
  format: string
  description: string
  condition: string
  user: User
  userId: string
  album: Album
}

export interface User {
  id: string
  listings: Listing[]
  reviews: Review[]
  sentMessages: ChatMesssage[]
  recievedMessages: ChatMesssage[]
}

export interface ChatMesssage {
  id: string
  createdAt: Date
  updatedAt: Date
  message: string
  sender: User
  senderId: string
  receiver: User
  receiverId: string
}

export interface Collection {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  albums: Album[]
}