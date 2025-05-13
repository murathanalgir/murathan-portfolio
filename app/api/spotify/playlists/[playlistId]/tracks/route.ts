/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/spotify/playlists/[playlistId]/tracks/route.ts
import { NextResponse } from 'next/server'
import { getPlaylistTracks } from '@/lib/spotifyService'


export async function GET(request: Request, context: any) {
  const { playlistId } = context.params as { playlistId: string }
  try {
    const data = await getPlaylistTracks(playlistId)
    return NextResponse.json(data)
  } catch (err: any) {
    console.error('API /tracks hata:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
