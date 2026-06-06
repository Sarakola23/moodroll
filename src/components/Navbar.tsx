import { Link, useLocation } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function Navbar() {
  const { favorites } = useFavorites()
  const location = useLocation()

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 24px',
      borderBottom: '1.0px solid #c9c8c8',
      background: '#ffffff',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.5px', color: 'var(--color-text-primary)' }}>
          mood<span style={{ color: '#D85A30' }}>roll</span>
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>

        <Link to="/" style={{
          fontSize: 14,
          textDecoration: 'none',
          color: location.pathname === '/' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
          fontWeight: location.pathname === '/' ? 500 : 400,
        }}>
          Discover
        </Link>

        <Link to="/favorites" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13,
          textDecoration: 'none',
          color: location.pathname === '/favorites' ? '#D85A30' : 'var(--color-text-secondary)',
          background: '#f8f8ff',
          padding: '5px 12px',
          borderRadius: 20,
          border: '0.5px solid var(--color-border-tertiary)',
        }}>
          ♥ Favorites
          {favorites.length > 0 && (
            <span style={{
              background: '#D85A30',
              color: '#fff',
              fontSize: 11,
              fontWeight: 500,
              borderRadius: 10,
              padding: '1px 6px',
              marginLeft: 2,
            }}>
              {favorites.length}
            </span>
          )}
        </Link>

      </div>
    </nav>
  )
}