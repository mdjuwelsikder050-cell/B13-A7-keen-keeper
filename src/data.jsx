/* eslint-disable react-refresh/only-export-components */
// import { createContext, useContext, useEffect, useState } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
const Ctx = createContext()
export const useData = () => useContext(Ctx)
const seed = [
  { id: 's1', type: 'Call', title: 'Call with Priya Nair', date: '2026-10-02' },
  { id: 's2', type: 'Text', title: 'Text with Emma Johansson', date: '2026-10-04' },
  { id: 's3', type: 'Video', title: 'Video with Mia Chen', date: '2026-09-28' },
  { id: 's4', type: 'Text', title: 'Text with Daniel Okafor', date: '2026-09-25' },
]
export function DataProvider({ children }) {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeline, setTimeline] = useState(seed)
  useEffect(() => {
    // small delay so the loading animation is visible
    fetch('/friends.json').then(r => r.json())
      .then(d => setTimeout(() => { setFriends(d); setLoading(false) }, 900))
      .catch(() => setLoading(false))
  }, [])
  const addEntry = (type, friend) =>
    setTimeline(t => [{ id: String(Date.now()), type, title: `${type} with ${friend.name}`, date: new Date().toISOString().slice(0, 10) }, ...t])
  return <Ctx.Provider value={{ friends, loading, timeline, addEntry }}>{children}</Ctx.Provider>
}
