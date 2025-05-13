import { NextResponse } from 'next/server'
import { getPlaylistTracks } from '@/lib/spotifyService'

export async function GET(
  _request: Request,
  { params }: { params: { playlistId: string } },
) {
  const data = await getPlaylistTracks(params.playlistId)
  return NextResponse.json(data)
}
