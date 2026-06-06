import { useState, useEffect, useCallback, useMemo } from 'react'
import type { Movie, TMDBResponse, Mood } from '../types/movies'
import type { MediaType } from '../types/movies'
import { MOOD_MAP } from '../types/movies'

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
}

// sort by rating, year, popularity
export type SortOption = 'popularity' | 'rating' | 'year'

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [mood, setMood] = useState<Mood | null>(null)

  // sort
  const [sortBy, setSortBy] = useState<SortOption>('popularity')

  // tv
  const [mediaType, setMediaType] = useState<MediaType>('movie')

  // view more
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const sortedMovies = useMemo(() => {
    return [...movies].sort((a, b) => {
      if (sortBy === 'rating')
        return b.vote_average - a.vote_average
      if (sortBy === 'year'){
        const dateA = (a as any).release_date ?? (a as any).first_air_date ?? ''
        const dateB = (b as any).release_date ?? (b as any).first_air_date ?? ''
        return dateB.localeCompare(dateA)
      }
      return b.popularity - a.popularity
    })
  }, [movies, sortBy])

  const fetchTrending = useCallback(async (pageNum = 1) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `${BASE_URL}/trending/${mediaType}/week?page=${pageNum}`, { headers })
      const data: TMDBResponse = await res.json()
      setMovies(data.results)
      setTotalPages(Math.min(data.total_pages, 100))
    } catch (err) {
      setError('Failed to fetch movies.')
    } finally {
      setLoading(false)
    }
  }, [mediaType])

  const searchMovies = useCallback(async (searchQuery: string, pageNum = 1) => {
    if (!searchQuery.trim()) return fetchTrending()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `${BASE_URL}/search/${mediaType}?query=${encodeURIComponent(searchQuery)}&include_adult=false&page=${pageNum}`,
        { headers }
      )
      const data: TMDBResponse = await res.json()
      setMovies(data.results)
      setTotalPages(Math.min(data.total_pages, 100))
    } catch (err) {
      setError('Search failed.')
    } finally {
      setLoading(false)
    }
  }, [fetchTrending, mediaType])

  const fetchByMood = useCallback(async (selectedMood: Mood, pageNum = 1) => {
    setLoading(true)
    setError(null)
    const { genres, tvGenres } = MOOD_MAP[selectedMood]
    const genreId = mediaType === 'tv' ? tvGenres : genres
    try {
      const res = await fetch(
      `${BASE_URL}/discover/${mediaType}?with_genres=${genreId.join(',')}&sort_by=popularity.desc&page=${pageNum}`,
      { headers }
    )
      const data: TMDBResponse = await res.json()
      setMovies(data.results)
      setTotalPages(Math.min(data.total_pages, 100))
    } catch (err) {
      setError('Failed to fetch by mood.')
    } finally {
      setLoading(false)
    }
  }, [mediaType])

  const goToPage = (pageNum: number) => {
    setPage(pageNum)
    if (mood) fetchByMood(mood, pageNum)
    else fetchTrending(pageNum)
  window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Load trending on mount
  useEffect(() => {
    fetchTrending()
  }, [fetchTrending])

  // React to mood changes
  useEffect(() => {
    setPage(1)
    if (mood) fetchByMood(mood, 1)
    else fetchTrending(1)
  }, [mood, mediaType])

  return {
    movies : sortedMovies,
    loading,
    error,
    query,
    setQuery,
    mood,
    setMood,
    searchMovies,
    fetchByMood,
    sortBy,
    setSortBy,
    mediaType,
    setMediaType,
    page,
    totalPages,
    goToPage,
  }
}