import { Routes, Route } from 'react-router-dom'
import { Navbar, Footer } from './components'
import { Home, Details, Timeline, Stats, NotFound } from './pages'
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friend/:id" element={<Details />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
