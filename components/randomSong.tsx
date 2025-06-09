/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { FaRandom, FaSpinner, FaSpotify } from 'react-icons/fa'

interface Playlist {
  id: string
  name: string
}

interface TrackItem {
  track: {
    name: string
    artists: { name: string }[]
    external_urls: { spotify: string }
    album: {
      images: { url: string; width: number; height: number }[]
    }
  }
}

interface Suggestion {
  title: string
  artist: string
  url: string
  imageUrl?: string
}


export default function randomSong() {
  const [loading, setLoading] = useState(false)
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null)

  async function handleRecommend() {
    setLoading(true)
    try {
      // 1) Kullanıcının playlist'lerini çek
      const { data: playlistsData } = await axios.get('/api/spotify/playlists')
      const playlists: Playlist[] = playlistsData.items || []

      if (!playlists.length) {
        setSuggestion(null)
        return
      }

      // 2) Rastgele bir playlist seç
      const randomPlaylist =
        playlists[Math.floor(Math.random() * playlists.length)]

      // 3) O playlist'teki şarkıları çek
      const { data: tracksData } = await axios.get(
        `/api/spotify/playlists/${randomPlaylist.id}/tracks`
      )
      const tracks: TrackItem[] = tracksData.items || []

      if (!tracks.length) {
        setSuggestion(null)
        return
      }

      // 4) Rastgele bir şarkı seç ve kapak URL’ini al
      const track = tracks[Math.floor(Math.random() * tracks.length)].track
      const imageUrl = track.album.images[0]?.url

      setSuggestion({
        title: track.name,
        artist: track.artists.map(a => a.name).join(', '),
        url: track.external_urls.spotify,
        imageUrl,
      })
    } catch (error) {
      console.error(error)
      setSuggestion(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full bg-card text-card-foreground dark:bg-card dark:text-card-foreground rounded-lg shadow-lg p-6 ">
      <button
        onClick={handleRecommend}
        disabled={loading}
        className="w-full 
        inline-flex items-center justify-center gap-2 
        py-2 px-4 
      bg-[#1DB954] hover:bg-[#1ed760] 
      text-white font-semibold 
        rounded-full 
        transition-colors 
        disabled:opacity-50"
      >
         {loading
    ? <><FaSpinner className="animate-spin" /> Loading…</>
    : <><FaRandom /> Suggest a Random Song </>
  }
      </button>

      {suggestion && (
        <div className="flex flex-col items-center mt-1.5">
          {suggestion.imageUrl && (
            <div className='relative items-center justify-center w-32 h-32'>
            <Image
              width={128}
              height={128}
              src={suggestion.imageUrl}
              alt={`${suggestion.title}`}
              className="w-32 h-32 object-cover rounded-md mx-auto mb-4 block"
              />
              </div>
          )}
          <p className="text-lg font-semibold">{suggestion.title}</p>
          <p className="text-sm text-muted-foreground">{suggestion.artist}</p>
          <a
            href={suggestion.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block underline"
          >
            <FaSpotify size={32} />
          </a>
        </div>
      )}
    </div>
  )
}
