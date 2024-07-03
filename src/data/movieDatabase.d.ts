declare module "../data/movieDatabase" {
  export interface Movie {
    id: number;
    title: string;
    rating: number;
    image: string;
  }

  export const movies: Movie[];
}
