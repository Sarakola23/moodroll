//import { config } from 'process'
import type { Mood } from '../types/movies'
import { MOOD_MAP } from '../types/movies'

interface Props {
    activeMood: Mood | null
    onSelect: (mood: Mood | null) => void
} 

const MOOD_COLORS: Record<Mood, { bg: string, border: string, color: string}> = {
    'feel-good':    { bg: '#FFF3D6', border: '#F5C842', color: '#7A5C00' },
    'thrilling':    { bg: '#EDE0FF', border: '#A87EE8', color: '#4B1FA0' },
    'mind-bending': { bg: '#FFE0F0', border: '#F087BC', color: '#8C1F55' },
    'emotional':    { bg: '#FFE5E5', border: '#F28B82', color: '#8C1F1F' },
    'action':       { bg: '#FFE8D6', border: '#F4A261', color: '#7A3500' },
    'chill':        { bg: '#D6F5E3', border: '#52C47A', color: '#145C30' },
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
            const colors = MOOD_COLORS[key]
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
                        border: `0.5px solid ${isActive ? colors.border : colors.border + '99'}`,
                        background: colors.bg,
                        color: colors.color,
                        fontWeight: isActive ? 600 : 400,
                        fontSize: 13,
                        cursor: 'pointer',
                        opacity: isActive ? 1 : 0.85,
                        transform: isActive ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.15s ease',
                        boxShadow: isActive ? `0 2px 8px ${colors.border}66` : 'none',
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