//import { config } from 'process'
import type { Mood } from '../types/movies'
import { MOOD_MAP } from '../types/movies'

interface Props {
    activeMood: Mood | null
    onSelect: (mood: Mood | null) => void
} 

export default function MovieFilter({ activeMood, onSelect }: Props){
    return (
        <div style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            padding: '16px 24px'
        }}>
        {(Object.entries(MOOD_MAP) as [Mood, typeof MOOD_MAP[Mood]][]).map(([key, config]) => {
            
            const isActive = activeMood === key
            return (
                <button
                    key={key}
                    onClick={() => onSelect(isActive ? null : key)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '7px 14px',
                        borderRadius: 20,
                        border: isActive ? '1.5px solid #a681e6' : '1.5px solid #e0e0e0',
                        background: isActive ? '#a681e6' : 'white',
                        color: isActive ? 'white' : '#555',
                        fontWeight: isActive ? 600 : 400,
                        fontSize: 13,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                    }}
                >
                    <span>{config.emoji}</span>
                    {config.label}
                </button>
            )
        })}
        </div>
    )
}