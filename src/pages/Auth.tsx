import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Auth() {
  const { signIn, signUp, checkUsername } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isSignUp, setIsSignUp] = useState(() => searchParams.get('mode') === 'signup')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'taken' | 'available'>('idle')

  // live username check when signing up
  useEffect(() => {
    if (!isSignUp || username.length < 3) {
      setUsernameStatus('idle')
      return
    }
    setUsernameStatus('checking')
    const timer = setTimeout(async () => {
      const taken = await checkUsername(username)
      setUsernameStatus(taken ? 'taken' : 'available')
    }, 500)
    return () => clearTimeout(timer)
  }, [username, isSignUp])

  const handleSubmit = async () => {
    if (username.length < 3) return setError('Username must be at least 3 characters')
    if (password.length < 6) return setError('Password must be at least 6 characters')
    setLoading(true)
    setError(null)
    const err = isSignUp
      ? await signUp(username, password)
      : await signIn(username, password)
    setLoading(false)
    if (err) return setError(err)
    navigate('/')
  }

  const usernameColor = () => {
    if (usernameStatus === 'taken') return '#e05c5c'
    if (usernameStatus === 'available') return '#22c55e'
    return '#e0e0e0'
  }

  useEffect(() => {
    setIsSignUp(searchParams.get('mode') === 'signup')
  }, [searchParams])

  const usernameHint = () => {
    if (usernameStatus === 'checking') return '⏳ Checking...'
    if (usernameStatus === 'taken') return '✗ Username already taken'
    if (usernameStatus === 'available') return '✓ Username available'
    return ''
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f8ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: 16,
        padding: 32,
        width: '100%',
        maxWidth: 400,
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: '#1a1a2e', marginBottom: 4 }}>
          {isSignUp ? 'Create account' : 'Welcome back'}
        </h2>
        <p style={{ fontSize: 14, color: '#aaa', marginBottom: 24 }}>
          {isSignUp ? 'Pick a username to get started' : 'Sign in with your username'}
        </p>

        {error && (
          <p style={{ fontSize: 13, color: 'red', marginBottom: 16 }}>{error}</p>
        )}

        {/* username input */}
        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: `1px solid ${usernameColor()}`,
              fontSize: 14,
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
          {isSignUp && usernameHint() && (
            <p style={{
              fontSize: 11,
              marginTop: 4,
              color: usernameStatus === 'available' ? '#22c55e' : usernameStatus === 'taken' ? '#e05c5c' : '#aaa'
            }}>
              {usernameHint()}
            </p>
          )}
        </div>

        {/* password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #e0e0e0',
            fontSize: 14,
            marginBottom: 20,
            boxSizing: 'border-box',
            outline: 'none',
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading || (isSignUp && usernameStatus === 'taken')}
          style={{
            width: '100%',
            padding: '11px',
            borderRadius: 8,
            border: 'none',
            background: 'linear-gradient(90deg, #7c3aed, #ec8e6e)',
            color: 'white',
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading || usernameStatus === 'taken' ? 0.7 : 1,
          }}
        >
          {loading ? 'Loading...' : isSignUp ? 'Sign up' : 'Sign in'}
        </button>

        <p style={{ fontSize: 13, color: '#aaa', textAlign: 'center', marginTop: 16 }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <span
            onClick={() => {
              const nextMode = !isSignUp
              setIsSignUp(nextMode)
              setError(null)
              setUsernameStatus('idle')
              navigate(nextMode ? '/auth?mode=signup' : '/auth', { replace: true })
            }}
            style={{ color: '#7c3aed', cursor: 'pointer', marginLeft: 4 }}
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </span>
        </p>
      </div>
    </div>
  )
}