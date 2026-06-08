import { createContext, useContext, useState, useEffect } from 'react'
import type { Movie } from '../types/movies'
import { supabase } from '../utils/supabase'
import { useAuth } from './AuthContext'

interface FavoritesContextType {
  favorites: Movie[]
  addFavorite: (movie: Movie) => Promise<void>
  removeFavorite: (id: number) => Promise<void>
  isFavorite: (id: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    try {
      const stored = localStorage.getItem('moodroll-favorites')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // load from Supabase when user logs in
  useEffect(() => {
    if (user) {
      loadFavorites()
    } else {
      // fall back to localStorage when logged out
      const stored = localStorage.getItem('moodroll-favorites')
      setFavorites(stored ? JSON.parse(stored) : [])
    }
  }, [user])

  // sync to localStorage for logged out users
  useEffect(() => {
    if (!user) {
      localStorage.setItem('moodroll-favorites', JSON.stringify(favorites))
    }
  }, [favorites, user])

  const loadFavorites = async () => {
    const { data, error } = await supabase
      .from('favorites')
      .select('movie_data')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Failed to load favorites:', error)
      return
    }

    setFavorites(data.map(row => row.movie_data as Movie))
  }

  const addFavorite = async (movie: Movie) => {
    if (favorites.find(m => m.id === movie.id)) return

    setFavorites(prev => [...prev, movie])

    if (user) {
      const { error } = await supabase.from('favorites').insert({
        user_id: user.id,
        movie_id: movie.id,
        movie_data: movie,
      })
      if (error) console.error('Failed to save favorite:', error)
    }
  }

  const removeFavorite = async (id: number) => {
    setFavorites(prev => prev.filter(m => m.id !== id))

    if (user) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('movie_id', id)
        .eq('user_id', user.id)
      if (error) console.error('Failed to remove favorite:', error)
    }
  }

  const isFavorite = (id: number) => favorites.some(m => m.id === id)

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used inside FavoritesProvider')
  return context
}