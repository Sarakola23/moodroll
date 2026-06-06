import type { Movie } from '../types/movies'
import { useFavorites } from '../context/FavoritesContext'

const IMG_BASE = 'https://image.tmdb.org/t/p/w300'

interface Props {
    movie: Movie
}

export default function MovieCard({ movie }: Props) {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites()
    const fav = isFavorite(movie.id)

    return (
        <div style={{
            background: '#f8f8ff',
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: 12,
            overflow: 'hidden',
            position: 'relative', 
        }}>
            {movie.poster_path ? (
                <img 
                    src={`${IMG_BASE}${movie.poster_path}`}
                    alt={movie.title}
                    style={{
                        width: '100%',
                        aspectRatio: '2/3',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />
            ) : (
                <div style={{
                    width: '100%',
                    aspectRatio: '2/3',
                    background: '#f8f8ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 32,
                }}>🎬
                </div>
            )}
            <button
                onClick={() => fav ? removeFavorite(movie.id) : addFavorite(movie)}
                style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: '#f8f8ff',
                    border: '0.5px solid var(--color-border-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: 13,
                }}
                aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            >
                {fav ? '❤️' : '🤍'}
            </button>

            <div style={{ padding: '8px 10px 10px' }}>
                <p style={{
                    fontSize: 12, 
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: 3,
                }}>
                    {(movie as any).title ?? (movie as any).name}
                </p>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span style={{
                        fontSize: 11,
                        color: 'var(--color-text-tertiary)'
                    }}>
                        {((movie as any).release_date ?? (movie as any).first_air_date)?.slice(0, 4)}
                    </span>
                    <span style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: '#ba7517'
                    }}>
                        ★ {movie.vote_average.toFixed(1)}
                    </span>
                </div>
            </div>
        </div>
    )
}