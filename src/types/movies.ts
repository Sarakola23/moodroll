export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  popularity: number
}

export interface TVShow {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  popularity: number
}

export interface MovieDetails extends Movie {
  genres: Genre[]
  runtime: number | null
  tagline: string
}

export interface Genre {
  id: number
  name: string
}

export interface TMDBResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type Mood =
  | 'action' | 'adventure' | 'animation' | 'comedy' | 'crime'
  | 'documentary' | 'drama' | 'family' | 'fantasy' | 'history'
  | 'horror' | 'music' | 'mystery' | 'romance' | 'science-fiction'
  | 'thriller' | 'war' | 'western'
  | 'action-adventure' | 'kids' | 'news' | 'reality'
  | 'sci-fi-fantasy' | 'soap' | 'talk' | 'war-politics'

export type MediaType = 'movie' | 'tv'

export interface MoodConfig {
  label: string
  genres: number[]  // TMDB genre IDs
  tvGenres: number[]
  sortBy?: string
}

export const MOOD_MAP: Record<Mood, MoodConfig> = {
  'action':           { label: 'Action',           genres: [28],    tvGenres: [10759] },
  'adventure':        { label: 'Adventure',        genres: [12],    tvGenres: [10759] },
  'animation':        { label: 'Animation',        genres: [16],    tvGenres: [16] },
  'comedy':           { label: 'Comedy',           genres: [35],    tvGenres: [35] },
  'crime':            { label: 'Crime',            genres: [80],    tvGenres: [80] },
  'documentary':      { label: 'Documentary',      genres: [99],    tvGenres: [99] },
  'drama':            { label: 'Drama',            genres: [18],    tvGenres: [18] },
  'family':           { label: 'Family',           genres: [10751], tvGenres: [10751] },
  'fantasy':          { label: 'Fantasy',          genres: [14],    tvGenres: [10765] },
  'history':          { label: 'History',          genres: [36],    tvGenres: [] },
  'horror':           { label: 'Horror',           genres: [27],    tvGenres: [] },
  'music':            { label: 'Music',            genres: [10402], tvGenres: [] },
  'mystery':          { label: 'Mystery',          genres: [9648],  tvGenres: [9648] },
  'romance':          { label: 'Romance',          genres: [10749], tvGenres: [] },
  'science-fiction':  { label: 'Science Fiction',  genres: [878],   tvGenres: [10765] },
  'thriller':         { label: 'Thriller',         genres: [53],    tvGenres: [] },
  'war':              { label: 'War',              genres: [10752], tvGenres: [10768] },
  'western':          { label: 'Western',          genres: [37],    tvGenres: [37] },
  'action-adventure': { label: 'Action & Adventure',genres: [28,12], tvGenres: [10759] },
  'kids':             { label: 'Kids',             genres: [10751], tvGenres: [10762] },
  'news':             { label: 'News',             genres: [],      tvGenres: [10763] },
  'reality':          { label: 'Reality',          genres: [],      tvGenres: [10764] },
  'sci-fi-fantasy':   { label: 'Sci-Fi & Fantasy', genres: [878,14],tvGenres: [10765] },
  'soap':             { label: 'Soap',             genres: [],      tvGenres: [10766] },
  'talk':             { label: 'Talk',             genres: [],      tvGenres: [10767] },
  'war-politics':     { label: 'War & Politics',   genres: [10752], tvGenres: [10768] },
}