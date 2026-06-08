import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    const err = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password)
    setLoading(false)
    if (err) return setError(err)
    navigate('/')
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
          {isSignUp ? 'Sign up to save your favorites' : 'Sign in to your account'}
        </p>

        {error && (
          <p style={{ fontSize: 13, color: 'red', marginBottom: 16 }}>{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #e0e0e0',
            fontSize: 14,
            marginBottom: 12,
            boxSizing: 'border-box',
            outline: 'none',
          }}
        />

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
          disabled={loading}
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
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Loading...' : isSignUp ? 'Sign up' : 'Sign in'}
        </button>

        <p style={{ fontSize: 13, color: '#aaa', textAlign: 'center', marginTop: 16 }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <span
            onClick={() => setIsSignUp(prev => !prev)}
            style={{ color: '#7c3aed', cursor: 'pointer', marginLeft: 4 }}
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </span>
        </p>
      </div>
    </div>
  )
}