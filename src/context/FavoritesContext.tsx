import { createContext, useContext, useState, useEffect } from 'react'
import type { Movie } from '../types/movies'

interface FavoritesContextType {
  favorites: Movie[]
  addFavorite: (movie: Movie) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
  shareableUrl: string
}

const FavoritesContext = createContext<FavoritesContextType | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    try {
      const stored = localStorage.getItem('moodroll-favorites')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Sync to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('moodroll-favorites', JSON.stringify(favorites))
  }, [favorites])

  // Build shareable URL from favorite IDs
  const shareableUrl = `${window.location.origin}/moodroll/?list=${
    favorites.map(m => m.id).join(',')
  }`

  const addFavorite = (movie: Movie) => {
    setFavorites(prev => {
      if (prev.find(m => m.id === movie.id)) return prev
      return [...prev, movie]
    })
  }

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(m => m.id !== id))
  }

  const isFavorite = (id: number) => {
    return favorites.some(m => m.id === id)
  }

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      shareableUrl,
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used inside FavoritesProvider')
  return context
}