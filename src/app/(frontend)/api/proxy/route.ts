
import { NextResponse } from 'next/server';
export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get('url');

  if (!url) {
    return NextResponse.error();
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'video/mp4',
      },
    });

    if (!response.ok) {
      return NextResponse.error();
    }

    const videoBlob = await response.blob();

    return new NextResponse(videoBlob, {
      headers: {
        'Content-Type': 'video/mp4',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return NextResponse.error();
  }
}
