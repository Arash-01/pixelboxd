import ActivityFeed from './components/ActivityFeed'

export default function Home() {
  return (
    <main style={{ background: '#0d0f14', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      {/* NAV */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 60, borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#0d0f14', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 700, color: '#e8ff47' }}>PIXELBOXD</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Games', 'Lists', 'Members', 'Journal'].map(l => (
            <a key={l} href="#" style={{ color: '#7a7f96', textDecoration: 'none', fontSize: 13, padding: '6px 12px', borderRadius: 6 }}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="/login" style={{ padding: '7px 16px', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, color: '#f0f0f0', textDecoration: 'none', fontSize: 13 }}>Sign in</a>
          <a href="/login" style={{ padding: '7px 16px', background: '#e8ff47', borderRadius: 6, color: '#000', textDecoration: 'none', fontSize: 13, fontWeight: 700, fontFamily: 'monospace' }}>Get started</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ padding: '64px 40px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'grid', gridTemplateColumns: '1fr 400px', gap: 64, alignItems: 'center', maxWidth: 1320, margin: '0 auto' }}>
        <div>
          <h1 style={{ fontFamily: 'monospace', fontSize: 42, fontWeight: 700, lineHeight: 1.18, letterSpacing: -1.5, color: '#e8ff47', marginBottom: 16 }}>
            Track games you've played.<br />Tell your friends what's good.
          </h1>
          <p style={{ color: '#7a7f96', fontSize: 16, lineHeight: 1.75, marginBottom: 28, maxWidth: 480 }}>
            The social platform for gamers. Log every session, rate every adventure, write reviews and share lists with people who get it.
          </p>
          <a href="/login" style={{ display: 'inline-block', padding: '10px 24px', background: '#e8ff47', color: '#000', fontWeight: 700, fontFamily: 'monospace', borderRadius: 6, textDecoration: 'none', fontSize: 14 }}>
            Get started
          </a>
          <div style={{ display: 'flex', marginTop: 40, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, overflow: 'hidden' }}>
            {[['2.4M','Members'],['48M','Games Logged'],['9.1M','Reviews'],['1.2M','Lists']].map(([val, label], i) => (
              <div key={i} style={{ flex: 1, padding: '16px 20px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <div style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 700, color: '#e8ff47' }}>{val}</div>
                <div style={{ fontSize: 11, color: '#7a7f96', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { title: 'Elden Ring', meta: 'FromSoftware · 2022', badge: 'GOTY 2022', bg: 'linear-gradient(160deg,#1a0a2e,#3d1a5e,#8b3e7a)', emoji: '⚔', rating: 5 },
            { title: 'Tears of the Kingdom', meta: 'Nintendo · 2023', badge: 'GOTY 2023', bg: 'linear-gradient(160deg,#0a1628,#1a3a2e,#2d6b3e)', emoji: '🗡', rating: 4 }
          ].map((g, i) => (
            <div key={i} style={{ background: '#161920', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ height: 160, background: g.bg, display: 'flex', alignItems: 'flex-end', padding: 12, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, opacity: 0.2 }}>{g.emoji}</div>
                <span style={{ position: 'relative', zIndex: 1, background: '#e8ff47', color: '#000', fontFamily: 'monospace', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 4 }}>{g.badge}</span>
              </div>
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, marginBottom: 2, color: '#f0f0f0' }}>{g.title}</div>
                <div style={{ fontSize: 11, color: '#7a7f96', marginBottom: 8 }}>{g.meta}</div>
                <div style={{ color: '#e8ff47', fontSize: 13 }}>{'★'.repeat(g.rating)}{'☆'.repeat(5 - g.rating)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 0 }}>
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.07)', paddingRight: 48, paddingTop: 36 }}>
          <div style={{ fontFamily: 'monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#7a7f96', marginBottom: 24 }}>Recent from friends</div>
          <ActivityFeed />
        </div>
        <div style={{ paddingLeft: 40, paddingTop: 36 }}>
          <div style={{ fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: '#7a7f96', marginBottom: 16 }}>Trending</div>
          {[
            { rank: 1, emoji: '🔱', title: 'Hades II', sub: 'Supergiant · 2024', rating: '4.6', badge: 'new' },
            { rank: 2, emoji: '🤖', title: 'Stellar Blade', sub: 'Sony · 2024', rating: '4.1', badge: null },
            { rank: 3, emoji: '🌿', title: 'Hollow Knight 2', sub: 'Team Cherry', rating: '—', badge: 'hot' },
            { rank: 4, emoji: '⚡', title: 'Final Fantasy XVI', sub: 'Square Enix · 2023', rating: '4.3', badge: null },
            { rank: 5, emoji: '🛸', title: "No Man's Sky", sub: 'Hello Games · 2016', rating: '4.0', badge: null },
          ].map((g, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }}>
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#7a7f96', width: 16, textAlign: 'right' }}>{g.rank}</span>
              <div style={{ width: 30, height: 38, borderRadius: 4, background: '#1e2130', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>{g.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#f0f0f0' }}>
                  {g.title}
                  {g.badge && <span style={{ marginLeft: 4, fontSize: 8, fontFamily: 'monospace', fontWeight: 700, padding: '2px 5px', borderRadius: 3, background: g.badge === 'new' ? '#e8ff47' : '#f87171', color: g.badge === 'new' ? '#000' : '#fff' }}>{g.badge}</span>}
                </div>
                <div style={{ fontSize: 10, color: '#7a7f96' }}>{g.sub}</div>
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#e8ff47', fontWeight: 700 }}>{g.rating}</span>
            </div>
          ))}

          <div style={{ marginTop: 32 }}>
            <div style={{ fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: '#7a7f96', marginBottom: 16 }}>Browse by genre</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['RPG','Action','Indie','Horror','Strategy','Platformer','Roguelike','Simulation','Fighting','Metroidvania'].map(tag => (
                <span key={tag} style={{ background: '#1e2130', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '5px 12px', fontSize: 11, color: '#7a7f96', cursor: 'pointer' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}