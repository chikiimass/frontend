'use client'

import axios from 'redaxios'
import useSWRMutation from 'swr/mutation'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlaylistOptionsDialog, type ExtractedData, type ParsedData } from './dialogs/playlist-options'
import { useDownloadStore } from '@/store/downloads'
import { shallow } from 'zustand/shallow'

interface ArgOptions {
  arg: string
}

interface Props {
  url: string // M3U8 URL passed as prop
}

async function requestEndpoint<T>(path: string, { arg }: ArgOptions) {
  const res = await axios.get<T>(`/${path}?url=${arg}`)
  return res.data
}

export function M3U8Button({ url }: Props) {
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

  const handleClick = async () => {
    resetParsedData()
    resetExtractedData()

    const isM3U8File = url.endsWith('.m3u8')

    try {
      const data = isM3U8File ? await parseUrl(url) : await extractUrl(url)

      if (!data) return

      if ('info' in data && data.info.length === 0) {
        throw new Error('No M3U8 files could be found in this url')
      }

      if ('downloadable' in data && data.downloadable) {
        return addDownload({ url })
      }

      setOpen(true)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <Button
        className='mt-2 rounded-full'
        onClick={handleClick}
        loading={isParsing || isExtracting}
      >
        Convert
      </Button>

      {error && (
        <div className='mt-2'>
          <p className='text-sm text-red-700 dark:text-red-500'>{error}</p>
        </div>
      )}

      <PlaylistOptionsDialog
        parsedData={parsedUrlData}
        extractedData={extractedData}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  )
}
