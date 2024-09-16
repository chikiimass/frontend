import { NextResponse } from 'next/server';

// Utility function to determine content type from response headers
const getContentType = (response: Response) => {
  const contentType = response.headers.get('Content-Type');
  return contentType ? contentType : 'application/octet-stream'; // Fallback content type
};

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get('url');

  if (!url) {
    // Return a 400 Bad Request if no URL is provided
    return new NextResponse('Bad Request: Missing URL parameter', { status: 400 });
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream', // Default to octet-stream for general use
      },
    });

    if (!response.ok) {
      // Forward the status code and status text from the fetch response
      return new NextResponse(response.statusText, { status: response.status });
    }

    const contentType = getContentType(response);

    // Create a readable stream from the response body
    const stream = new ReadableStream({
      start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.error('Failed to read response body');
          return;
        }

        reader.read().then(function processText({ done, value }) {
          if (done) {
            controller.close();
            return;
          }
          controller.enqueue(value);
          reader.read().then(processText);
        }).catch(err => controller.error(err));
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        // Optional: add caching headers
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching URL:', error);
    return new NextResponse('Internal Server Error: Unable to fetch video', { status: 500 });
  }
}
