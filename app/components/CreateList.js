'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function CreateList() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saved, setSaved] = useState(false)

  async function handleCreate() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return }

    const { error } = await supabase.from('lists').insert({
      user_id: user.id,
      title,
      description
    })

    if (!error) { setSaved(true); setTitle(''); setDescription('') }
  }

  return (
    <div style={{ background: '#161920', padding: 20, borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)' }}>
      <p style={{ color: '#7a7f96', fontSize: 11, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 14 }}>
        Create a list
      </p>
      <input
        placeholder="List title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', padding: 9, background: '#0d0f14', border: '1px solid #333', borderRadius: 6, color: '#fff', marginBottom: 8, fontFamily: 'sans-serif' }}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={3}
        style={{ width: '100%', padding: 9, background: '#0d0f14', border: '1px solid #333', borderRadius: 6, color: '#fff', marginBottom: 12, fontFamily: 'sans-serif', resize: 'vertical' }}
      />
      <button
        onClick={handleCreate}
        style={{ width: '100%', padding: 9, background: '#e8ff47', color: '#000', fontWeight: 700, border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'monospace' }}
      >
        {saved ? '✓ List created!' : 'Create list'}
      </button>
    </div>
  )
}