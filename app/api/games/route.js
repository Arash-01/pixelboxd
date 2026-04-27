export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  // Get access token from Twitch
  const tokenRes = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`,
    { method: 'POST' }
  )
  const { access_token } = await tokenRes.json()

  // Search IGDB
  const gamesRes = await fetch('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: {
      'Client-ID': process.env.IGDB_CLIENT_ID,
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'text/plain'
    },
    body: `search "${query}"; fields name, cover.url, summary, first_release_date, genres.name; limit 10;`
  })

  const games = await gamesRes.json()
  return Response.json(games)
}