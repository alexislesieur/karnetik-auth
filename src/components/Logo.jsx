export function Logo({ size = 28, color = '#3d8a6f' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <rect x="6" y="6" width="108" height="108" rx="8" fill="none" stroke={color} strokeWidth="6" />
      <g fill={color}>
        <rect x="32" y="30" width="11" height="60" />
        <path d="M43 60 L78 30 L88 30 L60 56 L88 90 L78 90 L52 64 L43 64 Z" />
      </g>
    </svg>
  )
}

export function Wordmark({ size = 22 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Logo size={size + 6} />
      <span style={{
        fontFamily: "var(--sans)",
        fontWeight: 800,
        fontSize: size,
        letterSpacing: -0.7,
        color: 'var(--ink)',
      }}>
        Karnetik
      </span>
    </div>
  )
}