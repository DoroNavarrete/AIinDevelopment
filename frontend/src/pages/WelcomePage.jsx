import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function WelcomePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col">

      {/* Top navigation */}
      <nav className="flex items-center justify-between px-10 border-b border-hairline" style={{ height: '56px' }}>
        <span className="font-mono text-on-dark text-[14px] tracking-[6px] uppercase">
          AUTHENTICATION
        </span>
        <button
          onClick={handleLogout}
          className="font-mono text-[12px] tracking-[2px] uppercase text-muted hover:text-ink transition-colors duration-200"
        >
          SIGN OUT
        </button>
      </nav>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-muted text-[11px] tracking-[2px] uppercase mb-10">
          SESSION ACTIVE
        </p>

        <p className="font-display text-body-color text-[32px] tracking-[2px] uppercase leading-tight mb-1">
          WELCOME,
        </p>

        <h1 className="font-display text-ink text-[64px] tracking-[4px] uppercase leading-none">
          {user ? user.toUpperCase() : 'USER'}
        </h1>

        {/* Hairline accent */}
        <div className="h-px w-24 bg-hairline-strong mt-12" />
      </main>

      {/* Footer */}
      <footer className="px-10 py-8 border-t border-hairline">
        <p className="font-mono text-muted-soft text-[11px] tracking-[2px] uppercase">
          JWT AUTHENTICATION API
        </p>
      </footer>

    </div>
  )
}
