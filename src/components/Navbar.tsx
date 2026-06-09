import { Link, useLocation } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useWatched } from '../context/WatchedContext'

export default function Navbar() {
  const { favorites } = useFavorites()
  const { watched } = useWatched()
  const location = useLocation()

  // drop down for user profile
  const [dropDown, setDropDown] = useState(false)
  const dropDownRef = useRef<HTMLDivElement>(null)

  const { user, username, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)){
        setDropDown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

      <Link to="/" style={{ 
        textDecoration: 'none' 
        }}>
        <span style={{ 
          fontSize: 20, 
          fontWeight: 500, 
          letterSpacing: '-0.5px', 
          color: 'var(--color-text-primary)' 
          }}>
          mood<span style={{ 
            color: '#D85A30' 
            }}>roll</span>
        </span>
      </Link>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 16, 
        flexWrap: 'wrap',
        }}>

        <Link to="/" style={{
          fontSize: 14,
          textDecoration: 'none',
          color: location.pathname === '/' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
          fontWeight: location.pathname === '/' ? 500 : 400,
          paddingBottom: 4,
          borderBottom: location.pathname === '/' ? '2px solid transparent' : 'none',
          backgroundImage: location.pathname === '/' ? 'linear-gradient(90deg, #7c3aed, #ec8e6e)' : 'none',
          backgroundSize: '100% 2px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
        }}>
          Discover
        </Link>

        <Link to="/favorites" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13,
          textDecoration: 'none',
          color: location.pathname === '/favorites' ? '#1a1a2e' : '#aaa',
          fontWeight: location.pathname === '/favorites' ? 500 : 400,
          padding: '0 0 4px 0',
          borderBottom: location.pathname === '/favorites' ? '2px solid transparent' : 'none',
          backgroundImage: location.pathname === '/favorites' ? 'linear-gradient(90deg, #7c3aed, #ec8e6e)' : 'none',
          backgroundSize: '100% 2px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
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
          <Link to="/surprise" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            textDecoration: 'none',
            color: location.pathname === '/surprise' ? '#1a1a2e' : '#aaa',
            fontWeight: location.pathname === '/surprise' ? 500 : 400,
            padding: '0 0 4px 0',
            borderBottom: location.pathname === '/surprise' ? '2px solid transparent' : 'none',
            backgroundImage: location.pathname === '/surprise' ? 'linear-gradient(90deg, #7c3aed, #ec8e6e)' : 'none',
            backgroundSize: '100% 2px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom',
          }}>
            Surprise
          </Link>
      </div>
      <div ref={dropDownRef} style={{ position: 'relative' }}>
        <div
          onClick={() => setDropDown(prev => !prev)}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed, #ec8e6e)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 400,
            color: 'white',
            flexShrink: 0,
          }}>{user ? username?.[0].toUpperCase() ?? '?' : '?'}
          </div>

        {dropDown && (
          <div style={{
            position: 'absolute',
            top: 44,
            right: 0,
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            minWidth: 180,
            overflow: 'hidden',
            zIndex: 100,
          }}>
            <div
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid #f0f0f0'
              }}>
                {user ? (
                  <>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#1a1a2e',
                        margin: 0
                      }}
                    >{username}</p>
                    <p style={{
                      fontSize: 11,
                      color: '#aaa',
                      margin: '2px 0 0'
                    }}>Signed In</p>
                  </>
                ) : (
                  <p style={{ 
                    fontSize: 13, 
                    color: '#aaa', 
                    margin: 0 
                  }}>Not signed in</p>
                )}
                {!user ? (
              <>
                <div
                  onClick={() => { 
                    navigate('/auth'); 
                    setDropDown(false) 
                  }}
                  style={{ 
                    padding: '10px 16px', 
                    fontSize: 13, 
                    color: '#1a1a2e', 
                    cursor: 'pointer', 
                    borderBottom: '1px solid #f0f0f0' 
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f8f8ff')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'white')}
                >Sign in</div>
                <div
                  onClick={() => { 
                    navigate('/auth?mode=signup'); 
                    setDropDown(false) 
                  }}
                  style={{ 
                    padding: '10px 16px', 
                    fontSize: 13, 
                    color: '#1a1a2e', 
                    cursor: 'pointer' 
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f8f8ff')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'white')}
                >Sign up</div>
                </>
            ) : (
              <>

                <div
                onClick={() => { 
                  navigate('/watched');
                  setDropDown(false)
                }}
                style={{
                  padding: '10px 16px',
                  fontSize: 13,
                  color: '#1a1a2e',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f0f0f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f8f8ff')}
                onMouseLeave={e => (e.currentTarget.style.background = 'white')}>
                <span>Watched</span>

                {watched.length > 0 && (
                  <span
                    style={{
                      background: '#7c3aed',
                      color: 'white',
                      fontSize: 11,
                      fontWeight: 500,
                      borderRadius: 10,
                      padding: '1px 6px'
                    }}>{watched.length}</span>
                )}
                </div>
                <div
                  onClick={() => { 
                    navigate('/'); 
                    setDropDown(false) 
                  }}
                  style={{ 
                    padding: '10px 16px', 
                    fontSize: 13, color: '#1a1a2e', 
                    cursor: 'pointer', 
                    borderBottom: '1px solid #f0f0f0' 
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f8f8ff')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'white')}
                >Profile</div>
                <div
                  onClick={() => { 
                    navigate('/');
                     setDropDown(false) 
                    }}
                  style={{ 
                    padding: '10px 16px', 
                    fontSize: 13, 
                    color: '#1a1a2e', 
                    cursor: 'pointer', 
                    borderBottom: '1px solid #f0f0f0' 
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f8f8ff')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'white')}
                >Settings</div>
                <div
                  onClick={() => { 
                    signOut(); 
                    setDropDown(false) 
                  }}
                  style={{ 
                    padding: '10px 16px', 
                    fontSize: 13, 
                    color: '#e05c5c', 
                    cursor: 'pointer' 
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#fff0f0')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'white')}
                >Log out</div>
              </>
            )}
              </div>
          </div>
        )}
      </div>
    </nav>
  )
}