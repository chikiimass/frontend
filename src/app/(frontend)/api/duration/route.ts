import { NextResponse } from 'next/server';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// Initialize ffmpeg.wasm
const ffmpeg = createFFmpeg({
  corePath: '/ffmpeg/ffmpeg-core.js',
  log: true,
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const videoUrl = url.searchParams.get('url');

  if (!videoUrl) {
    return NextResponse.json({ error: 'Missing video URL' }, { status: 400 });
  }

  try {
    // Load ffmpeg.wasm if not already loaded
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    // Fetch the video file
    const response = await fetch(videoUrl);
    const videoBlob = await response.blob();
    const videoArrayBuffer = await videoBlob.arrayBuffer();

    // Write the video file to ffmpeg's virtual file system
    const videoFileName = 'input.mp4';  // You can set a default name for the file
    ffmpeg.FS('writeFile', videoFileName, new Uint8Array(videoArrayBuffer));

    // Run ffmpeg command to get duration
    const { stdout } = await ffmpeg.run('-i', videoFileName);

    // Extract duration from ffmpeg output
    const durationMatch = stdout.match(/Duration: (\d+):(\d+):(\d+.\d+)/);
    if (durationMatch) {
      const [hours, minutes, seconds] = durationMatch.slice(1).map(Number);
      const duration = hours * 3600 + minutes * 60 + seconds;
      return NextResponse.json({ duration });
    } else {
      return NextResponse.json({ error: 'Duration not found in video' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing video file:', error);
    return NextResponse.json({ error: 'Error processing video file' }, { status: 500 });
  }
}
