import { NextResponse } from 'next/server'
import { getUserPlaylists } from '@/lib/spotifyService'

export async function GET() {
  const userId = process.env.SPOTIFY_USER_ID!
  const data = await getUserPlaylists(userId)
  return NextResponse.json(data)
}