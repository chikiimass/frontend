'use client'

import { IoCheckmarkCircleOutline, IoDownloadOutline } from 'react-icons/io5'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { DownloadStatus, useDownloader } from '@/hooks/use-downloader'
import { useDownloadStore } from '@/store/downloads'

export interface DownloadProps {
  url: string
  name: string
}

export const statusMessages: Record<DownloadStatus, string> = {
  [DownloadStatus.Success]: 'Downloaded',
  [DownloadStatus.Idle]: '',
  [DownloadStatus.Loading]: '',
  [DownloadStatus.Parsing]: '',
  [DownloadStatus.Downloading]: '',
  [DownloadStatus.Converting]: '',
  [DownloadStatus.Error]: ''
}

export function Download({ url, name }: DownloadProps) {
  const setDownload = useDownloadStore(state => state.setDownload)
  const { blobUrl, percentage, status } = useDownloader({ url })

  const percentageStr = useMemo(() => {
    return `${status === DownloadStatus.Success ? 100 : percentage}%`
  }, [percentage, status])

  // Automatically trigger the file download when the download is complete
  useMemo(() => {
    if (status === DownloadStatus.Success && blobUrl) {
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `${name}.mp4`
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }, [blobUrl, status, name])

  return (
    <div className='w-full flex flex-col items-center space-y-4'>
      <div className='relative flex items-center justify-center'>
        <div
          role='progressbar'
          className='absolute z-0 h-10 w-10 rounded-full border-4 border-neutral-300'
          style={{
            background: `conic-gradient(green ${percentageStr}, transparent ${percentageStr})`,
          }}
        />
        <Button
          className='relative z-10'
          aria-label='Download File'
          disabled={status !== DownloadStatus.Success}
        >
          {status === DownloadStatus.Success ? (
            <IoCheckmarkCircleOutline size={24} />
          ) : (
            <span className='text-md'>
              <strong>{percentageStr}</strong>
            </span>
          )}
        </Button>
      </div>

{/*       {status === DownloadStatus.Success && (
        <p className='text-green-700 dark:text-green-500'>{statusMessages[status]}</p>
      )} */}
    </div>
  )
}
