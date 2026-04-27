'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function ActivityFeed() {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    async function fetchFeed() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get people the user follows
      const { data: follows } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', user.id)

      const followingIds = follows?.map(f => f.following_id) || []
      followingIds.push(user.id) // include own activity

      // Get their recent logs
      const { data: activity } = await supabase
        .from('logs')
        .select(`
          id, status, rating, review, created_at,
          profiles(username),
          games(name)
        `)
        .in('user_id', followingIds)
        .order('created_at', { ascending: false })
        .limit(20)

      setLogs(activity || [])
    }
    fetchFeed()
  }, [])

  function renderStars(rating) {
    if (!rating) return null
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  if (logs.length === 0) return (
    <p style={{ color: '#7a7f96', fontStyle: 'italic' }}>
      No activity yet. Follow some users to see their logs here!
    </p>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {logs.map(log => (
        <div key={log.id} style={{
          padding: '18px 0',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6
        }}>
          <div style={{ fontSize: 14, color: '#f0f0f0' }}>
            <strong style={{ color: '#e8ff47' }}>{log.profiles?.username}</strong>
            {' '}logged{' '}
            <strong>{log.games?.name}</strong>
            {' '}as <span style={{ color: '#7a7f96' }}>{log.status}</span>
          </div>
          {log.rating && (
            <div style={{ color: '#e8ff47', fontSize: 13, letterSpacing: 2 }}>
              {renderStars(log.rating)}
            </div>
          )}
          {log.review && (
            <div style={{
              fontSize: 13,
              color: '#7a7f96',
              fontStyle: 'italic',
              borderLeft: '2px solid #7b5ea7',
              paddingLeft: 10,
              lineHeight: 1.6
            }}>
              "{log.review}"
            </div>
          )}
          <div style={{ fontSize: 11, color: '#7a7f96' }}>
            {new Date(log.created_at).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  )
}