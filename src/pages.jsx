import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Plus, BellRing, Archive, Trash2, Pencil } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useData } from './data'
import { StatusBadge, typeIcon } from './components'

const Spinner = () => <div className="flex justify-center py-20"><div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-brand animate-spin" /></div>

export function Home() {
  const { friends, loading, timeline } = useData()
  const count = s => friends.filter(f => f.status === s).length
  const month = new Date().toISOString().slice(0, 7)
  const cards = [
    [friends.length, 'Total Friends'], [count('on-track'), 'On Track'],
    [count('overdue') + count('almost due'), 'Need Attention'],
    [timeline.filter(t => t.date.startsWith(month)).length, 'Interactions This Month'],
  ]
  return (
    <div className="max-w-6xl mx-auto px-4">
      <section className="text-center py-14">
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900">Friends to keep close in your life</h1>
        <p className="mt-4 text-slate-500 max-w-xl mx-auto">Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.</p>
        <button className="mt-6 inline-flex items-center gap-2 bg-brand text-white px-5 py-3 rounded-md font-medium hover:opacity-90"><Plus size={18} />Add a Friend</button>
      </section>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(([n, l]) => (
          <div key={l} className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-4xl font-bold text-brand">{loading ? '–' : n}</div>
            <div className="text-slate-500 mt-1 text-sm">{l}</div>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-semibold mt-14 mb-5">Your Friends</h2>
      {loading ? <Spinner /> : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {friends.map(f => (
            <Link key={f.id} to={`/friend/${f.id}`} className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <img src={f.picture} alt={f.name} className="h-20 w-20 rounded-full object-cover" />
              <h3 className="mt-3 font-semibold text-lg">{f.name}</h3>
              <p className="text-xs text-slate-500">{f.days_since_contact}d ago</p>
              <div className="flex flex-wrap justify-center gap-1 mt-3">
                {f.tags.map(t => <span key={t} className="bg-emerald-50 text-emerald-800 text-xs px-2 py-0.5 rounded-full">{t}</span>)}
              </div>
              <div className="mt-3"><StatusBadge status={f.status} /></div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Details() {
  const { id } = useParams()
  const { friends, loading, addEntry } = useData()
  if (loading) return <Spinner />
  const f = friends.find(x => String(x.id) === id)
  if (!f) return <NotFound />
  const checkIn = type => { addEntry(type, f); toast.success(`${type} with ${f.name} logged to your timeline`) }
  const stats = [[f.days_since_contact, 'Days Since Contact'], [f.goal, 'Goal (Days)'], [f.next_due_date, 'Next Due']]
  const btn = 'w-full flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-md py-2.5 text-sm hover:bg-slate-50'
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-[360px_1fr] gap-6">
      <aside className="space-y-3">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <img src={f.picture} alt={f.name} className="h-24 w-24 rounded-full object-cover mx-auto" />
          <h1 className="mt-3 text-xl font-bold">{f.name}</h1>
          <div className="mt-2"><StatusBadge status={f.status} /></div>
          <div className="flex flex-wrap justify-center gap-1 mt-3">
            {f.tags.map(t => <span key={t} className="bg-emerald-50 text-emerald-800 text-xs px-2 py-0.5 rounded-full">{t}</span>)}
          </div>
          <p className="mt-4 text-slate-600 italic text-sm">"{f.bio}"</p>
          <p className="mt-2 text-sm text-slate-500">{f.email}</p>
        </div>
        <button className={btn}><BellRing size={16} />Snooze 2 Weeks</button>
        <button className={btn}><Archive size={16} />Archive</button>
        <button className={`${btn} text-red-600`}><Trash2 size={16} />Delete</button>
      </aside>
      <div className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {stats.map(([v, l]) => (
            <div key={l} className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-brand">{v}</div><div className="text-sm text-slate-500 mt-1">{l}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-start justify-between gap-4">
          <div><h2 className="font-semibold text-lg">Relationship Goal</h2>
            <p className="text-slate-500 mt-2">Connect every <b className="text-slate-900">{f.goal} days</b></p></div>
          <button className="flex items-center gap-1 border border-slate-200 rounded-md px-3 py-1.5 text-sm hover:bg-slate-50"><Pencil size={14} />Edit</button>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold text-lg">Quick Check-In</h2>
          <div className="grid sm:grid-cols-3 gap-3 mt-4">
            {Object.entries(typeIcon).map(([t, I]) => (
              <button key={t} onClick={() => checkIn(t)} className="flex flex-col items-center gap-2 bg-slate-50 hover:bg-emerald-50 rounded-lg py-6 font-medium"><I size={32} />{t}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Timeline() {
  const { timeline } = useData()
  const [filter, setFilter] = useState('All')
  const list = [...timeline].sort((a, b) => b.date.localeCompare(a.date)).filter(t => filter === 'All' || t.type === filter)
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Timeline</h1>
      <div className="flex gap-2 mt-5">
        {['All', 'Call', 'Text', 'Video'].map(o => (
          <button key={o} onClick={() => setFilter(o)} className={`px-4 py-1.5 rounded-full text-sm border ${filter === o ? 'bg-brand text-white border-brand' : 'bg-white border-slate-200'}`}>{o}</button>
        ))}
      </div>
      <ul className="mt-6 space-y-3">
        {list.length === 0 && <li className="text-slate-500">No {filter.toLowerCase()} interactions yet. Log one from a friend's page.</li>}
        {list.map(t => { const I = typeIcon[t.type]; return (
          <li key={t.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4">
            <span className="h-10 w-10 rounded-full bg-emerald-50 text-brand flex items-center justify-center shrink-0"><I size={18} /></span>
            <div><p className="font-medium">{t.title}</p><p className="text-sm text-slate-500">{t.date}</p></div>
          </li>) })}
      </ul>
    </div>
  )
}

export function Stats() {
  const { timeline } = useData()
  const colors = { Call: '#244d3f', Text: '#7c3aed', Video: '#37a163' }
  const data = Object.keys(colors).map(k => ({ name: k, value: timeline.filter(t => t.type === k).length })).filter(d => d.value)
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Friendship Analytics</h1>
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 className="font-semibold text-slate-600">By Interaction Type</h2>
        {data.length === 0 ? <p className="py-16 text-center text-slate-500">No interactions yet. Check in with a friend to see your chart.</p> : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={4}>
                {data.map(d => <Cell key={d.name} fill={colors[d.name]} />)}</Pie><Tooltip /><Legend /></PieChart>
            </ResponsiveContainer>
          </div>)}
      </div>
    </div>
  )
}

export function NotFound() {
  return (
    <div className="text-center py-24 px-4">
      <h1 className="text-7xl font-bold text-brand">404</h1>
      <p className="mt-3 text-slate-500">That page doesn't exist or the friend was removed.</p>
      <Link to="/" className="inline-block mt-6 bg-brand text-white px-5 py-2.5 rounded-md">Back to Home</Link>
    </div>
  )
}
