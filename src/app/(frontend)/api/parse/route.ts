import { z } from 'zod'
import { NextResponse } from 'next/server'
import { parseM3U8 } from '@/utils/parse-m3u8'
import { zodError } from '@/utils/zod-error'

// Schema validation
const schema = z.object({
  url: z.string({ required_error: 'The url is required' }).trim().url(),
})

// API route for parse
export async function GET(req: Request) {
  try {
    // Extract the query params
    const { searchParams } = new URL(req.url)
    const url = schema.parse({ url: searchParams.get('url') })

    // Parse M3U8
    const { downloadable, valid, manifest } = await parseM3U8(url.url)

    if (!valid) throw Error('The given url must be a valid M3U8 file')

    // Return response
    return NextResponse.json({ downloadable, manifest })
  } catch (error: any) {
    return NextResponse.json(
      {
        message: zodError(error) ?? error.message ?? 'Something went wrong, try again',
      },
      { status: 400 }
    )
  }
}
