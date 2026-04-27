'use client'
import dynamic from 'next/dynamic'
const ActivityFeed = dynamic(() => import('./components/ActivityFeed'), { ssr: false })

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0d0f14; --surface: #161920; --surface2: #1e2130;
          --accent: #e8ff47; --accent2: #7b5ea7;
          --text: #f0f0f0; --muted: #7a7f96;
          --border: rgba(255,255,255,0.07);
          --border-soft: rgba(255,255,255,0.04);
          --red: #f87171;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          line-height: 1.6;
          min-height: 100vh;
        }

        .px-nav {
          position: sticky; top: 0; z-index: 200;
          background: rgba(13,15,20,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }

        .px-nav-inner {
          max-width: 1320px; margin: 0 auto; padding: 0 40px;
          height: 60px; display: flex; align-items: center;
          justify-content: space-between; gap: 32px;
        }

        .px-logo {
          font-family: 'Space Mono', monospace; font-size: 20px;
          font-weight: 700; color: var(--accent); letter-spacing: -0.5px;
          display: flex; align-items: center; gap: 8px;
          flex-shrink: 0; text-decoration: none;
        }

        .px-logo-dot {
          width: 8px; height: 8px; background: var(--accent);
          border-radius: 50%; animation: blink 1.4s infinite;
        }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .px-nav-links { display: flex; gap: 8px; list-style: none; align-items: center; }

        .px-nav-links a {
          color: var(--muted); text-decoration: none; font-size: 13px;
          font-weight: 500; padding: 6px 12px; border-radius: 6px;
          transition: color 0.15s, background 0.15s; cursor: pointer;
        }

        .px-nav-links a:hover { color: var(--text); background: var(--surface); }

        .px-search {
          flex: 1; max-width: 320px;
        }

        .px-search input {
          width: 100%; background: var(--surface); border: 1px solid var(--border);
          border-radius: 8px; padding: 8px 14px 8px 36px; font-size: 13px;
          color: var(--text); font-family: 'DM Sans', sans-serif; outline: none;
          transition: border-color 0.15s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%237a7f96' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: 12px center;
        }

        .px-search input::placeholder { color: var(--muted); }
        .px-search input:focus { border-color: rgba(232,255,71,0.4); }

        .px-nav-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

        .px-btn-ghost {
          background: transparent; color: var(--text);
          border: 1px solid var(--border); padding: 7px 16px;
          border-radius: 6px; font-size: 13px; font-weight: 500;
          cursor: pointer; transition: background 0.15s; font-family: 'DM Sans', sans-serif;
          text-decoration: none;
        }

        .px-btn-ghost:hover { background: var(--surface); }

        .px-btn-primary {
          background: var(--accent); color: #0d0f14; border: none;
          padding: 8px 18px; border-radius: 6px; font-size: 13px;
          font-weight: 700; font-family: 'Space Mono', monospace;
          cursor: pointer; letter-spacing: 0.2px;
          transition: opacity 0.15s, transform 0.1s; text-decoration: none;
          display: inline-block;
        }

        .px-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

        .px-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: linear-gradient(135deg, var(--accent2), var(--accent));
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: #000;
          cursor: pointer; font-family: 'Space Mono', monospace;
        }

        .px-hero { border-bottom: 1px solid var(--border); padding: 64px 0 56px; }

        .px-hero-inner {
          max-width: 1320px; margin: 0 auto; padding: 0 40px;
          display: grid; grid-template-columns: 1fr 400px;
          gap: 64px; align-items: center;
        }

        .px-hero h1 {
          font-family: 'Space Mono', monospace; font-size: 42px;
          font-weight: 700; line-height: 1.18; letter-spacing: -1.5px;
          color: var(--accent); margin-bottom: 16px;
        }

        .px-hero p {
          color: var(--muted); font-size: 16px; max-width: 480px;
          line-height: 1.75; margin-bottom: 28px;
        }

        .px-hero-actions { display: flex; gap: 12px; align-items: center; margin-bottom: 48px; }

        .px-stats {
          display: flex; border: 1px solid var(--border);
          border-radius: 10px; overflow: hidden;
        }

        .px-stat { flex: 1; padding: 16px 20px; border-right: 1px solid var(--border); }
        .px-stat:last-child { border-right: none; }

        .px-stat-val {
          font-family: 'Space Mono', monospace; font-size: 22px;
          font-weight: 700; color: var(--accent); line-height: 1; margin-bottom: 4px;
        }

        .px-stat-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; }

        .px-featured-games { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .px-featured-card {
          background: var(--surface); border-radius: 12px;
          border: 1px solid var(--border); overflow: hidden;
          cursor: pointer; transition: transform 0.2s, border-color 0.2s;
        }

        .px-featured-card:hover { transform: translateY(-4px); border-color: rgba(232,255,71,0.2); }

        .px-featured-cover {
          height: 160px; position: relative;
          display: flex; align-items: flex-end; padding: 12px;
        }

        .px-cover-art {
          position: absolute; inset: 0; display: flex;
          align-items: center; justify-content: center;
          font-size: 72px; opacity: 0.2; user-select: none;
        }

        .px-cover-badge {
          position: relative; z-index: 1; background: var(--accent);
          color: #000; font-family: 'Space Mono', monospace;
          font-size: 9px; font-weight: 700; padding: 3px 8px;
          border-radius: 4px; letter-spacing: 0.5px;
        }

        .px-featured-info { padding: 12px 14px 14px; }

        .px-featured-title {
          font-family: 'Space Mono', monospace; font-size: 13px;
          font-weight: 700; letter-spacing: -0.3px; margin-bottom: 2px; color: var(--text);
        }

        .px-featured-meta { font-size: 11px; color: var(--muted); margin-bottom: 8px; }

        .px-stars { display: flex; gap: 2px; align-items: center; }
        .px-star { font-size: 12px; color: var(--accent); }
        .px-star-dim { font-size: 12px; color: var(--accent); opacity: 0.15; }
        .px-rating-num { font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; color: var(--accent); margin-left: 6px; }

        .px-tabs-bar { border-bottom: 1px solid var(--border); }

        .px-tabs-inner {
          max-width: 1320px; margin: 0 auto; padding: 0 40px; display: flex;
        }

        .px-tab {
          padding: 14px 20px; font-size: 12px; font-weight: 700;
          color: var(--muted); cursor: pointer;
          border-bottom: 2px solid transparent; margin-bottom: -1px;
          transition: all 0.15s; font-family: 'Space Mono', monospace;
          text-transform: uppercase; letter-spacing: 0.8px;
        }

        .px-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
        .px-tab:hover { color: var(--text); }

        .px-main-layout {
          max-width: 1320px; margin: 0 auto; padding: 0 40px;
          display: grid; grid-template-columns: 1fr 300px; gap: 0;
        }

        .px-main-col { border-right: 1px solid var(--border); padding-right: 48px; }

        .px-sidebar {
          padding-left: 40px; padding-top: 36px;
          position: sticky; top: 60px;
          height: calc(100vh - 60px); overflow-y: auto; scrollbar-width: none;
        }

        .px-sidebar::-webkit-scrollbar { display: none; }

        .px-section { padding: 36px 0; border-bottom: 1px solid var(--border); }
        .px-section:last-child { border-bottom: none; }

        .px-section-header {
          display: flex; align-items: baseline;
          justify-content: space-between; margin-bottom: 24px;
        }

        .px-section-title {
          font-family: 'Space Mono', monospace; font-size: 11px;
          font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--muted);
        }

        .px-section-link { font-size: 12px; color: var(--accent); text-decoration: none; cursor: pointer; font-weight: 500; }

        .px-games-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }

        .px-game-card {
          border-radius: 8px; overflow: hidden; cursor: pointer;
          background: var(--surface); border: 1px solid var(--border);
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          position: relative;
        }

        .px-game-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.6); border-color: rgba(232,255,71,0.15); }
        .px-game-card:hover .px-card-overlay { opacity: 1; }

        .px-card-cover {
          height: 100px; display: flex; align-items: center;
          justify-content: center; font-size: 38px; position: relative; overflow: hidden;
        }

        .px-card-overlay {
          position: absolute; inset: 0; background: rgba(232,255,71,0.1);
          opacity: 0; transition: opacity 0.2s;
          display: flex; align-items: center; justify-content: center;
        }

        .px-play-btn {
          width: 30px; height: 30px; background: var(--accent);
          border-radius: 50%; display: flex; align-items: center;
          justify-content: center; font-size: 11px; color: #000; font-weight: 700;
        }

        .px-card-body { padding: 8px 9px 10px; }
        .px-card-title { font-size: 11px; font-weight: 600; line-height: 1.3; margin-bottom: 5px; color: var(--text); }
        .px-card-stars { display: flex; gap: 1px; }
        .px-s { font-size: 9px; color: var(--accent); }
        .px-se { font-size: 9px; color: var(--muted); opacity: 0.25; }

        .px-sidebar-section { margin-bottom: 32px; }

        .px-sidebar-title {
          font-family: 'Space Mono', monospace; font-size: 10px;
          text-transform: uppercase; letter-spacing: 2px; color: var(--muted); margin-bottom: 16px;
        }

        .px-trending-list { list-style: none; }

        .px-trending-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 0; border-bottom: 1px solid var(--border-soft);
          cursor: pointer; transition: opacity 0.15s;
        }

        .px-trending-item:hover { opacity: 0.75; }
        .px-trending-item:last-child { border-bottom: none; }

        .px-trend-rank { font-family: 'Space Mono', monospace; font-size: 10px; color: var(--muted); width: 16px; text-align: right; flex-shrink: 0; }
        .px-trend-cover { width: 30px; height: 38px; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
        .px-trend-info { flex: 1; min-width: 0; }
        .px-trend-title { font-size: 12px; font-weight: 600; color: var(--text); }
        .px-trend-sub { font-size: 10px; color: var(--muted); }
        .px-trend-rating { font-family: 'Space Mono', monospace; font-size: 12px; color: var(--accent); font-weight: 700; flex-shrink: 0; }

        .px-badge { display: inline-block; font-size: 8px; font-family: 'Space Mono', monospace; font-weight: 700; padding: 2px 5px; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: middle; margin-left: 4px; }
        .px-badge-new { background: var(--accent); color: #000; }
        .px-badge-hot { background: #f87171; color: #fff; }

        .px-tag-cloud { display: flex; flex-wrap: wrap; gap: 6px; }

        .px-tag {
          background: var(--surface2); border: 1px solid var(--border);
          border-radius: 20px; padding: 5px 12px; font-size: 11px;
          color: var(--muted); cursor: pointer; transition: all 0.15s;
        }

        .px-tag:hover { border-color: var(--accent); color: var(--accent); }
        .px-tag.active { background: rgba(232,255,71,0.08); border-color: var(--accent); color: var(--accent); }

        .px-footer { border-top: 1px solid var(--border); padding: 28px 0; }

        .px-footer-inner {
          max-width: 1320px; margin: 0 auto; padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between;
        }

        .px-footer-logo { font-family: 'Space Mono', monospace; font-size: 14px; font-weight: 700; color: var(--muted); }
        .px-footer-links { display: flex; gap: 24px; list-style: none; }
        .px-footer-links a { font-size: 12px; color: var(--muted); text-decoration: none; cursor: pointer; transition: color 0.15s; }
        .px-footer-links a:hover { color: var(--text); }
        .px-footer-copy { font-size: 11px; color: var(--muted); }
      `}</style>

      <title>Pixelboxd — Track games you&apos;ve played.</title>

      {/* NAV */}
      <nav className="px-nav">
        <div className="px-nav-inner">
          <a href="#" className="px-logo">
            <div className="px-logo-dot"></div>
            PIXELBOXD
          </a>
          <ul className="px-nav-links">
            <li><a href="/search">Games</a></li>
            <li><a href="#">Lists</a></li>
            <li><a href="#">Members</a></li>
            <li><a href="#">Journal</a></li>
          </ul>
          <div className="px-search">
            <input
              type="text"
              placeholder="Search games, members, lists…"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(e.target.value.trim())}`
                }
              }}
            />
          </div>
          <div className="px-nav-right">
            <a href="/login" className="px-btn-ghost">Sign in</a>
            <a href="/login" className="px-btn-primary">Get started</a>
            <div className="px-avatar">AX</div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-hero">
        <div className="px-hero-inner">
          <div>
            <h1>Track games you&apos;ve played.<br />Tell your friends what&apos;s good.</h1>
            <p>The social platform for gamers. Log every session, rate every adventure, write reviews and share lists with people who get it.</p>
            <div className="px-hero-actions">
              <a href="/login" className="px-btn-primary" style={{padding:'10px 24px',fontSize:14}}>Get started</a>
            </div>
            <div className="px-stats">
              {[['2.4M','Members'],['48M','Games Logged'],['9.1M','Reviews'],['1.2M','Lists']].map(([v,l],i) => (
                <div key={i} className="px-stat">
                  <div className="px-stat-val">{v}</div>
                  <div className="px-stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-featured-games">
            {[
              { title:'Elden Ring', meta:'FromSoftware · 2022', badge:'GOTY 2022', bg:'linear-gradient(160deg,#1a0a2e,#3d1a5e,#8b3e7a,#c4716d)', emoji:'⚔', rating:5 },
              { title:'Tears of the Kingdom', meta:'Nintendo · 2023', badge:'GOTY 2023', bg:'linear-gradient(160deg,#0a1628,#1a3a2e,#2d6b3e,#5a9a4e)', emoji:'🗡', rating:4 }
            ].map((g,i) => (
              <div key={i} className="px-featured-card">
                <div className="px-featured-cover" style={{background:g.bg}}>
                  <div className="px-cover-art">{g.emoji}</div>
                  <span className="px-cover-badge">{g.badge}</span>
                </div>
                <div className="px-featured-info">
                  <div className="px-featured-title">{g.title}</div>
                  <div className="px-featured-meta">{g.meta}</div>
                  <div className="px-stars">
                    {[1,2,3,4,5].map(n => (
                      <span key={n} className={n <= g.rating ? 'px-star' : 'px-star-dim'}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABS */}
      <div className="px-tabs-bar">
        <div className="px-tabs-inner">
          <div className="px-tab active">Activity</div>
          <div className="px-tab">New releases</div>
          <div className="px-tab">Your diary</div>
        </div>
      </div>

      {/* MAIN */}
      <div className="px-main-layout">
        <div className="px-main-col">

          <div className="px-section">
            <div className="px-section-header">
              <div className="px-section-title">Recent from friends</div>
              <a className="px-section-link">See all →</a>
            </div>
            <ActivityFeed />
          </div>

          <div className="px-section">
            <div className="px-section-header">
              <div className="px-section-title">Popular this week</div>
              <a className="px-section-link">Full chart →</a>
            </div>
            <div className="px-games-grid">
              {[
                { emoji:'⚔', title:'Elden Ring', bg:'linear-gradient(135deg,#1a0a2e,#6a2a8e)', stars:5 },
                { emoji:'🗡', title:'Tears of the Kingdom', bg:'linear-gradient(135deg,#0a2a10,#2a7a30)', stars:4 },
                { emoji:'🐉', title:"Baldur's Gate 3", bg:'linear-gradient(135deg,#1a0505,#8a2020)', stars:5 },
                { emoji:'🌍', title:'Disco Elysium', bg:'linear-gradient(135deg,#0a0a2a,#2a2a8a)', stars:5 },
                { emoji:'🏔', title:'Celeste', bg:'linear-gradient(135deg,#0a2a1a,#1a7a5a)', stars:5 },
                { emoji:'🔱', title:'Hades II', bg:'linear-gradient(135deg,#1a0505,#7a1a1a)', stars:4 },
              ].map((g,i) => (
                <div key={i} className="px-game-card">
                  <div className="px-card-cover" style={{background:g.bg}}>
                    {g.emoji}
                    <div className="px-card-overlay"><div className="px-play-btn">▶</div></div>
                  </div>
                  <div className="px-card-body">
                    <div className="px-card-title">{g.title}</div>
                    <div className="px-card-stars">
                      {[1,2,3,4,5].map(n => <span key={n} className={n <= g.stars ? 'px-s' : 'px-se'}>★</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* SIDEBAR */}
        <div className="px-sidebar">
          <div className="px-sidebar-section">
            <div className="px-sidebar-title">Trending</div>
            <ul className="px-trending-list">
              {[
                { rank:1, emoji:'🔱', title:'Hades II', sub:'Supergiant · 2024', rating:'4.6', badge:'new', bg:'linear-gradient(135deg,#1a0505,#8a2020)' },
                { rank:2, emoji:'🤖', title:'Stellar Blade', sub:'Sony · 2024', rating:'4.1', badge:null, bg:'linear-gradient(135deg,#0a1a3a,#2a4a8a)' },
                { rank:3, emoji:'🌿', title:'Hollow Knight 2', sub:'Team Cherry', rating:'—', badge:'hot', bg:'linear-gradient(135deg,#0a2a0a,#2a6a2a)' },
                { rank:4, emoji:'⚡', title:'Final Fantasy XVI', sub:'Square Enix · 2023', rating:'4.3', badge:null, bg:'linear-gradient(135deg,#1a1a0a,#5a5a1a)' },
                { rank:5, emoji:'🛸', title:"No Man's Sky", sub:'Hello Games · 2016', rating:'4.0', badge:null, bg:'linear-gradient(135deg,#1a0a2e,#5a1a8e)' },
              ].map((g,i) => (
                <li key={i} className="px-trending-item">
                  <span className="px-trend-rank">{g.rank}</span>
                  <div className="px-trend-cover" style={{background:g.bg}}>{g.emoji}</div>
                  <div className="px-trend-info">
                    <div className="px-trend-title">
                      {g.title}
                      {g.badge && <span className={`px-badge px-badge-${g.badge}`}>{g.badge}</span>}
                    </div>
                    <div className="px-trend-sub">{g.sub}</div>
                  </div>
                  <div className="px-trend-rating">{g.rating}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-sidebar-section">
            <div className="px-sidebar-title">Browse by genre</div>
            <div className="px-tag-cloud">
              {['RPG','Action','Indie','Horror','Strategy','Platformer','Roguelike','Simulation','Fighting','Metroidvania','Puzzle','Sports'].map(tag => (
                <span key={tag} className="px-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="px-footer">
        <div className="px-footer-inner">
          <div className="px-footer-logo">PIXELBOXD</div>
          <ul className="px-footer-links">
            {['About','API','Pro','Blog','Help','Privacy'].map(l => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
          <div className="px-footer-copy">Made for gamers, by gamers</div>
        </div>
      </footer>
    </>
  )
}