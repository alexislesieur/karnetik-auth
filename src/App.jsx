import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import { Wordmark } from './components/Logo'
import { Kicker } from './components/UI'
import './styles.css'

function LoginSuccess() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      textAlign: 'center',
    }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <Wordmark />
        </div>
        <Kicker>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)' }} />
            Connecté
          </span>
        </Kicker>
        <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1, lineHeight: 1.05 }}>
          Connexion réussie.
        </h1>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 12, lineHeight: 1.6 }}>
          L'app web n'est pas encore disponible. Ça arrive bientôt.
        </p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  )
}