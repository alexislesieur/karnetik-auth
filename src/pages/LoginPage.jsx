import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Wordmark } from '../components/Logo'
import { Field, Button, Divider, Kicker, Icons } from '../components/UI'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await login(email, password)
      // Redirection vers l'app web après connexion
      window.location.href = import.meta.env.VITE_APP_URL || '/login-success'
    } catch (err) {
      if (err.data?.email_unverified) {
        navigate(`/verify-email?email=${encodeURIComponent(email)}`)
        return
      }
      setError(err.data?.message || err.data?.errors?.email?.[0] || 'Erreur de connexion.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ marginBottom: 48 }}>
          <Wordmark />
        </div>

        <Kicker>Connexion · v1.0</Kicker>
        <h1 style={{
          fontSize: 48,
          fontWeight: 700,
          letterSpacing: -1.4,
          lineHeight: 1.05,
          margin: '0 0 12px',
        }}>
          Bon retour.
        </h1>
        <p style={{
          fontSize: 14,
          color: 'var(--ink-soft)',
          lineHeight: 1.6,
          margin: '0 0 36px',
        }}>
          Accédez à votre carnet d'entretien et retrouvez vos véhicules.
        </p>

        <form onSubmit={handleSubmit}>
          <Field
            label="Adresse email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alexis@karnetik.fr"
            icon={Icons.mail}
            autoComplete="email"
          />
          <Field
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            icon={Icons.key}
            autoComplete="current-password"
          />

          {error && (
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              color: 'var(--danger)',
              letterSpacing: 0.6,
              textTransform: 'uppercase',
              marginBottom: 18,
            }}>
              ● {error}
            </div>
          )}

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: 28,
          }}>
            <Link to="/forgot-password" style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              letterSpacing: 1,
              textTransform: 'uppercase',
              color: 'var(--accent)',
            }}>
              Mot de passe oublié ?
            </Link>
          </div>

          <Button type="submit" primary full disabled={loading}>
            {loading ? 'Connexion…' : 'Se connecter →'}
          </Button>
        </form>

        <div style={{
          marginTop: 36,
          paddingTop: 24,
          borderTop: '1px solid var(--rule)',
          fontSize: 13,
          color: 'var(--ink-soft)',
        }}>
          Pas encore de compte ?{' '}
          <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 500 }}>
            Créer un carnet →
          </Link>
        </div>

        <div style={{
          marginTop: 36,
          fontFamily: 'var(--mono)',
          fontSize: 9,
          letterSpacing: 1,
          color: 'var(--ink-mute)',
          textTransform: 'uppercase',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <span>● 2026 Karnetik</span>
          <span>CGU · Confidentialité</span>
        </div>
      </div>
    </div>
  )
}