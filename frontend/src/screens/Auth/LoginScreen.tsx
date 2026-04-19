import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../utils/api'
import { hashPassword, normalizeEmailInput, validateEmail } from '../../utils/helpers'
import './Auth.css'

const LoginScreen: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email || !password) {
      setError('Proszę wypełnić wszystkie pola')
      return
    }

    if (!validateEmail(email)) {
      setError('Proszę podać prawidłowy adres email')
      return
    }

    setLoading(true)
    try {
      const hashedPassword = await hashPassword(password)
      const response = await login(email, hashedPassword)
      if (response.success) {
        setSuccess('Zalogowano pomyślnie!')
        setTimeout(() => navigate('/home'), 600)
      } else {
        setError(response.message || 'Logowanie nie powiodło się')
      }
    } catch (err) {
      setError('Błąd połączenia')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container" data-e2e="LoginScreen-root-container">
      <div className="auth-box" data-e2e="LoginScreen-box-container">
        <h1>🔧 AutoRepair</h1>
        <h2>Logowanie do systemu</h2>

        {error && <div className="alert alert-error" data-e2e="LoginScreen-error-alert">{error}</div>}
        {success && <div className="alert alert-success" data-e2e="LoginScreen-success-alert">{success}</div>}

        <form onSubmit={handleLogin} data-e2e="LoginScreen-login-form">
          <div className="form-group">
            <label htmlFor="email">Adres email:</label>
            <input
              id="email"
              data-e2e="LoginScreen-email-input"
              type="text"
              inputMode="email"
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(normalizeEmailInput(e.target.value))}
              placeholder="Wpisz swój email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Hasło:</label>
            <input
              id="password"
              data-e2e="LoginScreen-password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Wpisz swoje hasło"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            data-e2e="LoginScreen-login-submit-button"
          >
            {loading ? 'Logowanie w toku...' : 'Zaloguj się'}
          </button>
        </form>

        <div className="auth-links">
          <button
            type="button"
            onClick={() => navigate('/reset-password')}
            className="link-button"
            data-e2e="LoginScreen-reset-password-button"
          >
            Zapomniałem hasła
          </button>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="link-button"
            data-e2e="LoginScreen-register-button"
          >
            Rejestracja nowego konta
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
