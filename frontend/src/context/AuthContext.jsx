import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { loginApi, refreshApi } from '../api/auth'

const AuthContext = createContext(null)

const KEYS = {
  AT: 'jwt_access',
  RT: 'jwt_refresh',
  EXP: 'jwt_expires',
  USER: 'jwt_user',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const timerRef = useRef(null)

  // ── Internals ──────────────────────────────────────────────────────────────

  function clearSession() {
    setUser(null)
    setAccessToken(null)
    Object.values(KEYS).forEach((k) => sessionStorage.removeItem(k))
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  function scheduleRefresh(delayMs, refreshToken, username) {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      try {
        const data = await refreshApi(refreshToken)
        storeSession(data, username)
      } catch {
        clearSession()
      }
    }, Math.max(0, delayMs))
  }

  function storeSession(data, username) {
    const expiresAt = Date.now() + data.expires_in * 1000
    setUser(username)
    setAccessToken(data.access_token)
    sessionStorage.setItem(KEYS.AT, data.access_token)
    sessionStorage.setItem(KEYS.RT, data.refresh_token)
    sessionStorage.setItem(KEYS.EXP, String(expiresAt))
    sessionStorage.setItem(KEYS.USER, username)
    // Refresh 30 s before expiry
    scheduleRefresh(data.expires_in * 1000 - 30_000, data.refresh_token, username)
  }

  // ── Restore session on mount ───────────────────────────────────────────────

  useEffect(() => {
    const at = sessionStorage.getItem(KEYS.AT)
    const rt = sessionStorage.getItem(KEYS.RT)
    const usr = sessionStorage.getItem(KEYS.USER)
    const exp = Number(sessionStorage.getItem(KEYS.EXP) || 0)

    if (!at || !usr) return

    const remaining = exp - Date.now()

    if (remaining <= 0) {
      // Access token already expired — try a silent refresh
      if (rt) {
        refreshApi(rt)
          .then((data) => storeSession(data, usr))
          .catch(() => clearSession())
      }
      return
    }

    setUser(usr)
    setAccessToken(at)
    scheduleRefresh(remaining - 30_000, rt, usr)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Public API ─────────────────────────────────────────────────────────────

  async function login(username, password) {
    const data = await loginApi(username, password)
    storeSession(data, username)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(accessToken && user),
        accessToken,
        login,
        logout: clearSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
