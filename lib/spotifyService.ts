import axios from 'axios'
import querystring from 'querystring'

const clientId = process.env.SPOTIFY_CLIENT_ID!
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!

async function fetchAccessToken(): Promise<string> {
  const tokenUrl = 'https://accounts.spotify.com/api/token'
  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const response = await axios.post(
    tokenUrl,
    querystring.stringify({ grant_type: 'client_credentials' }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authHeader}`,
      },
    },
  )
  return response.data.access_token
}

export async function getUserPlaylists(userId: string) {
  const token = await fetchAccessToken()
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export async function getPlaylistTracks(playlistId: string) {
  const token = await fetchAccessToken()
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}