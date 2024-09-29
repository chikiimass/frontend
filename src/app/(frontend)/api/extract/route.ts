import axios from 'redaxios'
import { z } from 'zod'
import { NextResponse } from 'next/server'
import { parseM3U8 } from '@/utils/parse-m3u8'
import { zodError } from '@/utils/zod-error'

const EXTRACTOR_URL = 'https://onlinetool.app/run/m3u8_extractor'

// Schema validation
const schema = z.object({
  url: z.string({ required_error: 'The url is required' }).trim().url(),
})

const responseSchema = z.object({
  raw: z.array(z.string().url()),
})

// API route for extract
export async function GET(req: Request) {
  try {
    // Extract the query params
    const { searchParams } = new URL(req.url)
    const url = schema.parse({ url: searchParams.get('url') })

    // Post the data to the external service
    const body = { url: url.url, yt: 'yes' }
    const response = await axios.post(EXTRACTOR_URL, body)

    // Validate response structure
    const result = responseSchema.safeParse(response.data)

    // Handle invalid response
    if (!result.success) {
      return NextResponse.json({ playlists: [], info: [] })
    }

    // Filter playlists and fetch info for M3U8 files
    const playlists = result.data.raw.filter((url) => new URL(url).pathname.replace(/\/+$/, '').endsWith('.m3u8'))
    const info = await Promise.all(playlists.map(parseM3U8))

    // Return response
    return NextResponse.json({ playlists, info })
  } catch (error: any) {
    return NextResponse.json(
      {
        message: zodError(error) ?? error.message ?? 'Something went wrong, try again',
      },
      { status: 400 }
    )
  }
}
