import { useWatched } from "../context/WatchedContext"
import MovieCard from "../components/MovieCard"
import type { Movie } from "../types/movies"
import MovieModal from "../components/MovieModal"
import { useState } from "react"

export default function Watched() {
  const { watched } = useWatched()
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
   const [selectedType, setSelectedType] = useState<'movie' | 'tv'>('movie')

  const movieFavorites = watched.filter(m => (m as any).mediaType === 'movie' || !(m as any).mediaType)
  const tvFavorites = watched.filter(m => (m as any).mediaType === 'tv')
  const displayed = selectedType === 'movie' ? movieFavorites : tvFavorites
  
  return (
    <div style={{
      background: '#f8f8ff',
      minHeight: '100vh'
    }}
    >
      <div style={{
        padding: '32px 24px 16px',
        background: '#f8f8ff',
      }}
      >
        <h1 style={{
          fontSize: 22,
          fontWeight: 500,
          marginBottom: 4,
          color: '#1a1a2e',
        }}
        >Your watched</h1>

        <div style={{ 
          display: 'inline-flex', 
          background: 'white', 
          border: '1px solid #e0e0e0', 
          borderRadius: 20, 
          padding: 3, 
          gap: 4, 
          marginTop: 12 
        }}>
        {(['movie', 'tv'] as const).map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            style={{
              padding: '6px 18px',
              borderRadius: 20,
              border: 'none',
              fontSize: 13,
              fontWeight: selectedType === type ? 500 : 400,
              cursor: 'pointer',
              background: selectedType === type ? '#7c3aed' : 'transparent',
              color: selectedType === type ? 'white' : '#888',
              transition: 'all 0.15s ease',
            }}
          >
            {type === 'movie' ? `🎬 Movies (${movieFavorites.length})` : `📺 TV Shows (${tvFavorites.length})`}
          </button>
        ))}
        </div>
        <p style={{
          fontSize: 14,
          color: '#b1b0b0'
        }}
        >{watched.length} {watched.length === 1 ? 'title' : 'titles'}
        </p>
      </div>
      {watched.length === 0 ? (
        <div style={{
          padding: '80px 24px',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: 40,
            marginBottom: 12
          }}>🎬
          </p>
          <p style={{
            fontSize: 16,
            fontWeight: 500,
            color: '#1a1a2e',
            marginBottom: 6,
          }}
          >No watched yet</p>
          <p style={{
            fontSize: 13,
            color: '#aaa',
          }}
          >Like a move or show</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 12,
          padding: '8px 24px 32px',
        }}>
          {displayed.map(movie => (
            <div
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              style={{
                cursor: 'pointer'
              }}>
              <MovieCard movie={movie} mediaType={selectedType}/>
            </div>
          ))}
    </div>
  )}
   {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          mediaType={selectedType}
          onClose={() => setSelectedMovie(null)}
        />
      )}

    </div>
  )
}