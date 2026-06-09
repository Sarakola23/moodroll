import { createContext, useContext, useState, useEffect } from 'react'
import type { Movie } from '../types/movies'
import { supabase } from '../utils/supabase'
import { useAuth } from './AuthContext'

interface WatchedContextType {
  watched: (Movie & { mediaType: 'movie' | 'tv' })[]
  addWatched: (movie: Movie, mediaType: 'movie' | 'tv') => Promise<void>
  removeWatched: (id: number) => Promise<void>
  isWatched: (id: number) => boolean
}

const WatchedContext = createContext<WatchedContextType | null>(null)

export function WatchedProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [watched, setWatched] = useState<(Movie & { mediaType: 'movie' | 'tv' })[]>(() => {
    try {
      const stored = localStorage.getItem('moodroll-favorites')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (user) loadWatched()
    else {
      const stored = localStorage.getItem('moodroll-watched')
      setWatched(stored ? JSON.parse(stored) : [])
    }
  }, [user])

  useEffect(() => {
    if (!user) localStorage.setItem('moodroll-watched', JSON.stringify(watched))
  }, [watched, user])

  const loadWatched = async () => {
    const { data, error } = await supabase
      .from('watched')
      .select('movie_data')
      .order('created_at', { ascending: false })
    if (error) return
    setWatched(data.map(row => {
      const movieData = row.movie_data as Movie & { mediaType?: 'movie' | 'tv' }
      return movieData.mediaType
        ? (movieData as Movie & { mediaType: 'movie' | 'tv' })
        : {
            ...movieData,
            mediaType: (movieData as any).first_air_date ? 'tv' : 'movie'
          }
    }))
  }

  const addWatched = async (movie: Movie, mediaType: 'movie' | 'tv' = 'movie') => {
    if (watched.find(m => m.id === movie.id && m.mediaType === mediaType)) return
    const movieWithType = { ...movie, mediaType }
    setWatched(prev => [...prev, movieWithType])
    if (user) {
      await supabase.from('favorites').insert({
        user_id: user.id,
        movie_id: movie.id,
        movie_data: movieWithType,
      })
    }
  }

  const removeWatched = async (id: number) => {
    setWatched(prev => prev.filter(m => m.id !== id))
    if (user) {
      await supabase.from('watched').delete()
        .eq('movie_id', id)
        .eq('user_id', user.id)
    }
  }

  const isWatched = (id: number) => watched.some(m => m.id === id)

  return (
    <WatchedContext.Provider value={{ watched, addWatched, removeWatched, isWatched }}>
      {children}
    </WatchedContext.Provider>
  )
}

export function useWatched() {
  const context = useContext(WatchedContext)
  if (!context) throw new Error('useWatched must be used inside WatchedProvider')
  return context
}