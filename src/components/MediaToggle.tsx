import type { MediaType } from "../types/movies";

interface Props {
    mediaType: MediaType
    onToggle: (type: MediaType) => void
}

export default function MediaToggle({ mediaType, onToggle }: Props) {
    return (
        <div 
            style={{
                display: 'inline-flex',
                background: '#fdf5e6',
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 20,
                padding: 3,
                marginTop: 16,
            }}>
                {(['movie', 'tv'] as MediaType[]).map(type =>(
                    <button
                        key={type}
                        onClick={() => onToggle(type)}
                        style={{
                            padding: '6px 18px',
                            borderRadius: 20,
                            border: 'none',
                            fontSize: 13,
                            fontWeight: mediaType === type ? 500 : 400,
                            cursor: 'pointer',
                            background: mediaType === type ? '#d85a30' : 'transparent',
                            color: mediaType === type ? '#fff' : 'var(--color-text-secondary)',
                            transition: 'all 0.15s ease',
                        }}
                    >
                        {type === 'movie' ? '🎬 Movies' : '📺 TV Shows'}
                    </button>
                ))}
            </div>
    )
}