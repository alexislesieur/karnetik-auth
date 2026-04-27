import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../lib/api'
import { Wordmark } from '../components/Logo'
import { Button, Kicker, Icons } from '../components/UI'

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || ''
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleResend = async () => {
    setLoading(true)
    try {
      await api.sendVerification()
      setSent(true)
    } catch (err) {
      // Silencieux — l'utilisateur n'a peut-être pas de token
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
      <div style={{ width: '100%', maxWidth: 420, textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <Wordmark />
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          border: '1px solid var(--accent)',
          borderRadius: '50%',
          color: 'var(--accent)',
          margin: '0 auto 24px',
          background: 'rgba(61, 138, 111, 0.06)',
        }}>
          {Icons.mail}
        </div>

        <Kicker style={{ justifyContent: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', width: '100%' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
            Vérification
          </span>
        </Kicker>

        <h1 style={{
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: -1.0,
          lineHeight: 1.05,
          margin: '0 0 14px',
        }}>
          Vérifiez votre email.
        </h1>
        <p style={{
          fontSize: 14,
          color: 'var(--ink-soft)',
          lineHeight: 1.6,
          margin: '0 0 12px',
        }}>
          Un email de vérification a été envoyé à
        </p>
        <p style={{
          fontSize: 16,
          fontWeight: 600,
          color: 'var(--ink)',
          marginBottom: 32,
        }}>
          {email}
        </p>

        <p style={{
          fontSize: 13,
          color: 'var(--ink-mute)',
          lineHeight: 1.6,
          marginBottom: 32,
        }}>
          Cliquez sur le lien dans l'email pour activer votre compte. Vérifiez vos spams si vous ne le trouvez pas.
        </p>

        {sent ? (
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: 'var(--accent)',
            padding: '14px 0',
          }}>
            ● Email renvoyé
          </div>
        ) : (
          <Button full onClick={handleResend} disabled={loading}>
            {loading ? 'Envoi…' : 'Renvoyer l\'email'}
          </Button>
        )}

        <div style={{
          marginTop: 36,
          paddingTop: 24,
          borderTop: '1px solid var(--rule)',
          fontSize: 13,
          color: 'var(--ink-soft)',
        }}>
          <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 500 }}>
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  )
}