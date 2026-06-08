import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from '././pages/Home'
import Favorites from '././pages/Favorites'
import Auth from './pages/Auth'

export default function App() {
  return (
    <BrowserRouter basename="/moodroll">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/auth" element={<Auth/>}/>
      </Routes>
    </BrowserRouter>
  )
}