import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerProfile } from '../../utils/api'
import { hashPassword, normalizeEmailInput, validateEmail, validatePasswordStrength } from '../../utils/helpers'
import './Auth.css'

const RegisterScreen: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [imie, setImie] = useState('')
  const [nazwisko, setNazwisko] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const getPasswordStrength = (value: string): { level: 'weak' | 'medium' | 'strong'; label: string } => {
    let score = 0

    if (value.length >= 8) score += 1
    if (/[A-Z]/.test(value)) score += 1
    if (/[a-z]/.test(value)) score += 1
    if (/[0-9]/.test(value)) score += 1
    if (/[^A-Za-z0-9]/.test(value)) score += 1

    if (score >= 4) return { level: 'strong', label: 'Silne' }
    if (score >= 2) return { level: 'medium', label: 'Średnie' }
    return { level: 'weak', label: 'Słabe' }
  }

  const getPasswordRequirements = (value: string) => ({
    length: value.length >= 8,
    uppercase: /[A-Z]/.test(value),
    number: /[0-9]/.test(value),
    special: /[^A-Za-z0-9]/.test(value)
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const mail = email.trim()
    const first = imie.trim()
    const last = nazwisko.trim()

    if (!mail || !first || !last || !password || !confirmPassword) {
      setError('Wszystkie pola są wymagane')
      return
    }

    if (!validateEmail(mail)) {
      setError('Proszę podać prawidłowy adres email')
      return
    }

    const passwordValidation = validatePasswordStrength(password)
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message)
      return
    }

    if (password !== confirmPassword) {
      setError('Hasła nie są zgodne')
      return
    }

    setLoading(true)
    try {
      const hashedPassword = await hashPassword(password)
      const resp = await registerProfile({ imie: first, nazwisko: last, mail, haslo: hashedPassword })
      if (resp.success) {
        setSuccess('Rejestracja pomyślna! Możesz się teraz zalogować.')
        setTimeout(() => navigate('/login'), 900)
      } else {
        setError(resp.message || 'Rejestracja nie powiodła się')
      }
    } catch (err) {
      setError('Błąd połączenia')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container" data-e2e="RegisterScreen-root-container">
      <div className="auth-box" data-e2e="RegisterScreen-box-container">
        <h1>🔧 AutoRepair</h1>
        <h2>Rejestracja nowego konta</h2>

        {error && <div className="alert alert-error" data-e2e="RegisterScreen-error-alert">{error}</div>}
        {success && <div className="alert alert-success" data-e2e="RegisterScreen-success-alert">{success}</div>}

        <form onSubmit={handleRegister} data-e2e="RegisterScreen-register-form">
          <div className="form-group">
            <label htmlFor="email">Adres email:</label>
            <input
              id="email"
              data-e2e="RegisterScreen-email-input"
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
            <label htmlFor="imie">Imię:</label>
            <input
              id="imie"
              data-e2e="RegisterScreen-first-name-input"
              type="text"
              value={imie}
              onChange={(e) => setImie(e.target.value)}
              placeholder="Wpisz swoje imię"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="nazwisko">Nazwisko:</label>
            <input
              id="nazwisko"
              data-e2e="RegisterScreen-last-name-input"
              type="text"
              value={nazwisko}
              onChange={(e) => setNazwisko(e.target.value)}
              placeholder="Wpisz swoje nazwisko"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Hasło:</label>
            <input
              id="password"
              data-e2e="RegisterScreen-password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Wpisz hasło"
              disabled={loading}
            />
            {password && (
              <div
                className={`password-strength password-strength--${getPasswordStrength(password).level}`}
                data-e2e="RegisterScreen-password-strength-text"
              >
                Siła hasła: <span>{getPasswordStrength(password).label}</span>
              </div>
            )}
            {password && (
              <div className="password-requirements" data-e2e="RegisterScreen-password-requirements-container">
                <div
                  className={getPasswordRequirements(password).length ? 'req req--ok' : 'req req--bad'}
                  data-e2e="RegisterScreen-password-requirement-length"
                >
                  • Minimum 8 znaków
                </div>
                <div
                  className={getPasswordRequirements(password).uppercase ? 'req req--ok' : 'req req--bad'}
                  data-e2e="RegisterScreen-password-requirement-uppercase"
                >
                  • Wielka litera
                </div>
                <div
                  className={getPasswordRequirements(password).number ? 'req req--ok' : 'req req--bad'}
                  data-e2e="RegisterScreen-password-requirement-number"
                >
                  • Cyfra
                </div>
                <div
                  className={getPasswordRequirements(password).special ? 'req req--ok' : 'req req--bad'}
                  data-e2e="RegisterScreen-password-requirement-special"
                >
                  • Znak specjalny
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Powtórz hasło:</label>
            <input
              id="confirmPassword"
              data-e2e="RegisterScreen-confirm-password-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Powtórz hasło"
              disabled={loading}
            />
            {confirmPassword && (
              <div
                className={`password-match ${password === confirmPassword ? 'password-match--ok' : 'password-match--bad'}`}
                data-e2e="RegisterScreen-password-match-text"
              >
                {password === confirmPassword ? 'Hasła są zgodne' : 'Hasła są różne'}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            data-e2e="RegisterScreen-register-submit-button"
          >
            {loading ? 'Rejestracja w toku...' : 'Zarejestruj się'}
          </button>
        </form>

        <div className="auth-links">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="link-button"
            data-e2e="RegisterScreen-login-button"
          >
            Masz już konto? Zaloguj się
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen
