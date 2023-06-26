export interface Review {
  id: string,
  createdAt: "2023-06-24T12:00:00Z",
  updatedAt: "2023-06-24T12:00:00Z",
  userID: string,
  rating: number,
  comment: string
}

export interface Artist {
    id: string,
    artist: string,
    bio: string,
    artistPicture: string,
    createdAt: "2023-06-24T12:00:00Z",
    updatedAt: "2023-06-24T12:00:00Z"
}