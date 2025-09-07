// MovieItem type used across components
export interface MovieItem {
  id: string;
  title: string;
  year?: number;
  poster: string;
  genres: string[];
  why_this: string;
  platforms?: string[];
  tmdb_url?: string;
  rating?: number;
}
