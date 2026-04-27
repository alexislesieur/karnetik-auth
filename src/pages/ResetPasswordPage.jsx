import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../lib/api'
import { Wordmark } from '../components/Logo'
import { Field, Button, Kicker, Icons } from '../components/UI'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await api.resetPassword({
        token: searchParams.get('token'),
        email: searchParams.get('email'),
        password,
        password_confirmation: passwordConfirmation,
      })
      setSuccess(true)
    } catch (err) {
      setError(err.data?.message || 'Une erreur est survenue.')
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

        <Kicker>Réinitialisation</Kicker>
        <h1 style={{
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: -1.0,
          lineHeight: 1.05,
          margin: '0 0 14px',
        }}>
          Nouveau mot de passe.
        </h1>
        <p style={{
          fontSize: 14,
          color: 'var(--ink-soft)',
          lineHeight: 1.6,
          margin: '0 0 32px',
        }}>
          Choisissez un nouveau mot de passe pour votre compte.
        </p>

        {success ? (
          <div style={{
            background: 'var(--panel)',
            border: '1px solid var(--accent)',
            borderRadius: 6,
            padding: 24,
          }}>
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: 1,
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: 10,
            }}>
              ● Mot de passe modifié
            </div>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 20 }}>
              Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
            </p>
            <Link to="/login">
              <Button primary full>Se connecter →</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Field
              label="Nouveau mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="12 caractères minimum"
              icon={Icons.key}
              autoComplete="new-password"
            />
            <Field
              label="Confirmer le mot de passe"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="••••••••••••"
              icon={Icons.key}
              autoComplete="new-password"
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

            <Button type="submit" primary full disabled={loading}>
              {loading ? 'Enregistrement…' : 'Enregistrer →'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}