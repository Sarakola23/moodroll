import MovieCard from "../components/MovieCard"
import type { Movie } from "../types/movies"
import MovieModal from "../components/MovieModal"
import { useState } from "react"
import MovieFilter from "../components/MovieFilterTemp"
import { useMovies } from "../hooks/useMovies"
import MediaToggle from "../components/MediaToggle"

export default function Surprise() {
  const { movies, mood, setMood, mediaType, setMediaType } = useMovies()

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  // randomizer
  const [randomPick, setRandomPick] = useState<Movie | null>(null)

  // choose movies/tv shows by year
  const [decade, setDecade] = useState<{ from: number, to: number} | null>(null)

  const decades = [
    { label: 'All time',  from: 1888, to: new Date().getFullYear() },
    { label: 'Before 1950', from: 1888, to: 1949 },
    { label: '1950s', from: 1950, to: 1959 },
    { label: '1960s', from: 1960, to: 1969 },
    { label: '1970s', from: 1970, to: 1979 },
    { label: '1980s', from: 1980, to: 1989 },
    { label: '1990s', from: 1990, to: 1999 },
    { label: '2000s', from: 2000, to: 2009 },
    { label: '2010s', from: 2010, to: 2019 },
    { label: '2020s', from: 2020, to: new Date().getFullYear() },
  ]

  const handleRandomizer = () => {
    if (!movies.length) return

    const filtered = decade ? movies.filter(movie => {
      const date = (movie as any).release_date ?? (movie as any).first_air_date ?? ''
      const year = Number(date.slice(0, 4))
      if (Number.isNaN(year)) return false
      return year >= decade.from && year <= decade.to
    }) : movies

    if (!filtered.length) {
      setRandomPick(null)
      return
    }

    const random = filtered[Math.floor(Math.random() * filtered.length)]
    setRandomPick(random)
  }
  

  return (
    <div style={{
      background: '#f8f8ff',
      minHeight: '100vh'
    }}
    >
    
    <div style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: '0 24px'
    }}>

        <div className="surprise-hero">
            <h1 className="surprise-title">Let fate pick</h1>
            <span className="surprise-title-gradient">your next watch</span>
            <p className="surprise-subtitle">No overthinking. Just one random pick.</p>
        </div>
        
        <div
        style={{ 
            display: 'flex', 
            justifyContent: 'center' 
        }}>
        <MediaToggle mediaType={mediaType} onToggle={setMediaType} />

        </div>

        <div style={{ 
            display: 'flex', 
            justifyContent: 'center' 
        }}>
            <MovieFilter activeMood={mood} onSelect={setMood} />
        </div>

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 12,
            marginTop: 16,
            flexWrap: 'wrap',
            padding: '0 24px',
        }}>
            {decades.map (d => (
                <button
                    key={d.label}
                    onClick={() => setDecade(
                        decade?.from === d.from && decade?.to === d.to
                            ? null
                            : { from: d.from, to: d.to}
                    )}
                    style={{
                        padding: '6px 14px',
                        borderRadius: 20,
                        border: decade?.from === d.from && decade?.to === d.to
                            ? '1.5px solid #7ceaed'
                            : '1.5px solid #e0e0e0',
                        background: decade?.from === d.from && decade?.to === d.to
                            ? '#7c3aed'
                            : 'white',
                        color: decade?.from === d.from && decade?.to === d.to
                            ? 'white'
                            : '#555',
                        fontSize: 13,
                        fontWeight: decade?.from === d.from && decade?.to === d.to ? 500 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                    }}
                >{d.label}</button>
            ))}
        </div>

        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: 12 
        }}>
        <button
            onClick={handleRandomizer}
            style={{
            padding: '10px 16px',
            borderRadius: 10,
            border: 'none',
            background: 'linear-gradient(90deg, #7c3aed, #ec8e6e)',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer'
            }}
        >
            🎲 Pick for me
        </button>
        </div>

        {randomPick && (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 20
            }}>
                <div
                    onClick={() => setSelectedMovie(randomPick)}
                    style={{
                        cursor: 'pointer',
                    }}
                >
                    <MovieCard movie={randomPick} mediaType={mediaType}/>
                </div>
            </div>
        )}

        {selectedMovie && (
        <MovieModal
            movie={selectedMovie}
            mediaType={mediaType}
            onClose={() => setSelectedMovie(null)}
            />
        )}
        </div>
    </div>
  )
}