export interface Movie {
  _id: string;
  title: string;
  movie_image: string;
  rating: number;
  averageRating: number;
  commentsCount?: number;
  owner: string;
  ratingOfotherUsers: Array<{ userId: string; rating: number }>;
}
