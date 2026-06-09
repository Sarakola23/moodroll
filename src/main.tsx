import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FavoritesProvider } from './context/FavoritesContext'
import { AuthProvider } from './context/AuthContext'
import { WatchedProvider } from './context/WatchedContext'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <FavoritesProvider>
        <WatchedProvider>
          <App />
        </WatchedProvider>
      </FavoritesProvider>
    </AuthProvider>
  </StrictMode>
)