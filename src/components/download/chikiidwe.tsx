'use client'

import axios from 'redaxios'
import useSWRMutation from 'swr/mutation'
import { useMemo, useState, useCallback } from 'react'
import { shallow } from 'zustand/shallow'
import { Button } from '@/components/ui/button'
import { PlaylistOptionsDialog, type ExtractedData, type ParsedData } from './dialogs/playlist-options'
import { useDownloadStore } from '@/store/downloads'

interface ArgOptions {
  arg: string
}

interface DownloadComponentProps {
  urlProp: string;
}

async function requestEndpoint<T>(path: string, { arg }: ArgOptions) {
  const res = await axios.get<T>(`/${path}?url=${arg}`)
  return res.data
}

export function DownloadComponent({ urlProp }: DownloadComponentProps) {
  const [open, setOpen] = useState(false)
  const addDownload = useDownloadStore(state => state.setDownload, shallow)

  const {
    trigger: parseUrl,
    data: parsedUrlData,
    error: parsingError,
    isMutating: isParsing,
    reset: resetParsedData,
  } = useSWRMutation('api/parse', requestEndpoint<ParsedData>)

  const {
    trigger: extractUrl,
    data: extractedData,
    error: extractingError,
    isMutating: isExtracting,
    reset: resetExtractedData,
  } = useSWRMutation('api/extract', requestEndpoint<ExtractedData>)

  const error = useMemo(
    () => extractingError?.data?.message ?? parsingError?.data?.message,
    [extractingError?.data?.message, parsingError?.data?.message]
  )

  // Move processUrl function outside useEffect
  const processUrl = useCallback(async (url: string) => {
    resetParsedData()
    resetExtractedData()

    const parsedUrl = new URL(url)

    if (!parsedUrl.protocol.startsWith('http')) {
      console.error('Invalid URL protocol')
      return
    }

    const isM3U8File = parsedUrl.pathname.replace(/\/+$/, '').endsWith('.m3u8')

      ; (isM3U8File ? parseUrl(url) : extractUrl(url))
        .then(data => {
          if (!data) return

          if ('info' in data && data.info.length === 0) {
            console.error('No M3U8 files could be found in this url')
            return
          }

          if ('downloadable' in data && data.downloadable) {
            return addDownload({ url })
          }

          setOpen(true)
        })
        .catch(() => console.error('Error processing URL'))
  }, [parseUrl, extractUrl, addDownload, resetParsedData, resetExtractedData])

  return (
    <div>
      <PlaylistOptionsDialog
        parsedData={parsedUrlData}
        extractedData={extractedData}
        open={open}
        onOpenChange={setOpen}
      />
      <Button
        className="btn btn-link"
        onClick={() => {
          if (urlProp) {
            processUrl(urlProp)
          }
        }}
        loading={isParsing || isExtracting}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-6 h-6 fill-current text-primary hover:text-secondary"
        >
          <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" /></svg>

      </Button>
    </div>
  )
}
