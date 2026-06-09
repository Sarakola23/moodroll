import { useEffect, useState } from 'react'
import type { Movie, MovieDetails } from '../types/movies'
import { useFavorites } from '../context/FavoritesContext'
import { useWatched } from '../context/WatchedContext'

const IMG_BASE = 'https://image.tmdb.org/t/p/w500'
const BACKDROP_BASE = 'https://image.tmdb.org/t/p/w1280'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

interface Props {
  movie: Movie
  mediaType: 'movie' | 'tv'
  onClose: () => void
}

export default function MovieModal({ movie, mediaType, onClose }: Props) {
  const [details, setDetails] = useState<MovieDetails | null>(null)
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const fav = isFavorite(movie.id)

  const { isWatched, addWatched, removeWatched } = useWatched()
  const watched = isWatched(movie.id)

  const title = (movie as any).title ?? (movie as any).name
  const date = (movie as any).release_date ?? (movie as any).first_air_date

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${movie.id}`,
          { headers: { Authorization: `Bearer ${API_KEY}` } }
        )
        const data = await res.json()
        setDetails(data)
      } catch {
        console.error('Failed to fetch details')
      }
    }
    fetchDetails()

    // close on escape key
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [movie.id])

  return (
    // backdrop
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      {/* modal box */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: 16,
          maxWidth: 640,
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        {/* backdrop image */}
        {movie.backdrop_path && (
          <img
            src={`${BACKDROP_BASE}${movie.backdrop_path}`}
            alt={title}
            style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: '16px 16px 0 0' }}
          />
        )}

        {/* close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.5)',
            border: 'none',
            color: 'white',
            fontSize: 16,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >✕</button>

        <div style={{ display: 'flex', gap: 16, padding: 20 }}>
          {/* poster */}
          {movie.poster_path && (
            <img
              src={`${IMG_BASE}${movie.poster_path}`}
              alt={title}
              style={{ width: 100, height: 150, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
            />
          )}

          <div style={{ flex: 1 }}>
            {/* title + year */}
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1a1a2e', marginBottom: 4 }}>
              {title}
            </h2>
            <p style={{ fontSize: 13, color: '#aaa', marginBottom: 8 }}>
              {date?.slice(0, 4)}
              {details?.runtime ? ` • ${details.runtime} min` : ''}
            </p>

            {/* rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{
                background: '#7c3aed',
                color: 'white',
                fontSize: 12,
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: 20,
              }}>
                ★ {movie.vote_average.toFixed(1)}
              </span>

              {/* favorite button */}
              <button
                onClick={() => fav ? removeFavorite(movie.id) : addFavorite(movie, mediaType)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '3px 12px',
                  borderRadius: 20,
                  border: '1.5px solid #f28b82',
                  background: fav ? '#fff0f0' : 'transparent',
                  color: '#e05c5c',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {fav ? '❤️ Saved' : '🤍 Save'}
              </button>

              <button
                onClick={() => watched ? removeWatched(movie.id) : addWatched(movie, mediaType)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '3px 12px',
                  borderRadius: 20,
                  border: '1.5px solid #f28b82',
                  background: watched ? '#fff0f0' : 'transparent',
                  color: '#e05c5c',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {watched ? 'Watched' : 'Mark watched'}
              </button>
            </div>

            {/* genres */}
            {details?.genres && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {details.genres.map(g => (
                  <span key={g.id} style={{
                    fontSize: 11,
                    padding: '3px 10px',
                    borderRadius: 20,
                    background: '#f0f0ff',
                    color: '#7c3aed',
                    border: '1px solid #ddd',
                  }}>
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {/* tagline */}
            {details?.tagline && (
              <p style={{ fontSize: 13, color: '#aaa', fontStyle: 'italic', marginBottom: 8 }}>
                "{details.tagline}"
              </p>
            )}

            {/* overview */}
            <p style={{ fontSize: 14, color: '#444', lineHeight: 1.6 }}>
              {movie.overview || 'No description available.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}