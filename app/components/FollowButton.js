'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function FollowButton({ targetUserId }) {
  const [following, setFollowing] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    async function check() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setCurrentUser(user)

      const { data } = await supabase
        .from('follows')
        .select('id')
        .eq('follower_id', user.id)
        .eq('following_id', targetUserId)
        .single()

      if (data) setFollowing(true)
    }
    check()
  }, [targetUserId])

  async function handleFollow() {
    if (!currentUser) { window.location.href = '/login'; return }

    if (following) {
      await supabase.from('follows').delete()
        .eq('follower_id', currentUser.id)
        .eq('following_id', targetUserId)
      setFollowing(false)
    } else {
      await supabase.from('follows').insert({
        follower_id: currentUser.id,
        following_id: targetUserId
      })
      setFollowing(true)
    }
  }

  return (
    <button
      onClick={handleFollow}
      style={{
        padding: '8px 20px',
        background: following ? 'transparent' : '#e8ff47',
        color: following ? '#e8ff47' : '#000',
        border: '1px solid #e8ff47',
        borderRadius: 6,
        fontWeight: 700,
        fontFamily: 'monospace',
        cursor: 'pointer',
        fontSize: 12
      }}
    >
      {following ? 'Following' : 'Follow'}
    </button>
  )
}