'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import FollowButton from '../../components/FollowButton'

export default function ProfilePage({ params }) {
  const [profile, setProfile] = useState(null)
  const [logs, setLogs] = useState([])
  const [stats, setStats] = useState({ played: 0, playing: 0, wishlist: 0 })

  useEffect(() => {
    async function fetchProfile() {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', params.id)
        .single()

      setProfile(profileData)

      const { data: logsData } = await supabase
        .from('logs')
        .select('*, games(name, cover_url)')
        .eq('user_id', params.id)
        .order('created_at', { ascending: false })

      setLogs(logsData || [])
      setStats({
        played: logsData?.filter(l => l.status === 'played').length || 0,
        playing: logsData?.filter(l => l.status === 'playing').length || 0,
        wishlist: logsData?.filter(l => l.status === 'wishlist').length || 0
      })
    }
    fetchProfile()
  }, [params.id])

  if (!profile) return <p style={{ color: '#7a7f96', padding: 40 }}>Loading...</p>

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg, #7b5ea7, #e8ff47)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, fontWeight: 700, color: '#000', fontFamily: 'monospace'
        }}>
          {profile.username?.[0]?.toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ color: '#f0f0f0', fontFamily: 'monospace', fontSize: 24, marginBottom: 4 }}>
            {profile.username}
          </h1>
          {profile.bio && <p style={{ color: '#7a7f96', fontSize: 14 }}>{profile.bio}</p>}
        </div>
        <FollowButton targetUserId={params.id} />
      </div>

      <div style={{ display: 'flex', gap: 0, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, marginBottom: 40, overflow: 'hidden' }}>
        {[
          { label: 'Played', value: stats.played },
          { label: 'Playing', value: stats.playing },
          { label: 'Wishlist', value: stats.wishlist }
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: '16px 20px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
            <div style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 700, color: '#e8ff47' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#7a7f96', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontFamily: 'monospace', fontSize: 11, color: '#7a7f96', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20 }}>
        Game Diary
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {logs.map(log => (
          <div key={log.id} style={{ padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ color: '#f0f0f0', fontSize: 14 }}>{log.games?.name}</strong>
              <span style={{ color: '#7a7f96', fontSize: 11 }}>{log.status}</span>
            </div>
            {log.rating && (
              <div style={{ color: '#e8ff47', fontSize: 12, marginTop: 4 }}>
                {'★'.repeat(log.rating)}{'☆'.repeat(5 - log.rating)}
              </div>
            )}
            {log.review && (
              <p style={{ color: '#7a7f96', fontSize: 13, fontStyle: 'italic', marginTop: 6 }}>"{log.review}"</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}