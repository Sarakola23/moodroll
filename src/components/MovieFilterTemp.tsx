//import { config } from 'process'
import type { Mood } from '../types/movies'
import { MOOD_MAP } from '../types/movies'
import { useState } from 'react'

interface Props {
    activeMood: Mood | null
    onSelect: (mood: Mood | null) => void
} 

const DEFAULT_GENRES: Mood[] = ['action', 'comedy', 'drama', 'romance', 'science-fiction']

export default function MovieFilter({ activeMood, onSelect }: Props){
    const [showAll, setShowAll] = useState(false)
    const visibleMoods = showAll
        ? (Object.keys(MOOD_MAP) as Mood[])
        : DEFAULT_GENRES

    return (
        <div style={{
            padding: '8px 24px'
        }}>
        <div style={{
            display: 'flex',
            gap: 8, 
            flexWrap: 'wrap'
        }}>
        {visibleMoods.map(key => {
          const config = MOOD_MAP[key]
          const isActive = activeMood === key
          return (
            <button
              key={key}
              onClick={() => onSelect(isActive ? null : key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 16px',
                borderRadius: 20,
                border: isActive ? '1.5px solid #7c3aed' : '1.5px solid #e0e0e0',
                background: isActive ? '#7c3aed' : 'white',
                color: isActive ? 'white' : '#555',
                fontWeight: isActive ? 500 : 400,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}>{config.label}</button>
            )})}

            <button
                onClick={() => {
                    setShowAll(prev => !prev)
                    if (showAll && activeMood && !DEFAULT_GENRES.includes(activeMood)) {
                    onSelect(null) // reset if active genre gets hidden
                    }
                }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '7px 16px',
                    borderRadius: 20,
                    border: '1.5px solid #e0e0e0',
                    background: showAll ? '#f0f0ff' : 'white',
                    color: '#7c3aed',
                    fontWeight: 500,
                    fontSize: 13,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                }}
                >
                {showAll ? '✕ Less' : '＋ More genres'}
            </button>
        </div>
        </div>
    )
}