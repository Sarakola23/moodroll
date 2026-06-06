import { useEffect, useState } from "react";

interface Props {
    onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: Props) {
    const [value, setValue] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(value)
        }, 400)
        return () => clearTimeout(timer)
    }, [value])

    const handleSubmit = () => {
        onSearch(value)
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'white',
            border: '0.5px',
            borderRadius: 12,
            padding: '10px 16px',
            maxWidth: 520,
        }}>
            <span style={{
                fontSize: 22, 
                color: '#aaa',
                lineHeight: 1,
            }}>⌕</span>

            <input
                type="text"
                placeholder="Search movie..."
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: 14,
                    color: 'var(--color-text-primary)',
                    width: '100%'
                }}
            ></input>
            <button
                onClick={handleSubmit}
                style={{
                    flexShrink: 0,
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: '#7c3aed',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    color: 'white'
                }}
            >➜</button>
            
        </div>
    )
}