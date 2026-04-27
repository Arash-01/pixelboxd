'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit() {
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('Check your email to confirm your account!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else window.location.href = '/'
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', fontFamily: 'sans-serif', color: '#f0f0f0' }}>
      <h1 style={{ color: '#e8ff47', fontFamily: 'monospace', marginBottom: 24 }}>PIXELBOXD</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10, background: '#161920', border: '1px solid #333', borderRadius: 6, color: '#fff' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 16, background: '#161920', border: '1px solid #333', borderRadius: 6, color: '#fff' }}
      />
      <button
        onClick={handleSubmit}
        style={{ width: '100%', padding: 10, background: '#e8ff47', color: '#000', fontWeight: 700, border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'monospace' }}
      >
        {isSignUp ? 'Create account' : 'Sign in'}
      </button>
      <p style={{ marginTop: 16, color: '#7a7f96', cursor: 'pointer' }} onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
      </p>
      {message && <p style={{ marginTop: 12, color: '#e8ff47' }}>{message}</p>}
    </div>
  )
}