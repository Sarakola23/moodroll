import { useFavorites } from "../context/FavoritesContext"
import MovieCard from "../components/MovieCard"
import type { Movie } from "../types/movies"
import MovieModal from "../components/MovieModal"
import { useState } from "react"
import { useWatched } from "../context/WatchedContext"

export default function Watched() {
  const { watched } = useWatched()
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

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
          {watched.map(movie => (
            <div
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              style={{
                cursor: 'pointer'
              }}>
              <MovieCard movie={movie}/>
            </div>
          ))}
    </div>
  )}
   {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          mediaType="movie"
          onClose={() => setSelectedMovie(null)}
        />
      )}

    </div>
  )
}