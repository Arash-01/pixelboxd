'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import LogButton from '../components/LogButton'

function SearchContent() {
  const searchParams = useSearchParams()
  const initial = searchParams.get('q') || ''
  const [query, setQuery] = useState(initial)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (initial) handleSearch(initial)
  }, [])

  async function handleSearch(q = query) {
    if (!q.trim()) return
    setLoading(true)
    setResults([])
    setSelected(null)
    const res = await fetch(`/api/games?q=${encodeURIComponent(q)}`)
    const data = await res.json()
    setResults(data || [])
    setLoading(false)
  }

  function getCoverUrl(game) {
    if (game.cover?.url) {
      return 'https:' + game.cover.url.replace('t_thumb', 't_cover_big')
    }
    return null
  }

  function getReleaseYear(game) {
    if (!game.first_release_date) return '—'
    return new Date(game.first_release_date * 1000).getFullYear()
  }

  return (
    <div className="sr-wrap">
      <div className="sr-title">Search Games</div>

      <div className="sr-search-row">
        <input
          className="sr-input"
          type="text"
          placeholder="Search for any game… e.g. Elden Ring, Celeste, Hades"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button className="sr-btn" onClick={() => handleSearch()} disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>

      {loading && <div className="sr-loading">Searching IGDB…</div>}

      {!loading && results.length === 0 && query && (
        <div className="sr-empty">No results found for "{query}"</div>
      )}

      {!loading && results.length === 0 && !query && (
        <div className="sr-empty">Type a game name above and hit Search or Enter</div>
      )}

      {results.length > 0 && (
        <div className="sr-results">
          {results.map(game => (
            <div
              key={game.id}
              className={`sr-card ${selected?.id === game.id ? 'selected' : ''}`}
              onClick={() => setSelected(selected?.id === game.id ? null : game)}
            >
              {getCoverUrl(game)
                ? <img className="sr-card-cover" src={getCoverUrl(game)} alt={game.name} />
                : <div className="sr-card-cover-placeholder">🎮</div>
              }
              <div className="sr-card-body">
                <div className="sr-card-title">{game.name}</div>
                <div className="sr-card-meta">{getReleaseYear(game)}</div>
                <div className="sr-card-genres">
                  {game.genres?.slice(0,2).map(g => (
                    <span key={g.id} className="sr-genre">{g.name}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="sr-detail">
          <div className="sr-detail-cover">
            {getCoverUrl(selected)
              ? <img src={getCoverUrl(selected)} alt={selected.name} />
              : <div className="sr-detail-cover-placeholder">🎮</div>
            }
          </div>
          <div>
            <div className="sr-detail-title">{selected.name}</div>
            <div className="sr-detail-meta">
              {getReleaseYear(selected)}
              {selected.genres?.length > 0 && ' · ' + selected.genres.map(g => g.name).join(', ')}
            </div>
            {selected.summary && (
              <div className="sr-detail-summary">{selected.summary}</div>
            )}
          </div>
          <LogButton gameId={selected.id} gameName={selected.name} />
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #0d0f14; --surface: #161920; --surface2: #1e2130;
          --accent: #e8ff47; --accent2: #7b5ea7;
          --text: #f0f0f0; --muted: #7a7f96;
          --border: rgba(255,255,255,0.07);
        }
        body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }
        .sr-nav {
          position: sticky; top: 0; z-index: 200;
          background: rgba(13,15,20,0.92); backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .sr-nav-inner {
          max-width: 1320px; margin: 0 auto; padding: 0 40px;
          height: 60px; display: flex; align-items: center; justify-content: space-between;
        }
        .sr-logo {
          font-family: 'Space Mono', monospace; font-size: 20px;
          font-weight: 700; color: var(--accent); text-decoration: none;
          display: flex; align-items: center; gap: 8px;
        }
        .sr-logo-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; animation: blink 1.4s infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .sr-wrap { max-width: 1320px; margin: 0 auto; padding: 48px 40px; }
        .sr-title { font-family: 'Space Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: var(--muted); margin-bottom: 20px; }
        .sr-search-row { display: flex; gap: 10px; margin-bottom: 40px; }
        .sr-input { flex: 1; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 12px 18px; font-size: 15px; color: var(--text); font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.15s; }
        .sr-input:focus { border-color: rgba(232,255,71,0.4); }
        .sr-input::placeholder { color: var(--muted); }
        .sr-btn { background: var(--accent); color: #000; border: none; padding: 12px 24px; border-radius: 8px; font-size: 13px; font-weight: 700; font-family: 'Space Mono', monospace; cursor: pointer; transition: opacity 0.15s; white-space: nowrap; }
        .sr-btn:hover { opacity: 0.88; }
        .sr-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .sr-loading { color: var(--muted); font-family: 'Space Mono', monospace; font-size: 13px; padding: 40px 0; text-align: center; animation: pulse 1s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .sr-results { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .sr-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; cursor: pointer; transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s; }
        .sr-card:hover { transform: translateY(-4px); border-color: rgba(232,255,71,0.2); box-shadow: 0 12px 32px rgba(0,0,0,0.5); }
        .sr-card.selected { border-color: var(--accent); background: rgba(232,255,71,0.05); }
        .sr-card-cover { width: 100%; height: 160px; object-fit: cover; display: block; background: var(--surface2); }
        .sr-card-cover-placeholder { width: 100%; height: 160px; background: var(--surface2); display: flex; align-items: center; justify-content: center; font-size: 48px; }
        .sr-card-body { padding: 12px; }
        .sr-card-title { font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700; color: var(--text); margin-bottom: 4px; line-height: 1.3; }
        .sr-card-meta { font-size: 11px; color: var(--muted); margin-bottom: 8px; }
        .sr-card-genres { display: flex; flex-wrap: wrap; gap: 4px; }
        .sr-genre { background: var(--surface2); border-radius: 20px; padding: 3px 8px; font-size: 10px; color: var(--muted); }
        .sr-detail { margin-top: 40px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 28px; display: grid; grid-template-columns: 200px 1fr 280px; gap: 28px; align-items: start; }
        .sr-detail-cover { width: 200px; border-radius: 8px; overflow: hidden; }
        .sr-detail-cover img { width: 100%; display: block; }
        .sr-detail-cover-placeholder { width: 200px; height: 260px; background: var(--surface2); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 64px; }
        .sr-detail-title { font-family: 'Space Mono', monospace; font-size: 24px; font-weight: 700; color: var(--text); margin-bottom: 6px; letter-spacing: -0.5px; line-height: 1.2; }
        .sr-detail-meta { font-size: 13px; color: var(--muted); margin-bottom: 16px; }
        .sr-detail-summary { font-size: 14px; color: var(--muted); line-height: 1.75; max-height: 150px; overflow-y: auto; }
        .sr-empty { text-align: center; padding: 60px 0; color: var(--muted); font-family: 'Space Mono', monospace; font-size: 13px; }
      `}</style>

      <Suspense fallback={<div style={{color:'#7a7f96',padding:40,fontFamily:'monospace'}}>Loading…</div>}>
        <SearchContent />
      </Suspense>
    </>
  )
}