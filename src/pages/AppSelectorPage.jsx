import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { Wordmark } from '../components/Logo'

const appList = [
  { id: 'web', label: 'Mon carnet', desc: 'Votre carnet entretien.', url: null, roles: ['user','pro','admin','super_admin'], soon: true },
  { id: 'beta', label: 'Beta', desc: 'Version beta de Karnetik.', url: 'https://beta.karnetik.com', roles: ['admin','super_admin'], soon: false },
  { id: 'admin', label: 'Administration', desc: 'Tableau de bord Karnetik.', url: 'https://admin.karnetik.com', roles: ['admin','super_admin'], soon: false },
]

export default function AppSelectorPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('karnetik_token')
    if (!token) { navigate('/login'); return }
    api.me()
      .then((d) => setUser(d.user))
      .catch(() => { localStorage.removeItem('karnetik_token'); navigate('/login') })
      .finally(() => setLoading(false))
  }, [navigate])

  if (loading || !user) {
    return (<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><Wordmark/></div>)
  }

  const available = appList.filter((a) => a.roles.includes(user.role))
  const greeting = user.first_name ? 'Bonjour, ' + user.first_name + '.' : 'Bonjour.'

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{width:'100%',maxWidth:480}}>
        <div style={{marginBottom:48}}><Wordmark/></div>
        <div style={{fontFamily:'var(--mono)',fontSize:11,letterSpacing:1.4,textTransform:'uppercase',color:'var(--accent)',marginBottom:18,display:'flex',alignItems:'center',gap:10}}>
          <span style={{width:6,height:6,borderRadius:'50%',background:'var(--accent)'}}/>
          Bienvenue
        </div>
        <h1 style={{fontSize:36,fontWeight:700,letterSpacing:-1,lineHeight:1.05,margin:'0 0 12px'}}>{greeting}</h1>
        <p style={{fontSize:14,color:'var(--ink-soft)',lineHeight:1.6,margin:'0 0 36px'}}>Choisissez votre espace.</p>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {available.map((item) => <AppCard key={item.id} item={item}/>)}
        </div>
        <div style={{marginTop:36,paddingTop:24,borderTop:'1px solid var(--rule)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:1,color:'var(--ink-mute)',textTransform:'uppercase'}}>{user.email}</span>
          <button onClick={() => {localStorage.removeItem('karnetik_token');navigate('/login')}} style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:1,textTransform:'uppercase',padding:'8px 14px',borderRadius:4,border:'1px solid var(--rule)',background:'none',color:'var(--ink-mute)',cursor:'pointer'}}>Deconnexion</button>
        </div>
      </div>
    </div>
  )
}

function AppCard({item}) {
  const [h, setH] = useState(false)
  const disabled = item.soon
  const Tag = disabled ? 'div' : 'a'
  const linkProps = disabled ? {} : { href: item.url }
  return (
    <Tag {...linkProps} onMouseEnter={() => !disabled && setH(true)} onMouseLeave={() => setH(false)} style={{display:'flex',alignItems:'center',gap:20,background:'var(--panel)',border:'1px solid '+(h?'var(--accent)':'var(--rule)'),borderRadius:6,padding:24,textDecoration:'none',color: disabled ? 'var(--ink-mute)' : 'var(--ink)',transition:'border 120ms',cursor: disabled ? 'default' : 'pointer',opacity: disabled ? 0.5 : 1}}>
      <div style={{width:48,height:48,border:'1px solid var(--rule)',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',color: disabled ? 'var(--ink-mute)' : 'var(--accent)',flexShrink:0}}>
        {item.id === 'web' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>}
        {item.id === 'beta' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>}
        {item.id === 'admin' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 20V8M10 20V4M16 20V12M22 20V14M2 20h22"/></svg>}
      </div>
      <div style={{flex:1}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={{fontSize:16,fontWeight:600,letterSpacing:-0.3}}>{item.label}</span>
          {disabled && <span style={{fontFamily:'var(--mono)',fontSize:8,letterSpacing:1,textTransform:'uppercase',background:'var(--rule)',padding:'3px 8px',borderRadius:3,color:'var(--ink-mute)'}}>Bientot</span>}
        </div>
        <div style={{fontSize:13,color:'var(--ink-soft)',lineHeight:1.4,marginTop:4}}>{item.desc}</div>
      </div>
      {!disabled && <span style={{color:'var(--accent)',fontSize:18}}>{'\u2192'}</span>}
    </Tag>
  )
}
