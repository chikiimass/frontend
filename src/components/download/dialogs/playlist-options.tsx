'use client'

import { useMemo, useState } from 'react'
import { shallow } from 'zustand/shallow'
import { Button } from '@/components/ui/button'
import { useDownloadStore } from '@/store/downloads'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { DialogProps } from '@radix-ui/react-dialog'
import type { Manifest, Playlist } from 'm3u8-parser'

export interface ParsedData {
  downloadable: boolean
  manifest: Manifest
}

export interface ExtractedData {
  playlists: string[]
  info: ParsedData[]
}

const getPlaylistName = (playlist?: Playlist) => {
  const { NAME: name, RESOLUTION: resolution } = playlist?.attributes ?? {}

  return name ?? (resolution ? `${resolution.width}x${resolution?.height}` : 'video')
}

export function PlaylistOptionsDialog({
  extractedData,
  parsedData,
  ...props
}: DialogProps & { parsedData?: ParsedData; extractedData?: ExtractedData }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState('0')
  const [selectedPlaylistFormat, setSelectedPlaylistFormat] = useState('0')
  const addDownload = useDownloadStore(state => state.setDownload, shallow)

  const playlists = useMemo(() => {
    const data = parsedData ?? extractedData?.info?.at(+selectedPlaylist)

    return !data?.downloadable
      ? data?.manifest.playlists
      : [{ uri: extractedData?.playlists.at(+selectedPlaylist) ?? '', attributes: { NAME: 'unknown' } }]
  }, [extractedData, parsedData, selectedPlaylist])

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Download Options</DialogTitle>
        </DialogHeader>
        <div className='space-y-1 dark:border-primary'>
          {extractedData && (
            <>
              <label className='text-sm' htmlFor='playlist'>
                Playlist:
              </label>
              <Select value={selectedPlaylist} onValueChange={setSelectedPlaylist}>
                <SelectTrigger className='w-full' id='playlist'>
                  {`Playlist ${+selectedPlaylist + 1}`}
                </SelectTrigger>
                <SelectContent>
                  {extractedData?.playlists?.map((playlist, index) => (
                    <SelectItem className='max-w-xs break-all sm:max-w-md' key={playlist} value={`${index}`}>
                      {new URL(playlist).pathname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
          <label className='block text-sm' htmlFor='format'>
            Format:
          </label>
          <Select value={selectedPlaylistFormat} onValueChange={setSelectedPlaylistFormat}>
            <SelectTrigger className='w-full' id='format'>
              <SelectValue placeholder='Format' />
            </SelectTrigger>
            <SelectContent>
              {playlists?.map((playlist, index) => (
                <SelectItem key={index} value={`${index}`}>
                  {getPlaylistName(playlist)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
        className='btn btn-primary mt-4'
          type='button'
          onClick={() => {
            const playlist = playlists?.at(+selectedPlaylistFormat)

            if (!playlist) return

            addDownload({ url: playlist.uri })

            props.onOpenChange?.(false)
          }}
        >
          Download
        </Button>
      </DialogContent>
    </Dialog>
  )
}
