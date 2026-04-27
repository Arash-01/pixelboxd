'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function LogButton({ gameId, gameName }) {
  const [status, setStatus] = useState('')
  const [rating, setRating] = useState(0)
  const [saved, setSaved] = useState(false)

  async function handleLog() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return; }

    const { error } = await supabase.from('logs').upsert({
      user_id: user.id,
      game_id: gameId,
      status,
      rating
    })

    if (!error) setSaved(true)
  }

  return (
    <div style={{ background: '#161920', padding: 16, borderRadius: 8, border: '1px solid #333' }}>
      <p style={{ color: '#7a7f96', fontSize: 12, marginBottom: 8, fontFamily: 'monospace', textTransform: 'uppercase' }}>Log {gameName}</p>
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        style={{ width: '100%', padding: 8, background: '#0d0f14', color: '#fff', border: '1px solid #333', borderRadius: 6, marginBottom: 8 }}
      >
        <option value="">Select status</option>
        <option value="played">Played</option>
        <option value="playing">Currently playing</option>
        <option value="wishlist">Wishlist</option>
      </select>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {[1,2,3,4,5].map(n => (
          <span
            key={n}
            onClick={() => setRating(n)}
            style={{ fontSize: 20, cursor: 'pointer', color: n <= rating ? '#e8ff47' : '#333' }}
          >★</span>
        ))}
      </div>
      <button
        onClick={handleLog}
        style={{ width: '100%', padding: 9, background: '#e8ff47', color: '#000', fontWeight: 700, border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'monospace' }}
      >
        {saved ? '✓ Logged!' : 'Log game'}
      </button>
    </div>
  )
}