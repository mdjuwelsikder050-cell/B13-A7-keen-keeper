import { NavLink, Link } from 'react-router-dom'
import { Home, Clock, ChartLine } from 'lucide-react'
export const statusStyle = {
  overdue: 'bg-red-100 text-red-700',
  'almost due': 'bg-amber-100 text-amber-700',
  'on-track': 'bg-emerald-100 text-emerald-700',
}
export const typeIcon = Object.fromEntries(['Call', 'Text', 'Video'].map(t => [t, ({ size = 20 }) => <img src={`/img/${t.toLowerCase()}.png`} width={size} height={size} alt={t} />]))
export const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyle[status]}`}>{status}</span>
)
const links = [['/', 'Home', Home], ['/timeline', 'Timeline', Clock], ['/stats', 'Stats', ChartLine]]
export function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2">
        <Link to="/"><img src="/img/logo.png" alt="KeenKeeper" className="h-7" /></Link>
        <ul className="flex gap-1 sm:gap-2">
          {links.map(([to, label, Icon]) => (
            <li key={to}>
              <NavLink to={to} end className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-brand text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                <Icon size={16} /><span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
export function Footer() {
  return (
    <footer className="bg-brand text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <img src="/img/logo-xl.png" alt="KeenKeeper" className="h-12 mx-auto" />
        <p className="mt-3 text-emerald-100 max-w-md mx-auto">Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter.</p>
        <p className="mt-6 font-medium">Social Links</p>
        <div className="mt-3 flex justify-center gap-3">
          {['instagram', 'facebook', 'twitter'].map(s => <a key={s} href="#" aria-label={s}><img src={`/img/${s}.png`} alt={s} className="h-10 w-10 rounded-full bg-white" /></a>)}
        </div>
        <div className="mt-8 pt-6 border-t border-white/20 flex flex-col sm:flex-row justify-between gap-3 text-sm text-emerald-100">
          <span>© 2026 KeenKeeper. All rights reserved.</span>
          <span className="flex gap-4 justify-center"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Cookies</a></span>
        </div>
      </div>
    </footer>
  )
}
