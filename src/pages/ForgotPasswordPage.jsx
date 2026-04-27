import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { Wordmark } from '../components/Logo'
import { Field, Button, Kicker, Icons } from '../components/UI'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await api.forgotPassword({ email })
      setSent(true)
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
          <Wordmark />
          <Link to="/login" style={{
            fontFamily: 'var(--mono)',
            fontSize: 10,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: 'var(--accent)',
          }}>
            ← Retour à la connexion
          </Link>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 64,
          height: 64,
          border: '1px solid var(--accent)',
          borderRadius: 8,
          color: 'var(--accent)',
          marginBottom: 24,
        }}>
          {Icons.key}
        </div>

        <Kicker>Récupération</Kicker>
        <h1 style={{
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: -1.0,
          lineHeight: 1.05,
          margin: '0 0 14px',
        }}>
          Mot de passe oublié ?
        </h1>
        <p style={{
          fontSize: 14,
          color: 'var(--ink-soft)',
          lineHeight: 1.6,
          margin: '0 0 32px',
        }}>
          Pas d'inquiétude. Saisissez votre email, on vous envoie un lien pour le réinitialiser.
        </p>

        {sent ? (
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
              ● Envoyé
            </div>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              Si un compte existe pour <strong style={{ color: 'var(--ink)' }}>{email}</strong>, vous recevrez un lien de réinitialisation dans quelques instants.
            </p>
          </div>
        ) : (
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
              {loading ? 'Envoi…' : 'Envoyer le lien →'}
            </Button>
          </form>
        )}

        <div style={{
          marginTop: 32,
          paddingTop: 24,
          borderTop: '1px solid var(--rule)',
          fontFamily: 'var(--mono)',
          fontSize: 10,
          letterSpacing: 1,
          color: 'var(--ink-mute)',
          textTransform: 'uppercase',
        }}>
          ● Le lien expire dans 30 minutes après envoi.
        </div>
      </div>
    </div>
  )
}