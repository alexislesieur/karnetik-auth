import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Wordmark } from '../components/Logo'
import { Field, Button, Kicker, Icons, PasswordStrength } from '../components/UI'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    try {
      await register(form)
      navigate(`/verify-email?email=${encodeURIComponent(form.email)}`)
    } catch (err) {
      setErrors(err.data?.errors || { general: err.data?.message })
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

        <Kicker>Inscription · 1 minute</Kicker>
        <h1 style={{
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: -1.0,
          lineHeight: 1.05,
          margin: '0 0 12px',
        }}>
          Créez votre carnet.
        </h1>
        <p style={{
          fontSize: 14,
          color: 'var(--ink-soft)',
          lineHeight: 1.6,
          margin: '0 0 32px',
        }}>
          Un email et un mot de passe, c'est tout ce qu'il faut pour commencer.
        </p>

        <form onSubmit={handleSubmit}>
          <Field
            label="Adresse email"
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="alexis@karnetik.fr"
            icon={Icons.mail}
            error={errors.email?.[0]}
            autoComplete="email"
          />
          <Field
            label="Mot de passe"
            type="password"
            value={form.password}
            onChange={set('password')}
            placeholder="12 caractères minimum"
            icon={Icons.key}
            error={errors.password?.[0]}
            autoComplete="new-password"
          />

          <PasswordStrength password={form.password} />

          <Field
            label="Confirmer le mot de passe"
            type="password"
            value={form.password_confirmation}
            onChange={set('password_confirmation')}
            placeholder="••••••••••••"
            icon={Icons.key}
            autoComplete="new-password"
          />

          {errors.general && (
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              color: 'var(--danger)',
              letterSpacing: 0.6,
              textTransform: 'uppercase',
              marginBottom: 18,
            }}>
              ● {errors.general}
            </div>
          )}

          <Button type="submit" primary full disabled={loading}>
            {loading ? 'Création…' : 'Créer mon carnet →'}
          </Button>
        </form>

        <div style={{
          marginTop: 36,
          paddingTop: 24,
          borderTop: '1px solid var(--rule)',
          fontSize: 13,
          color: 'var(--ink-soft)',
        }}>
          Déjà inscrit ?{' '}
          <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 500 }}>
            Se connecter →
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