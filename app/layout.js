export const metadata = {
  title: "Pixelboxd — Track games you've played.",
  description: 'The social platform for gamers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0d0f14' }}>
        {children}
      </body>
    </html>
  )
}