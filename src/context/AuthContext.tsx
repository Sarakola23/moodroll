import { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../utils/supabase'

interface AuthContextType {
  user: User | null
  username: string | null
  loading: boolean
  signUp: (username: string, password: string) => Promise<string | null>
  signIn: (username: string, password: string) => Promise<string | null>
  signOut: () => Promise<void>
  checkUsername: (username: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      if (data.session?.user) fetchUsername(data.session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchUsername(session.user.id)
      else setUsername(null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUsername = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', userId)
      .single()
    if (data) setUsername(data.username)
  }

  // check if username already exists
  const checkUsername = async (username: string): Promise<boolean> => {
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username.toLowerCase().trim())
      .single()

    return !!data // true = already taken
  }

  const signUp = async (username: string, password: string) => {
    const trimmed = username.toLowerCase().trim()

    // check username taken
    const taken = await checkUsername(trimmed)
    if (taken) return 'Username is already taken'

    // use username as fake email for Supabase auth
    const fakeEmail = `${trimmed}@moodroll.app`

    const { data, error } = await supabase.auth.signUp({
      email: fakeEmail,
      password,
    })

    if (error) return error.message
    if (!data.user) return 'Something went wrong'

    // create profile with username
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({ id: data.user.id, username: trimmed })

    if (profileError) return profileError.message

    return null
  }

  const signIn = async (username: string, password: string) => {
    const trimmed = username.toLowerCase().trim()
    const fakeEmail = `${trimmed}@moodroll.app`

    const { error } = await supabase.auth.signInWithPassword({
      email: fakeEmail,
      password,
    })

    if (error) return 'Invalid username or password'
    return null
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUsername(null)
  }

  return (
    <AuthContext.Provider value={{ user, username, loading, signUp, signIn, signOut, checkUsername }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}