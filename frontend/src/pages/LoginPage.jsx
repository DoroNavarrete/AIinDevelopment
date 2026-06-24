import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      navigate('/welcome')
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-xs">

        {/* Wordmark */}
        <p className="font-mono text-muted text-[11px] tracking-[6px] uppercase text-center mb-16">
          AUTHENTICATION
        </p>

        {/* Heading */}
        <h1 className="font-display text-ink text-[32px] tracking-[2px] uppercase leading-tight text-center mb-2">
          ACCESS PORTAL
        </h1>

        {/* Hairline divider */}
        <div className="h-px bg-hairline mb-12" />

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block font-mono text-muted text-[11px] tracking-[2px] uppercase mb-3"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="
                w-full bg-transparent text-ink font-body text-base
                border-0 border-b border-hairline-strong
                focus:border-ink focus:outline-none
                py-3 transition-colors duration-200
              "
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block font-mono text-muted text-[11px] tracking-[2px] uppercase mb-3"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="
                w-full bg-transparent text-ink font-body text-base
                border-0 border-b border-hairline-strong
                focus:border-ink focus:outline-none
                py-3 transition-colors duration-200
              "
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="font-mono text-warning text-[11px] tracking-[2px] uppercase -mt-4">
              {error}
            </p>
          )}

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="
                w-full font-mono text-[14px] tracking-[2.5px] uppercase
                text-ink border border-hairline-strong rounded-full
                py-3.5 px-8
                hover:border-ink transition-colors duration-200
                disabled:opacity-40 disabled:cursor-not-allowed
              "
            >
              {loading ? 'AUTHENTICATING...' : 'ENTER'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
