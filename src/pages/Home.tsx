import SearchBar from "../components/SearchBar"
import { useMovies } from "../hooks/useMovies"
import MovieFilter from "../components/MovieFilterTemp"
import MovieCard from "../components/MovieCard"
import type { SortOption } from "../hooks/useMovies"
import MediaToggle from "../components/MediaToggle"
import MovieModal from "../components/MovieModal"
import { useState } from 'react'
import type { Movie } from '../types/movies'

export default function Home() {
  const { searchMovies, mood, setMood, movies, loading, error, sortBy, setSortBy, mediaType, setMediaType, page, totalPages, goToPage } = useMovies()
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const getPageNum = () => {
    const pages: (number | '...')[] = []
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    pages.push(1)
    if (page > 3) pages.push('...')
    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    if (page < totalPages - 2) pages.push('...')
    pages.push(totalPages)
    return pages
  }

  return (
    <div style={{ background: '#f8f8ff', minHeight: '100vh' }}>

      {/* centered container */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* hero */}
        <div style={{
          padding: '32px 0 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8, textAlign: 'center', color: '#1a1a2e' }}>
            What is today's mood?
          </h1>
          <p style={{ fontSize: 16, color: '#b1b0b0', marginBottom: 20, textAlign: 'center' }}>
            Let's find the perfect movie
          </p>
          <SearchBar onSearch={searchMovies} />
          <MediaToggle mediaType={mediaType} onToggle={setMediaType} />
        </div>

        {/* mood filter — centered */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MovieFilter activeMood={mood} onSelect={setMood} />
        </div>

        {/* sort row */}
        <div style={{
          padding: '8px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <p style={{ fontSize: 15, fontWeight: 500, color: '#1a1a2e' }}>
            {mood ? `${mood.replace('-', ' ')} picks`
            : mediaType === 'movie' ? 'Trending movies' : 'Trending TV Shows'}
          </p>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortOption)}
            style={{
              fontSize: 13, color: '#1a1a2e', background: '#f8f8ff',
              border: '1px solid #e0e0e0', padding: '5px 10px',
              borderRadius: 8, cursor: 'pointer',
            }}
          >
            <option value="popularity">Sort: Popularity</option>
            <option value="rating">Sort: Rating</option>
            <option value="year">Sort: Year</option>
          </select>
        </div>

        {/* loading / error */}
        {loading && (
          <p style={{ padding: '40px 0', textAlign: 'center', color: '#aaa' }}>Loading...</p>
        )}
        {error && (
          <p style={{ padding: '40px 0', textAlign: 'center', color: 'red' }}>{error}</p>
        )}

        {/* movie grid */}
        {!loading && !error && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 12,
            padding: '8px 0 32px',
          }}>
            {movies.map(movie => (
              <div key={movie.id} onClick={() => setSelectedMovie(movie)} style={{ cursor: 'pointer' }}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}

        {/* pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, padding: '8px 0 32px' }}>
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              style={{
                padding: '6px 12px', borderRadius: 8,
                border: '1px solid #e0e0e0', background: 'white',
                color: page === 1 ? '#ccc' : '#1a1a2e',
                cursor: page === 1 ? 'not-allowed' : 'pointer', fontSize: 13,
              }}
            >←</button>

            {getPageNum().map((num, i) =>
              num === '...' ? (
                <span key={`dots-${i}`} style={{ fontSize: 13, color: '#aaa', padding: '0 4px' }}>...</span>
              ) : (
                <button
                  key={num}
                  onClick={() => goToPage(num as number)}
                  style={{
                    width: 34, height: 34, borderRadius: 8,
                    border: num === page ? 'none' : '1px solid #e0e0e0',
                    background: num === page ? '#7c3aed' : 'white',
                    color: num === page ? 'white' : '#1a1a2e',
                    fontWeight: num === page ? 600 : 400,
                    fontSize: 13, cursor: 'pointer',
                  }}
                >{num}</button>
              )
            )}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              style={{
                padding: '6px 12px', borderRadius: 8,
                border: '1px solid #e0e0e0', background: 'white',
                color: page === totalPages ? '#ccc' : '#1a1a2e',
                cursor: page === totalPages ? 'not-allowed' : 'pointer', fontSize: 13,
              }}
            >→</button>
          </div>
        )}

      </div>

      {/* modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          mediaType={mediaType}
          onClose={() => setSelectedMovie(null)}
        />
      )}

    </div>
  )
}