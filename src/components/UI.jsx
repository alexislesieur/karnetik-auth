import { useState } from 'react'

export function Label({ children }) {
  return (
    <div style={{
      fontFamily: 'var(--mono)',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: 'var(--ink-mute)',
      marginBottom: 8,
    }}>
      {children}
    </div>
  )
}

export function Field({ label, type = 'text', value, onChange, placeholder, icon, error, autoComplete }) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && visible ? 'text' : type

  return (
    <div style={{ marginBottom: 18 }}>
      <Label>{label}</Label>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: 'var(--surface)',
        border: `1px solid ${error ? 'var(--danger)' : 'var(--rule)'}`,
        borderRadius: 4,
        padding: '14px 14px',
        fontFamily: 'var(--sans)',
        fontSize: 14,
        color: 'var(--ink)',
        transition: 'border 120ms',
      }}>
        {icon && <span style={{ color: 'var(--ink-mute)', display: 'flex' }}>{icon}</span>}
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'var(--ink)',
            fontFamily: 'var(--sans)',
            fontSize: 14,
          }}
        />
        {isPassword && value && (
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--ink-mute)',
              display: 'flex',
              padding: 0,
              alignItems: 'center',
              gap: 6,
            }}
          >
            {visible ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                <path d="M14.12 14.12a3 3 0 11-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <div style={{
          fontFamily: 'var(--mono)',
          fontSize: 10,
          color: 'var(--danger)',
          letterSpacing: 0.6,
          marginTop: 6,
          textTransform: 'uppercase',
        }}>
          ● {error}
        </div>
      )}
    </div>
  )
}

export function PasswordStrength({ password }) {
  if (!password) return null

  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++

  const colors = ['var(--danger)', '#e8a84a', 'var(--ok)']
  const labels = ['Faible', 'Correct', 'Solide']
  const color = colors[score - 1] || 'var(--danger)'
  const label = labels[score - 1] || 'Trop court'

  return (
    <div style={{ marginTop: -8, marginBottom: 18 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            flex: 1,
            height: 3,
            borderRadius: 2,
            background: i < score ? color : 'var(--rule)',
            transition: 'background 200ms',
          }} />
        ))}
      </div>
      <span style={{
        fontFamily: 'var(--mono)',
        fontSize: 9,
        letterSpacing: 1,
        textTransform: 'uppercase',
        color,
      }}>
        {label}
      </span>
    </div>
  )
}

export function Button({ children, primary, full, disabled, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: 'var(--mono)',
        fontSize: 11,
        letterSpacing: 1,
        textTransform: 'uppercase',
        padding: '14px 20px',
        borderRadius: 4,
        border: `1px solid ${primary ? 'var(--accent)' : 'var(--rule)'}`,
        background: primary ? 'var(--accent)' : 'transparent',
        color: primary ? '#fff' : 'var(--ink)',
        width: full ? '100%' : 'auto',
        textAlign: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        transition: 'opacity 120ms',
      }}
    >
      {children}
    </button>
  )
}

export function Divider({ children }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      margin: '24px 0',
      color: 'var(--ink-mute)',
      fontFamily: 'var(--mono)',
      fontSize: 9,
      letterSpacing: 1.4,
      textTransform: 'uppercase',
    }}>
      <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
      {children}
      <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
    </div>
  )
}

export function Kicker({ children }) {
  return (
    <div style={{
      fontFamily: 'var(--mono)',
      fontSize: 11,
      letterSpacing: 1.4,
      textTransform: 'uppercase',
      color: 'var(--accent)',
      marginBottom: 18,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
      {children}
    </div>
  )
}

export const Icons = {
  mail: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 7l9 7 9-7" />
    </svg>
  ),
  key: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="12" r="4" />
      <path d="M13 12h8M17 12v3M21 12v2" />
    </svg>
  ),
  user: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="9" r="3.5" />
      <path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5" />
    </svg>
  ),
}