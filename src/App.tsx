import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from '././pages/Home'
import Favorites from '././pages/Favorites'
import Auth from './pages/Auth'
import Surprise from './pages/Surprise'
import Watched from './pages/Watched'

export default function App() {
  return (
    <BrowserRouter basename="/moodroll">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/surprise" element={<Surprise/>}/>
        <Route path="/watched" element={<Watched/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}