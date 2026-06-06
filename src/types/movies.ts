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

export type Mood = 'feel-good' | 'thrilling' | 'mind-bending' | 'emotional' | 'action' | 'chill'

export type MediaType = 'movie' | 'tv'

export interface MoodConfig {
  label: string
  emoji: string
  genres: number[]  // TMDB genre IDs
  tvGenres: number[]
  sortBy?: string
}

export const MOOD_MAP: Record<Mood, MoodConfig> = {
  'feel-good': {
    label: 'Feel Good',
    emoji: '😄',
    genres: [35, 10751],        // Comedy, Family
    tvGenres:[35, 10751],
  },
  'thrilling': {
    label: 'Thrilling',
    emoji: '😱',
    genres: [53, 27],           // Thriller, Horror
    tvGenres:[9648, 10765],
  },
  'mind-bending': {
    label: 'Mind Bending',
    emoji: '🤯',
    genres: [878, 9648],        // Sci-Fi, Mystery
    tvGenres:[10765, 9648],
  },
  'emotional': {
    label: 'Emotional',
    emoji: '😢',
    genres: [18, 10749],        // Drama, Romance
    tvGenres:[18, 10767],
  },
  'action': {
    label: 'Action',
    emoji: '💥',
    genres: [28, 12],           // Action, Adventure
    tvGenres:[10759],
  },
  'chill': {
    label: 'Chill',
    emoji: '😌',
    genres: [99, 36],           // Documentary, History
    tvGenres:[99],
  },
}