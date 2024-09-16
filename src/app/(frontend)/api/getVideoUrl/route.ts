import puppeteer from 'puppeteer';

export async function GET() {
  const initialUrl = 'https://www.dailymotion.com/cdn/H264-848x480/video/x95o766.mp4?download=1&sec=9jZe75pzIK3yszva0xeAVebdmzDNQQvv_YxaknHAl-pZvhrTHlbZ5pPhBoH9_1LJ';

  try {
    // Launch Puppeteer (in headless mode)
    const browser = await puppeteer.launch({ headless: 'new' }); // headless: 'new' for the latest behavior
    const page = await browser.newPage();

    // Go to the initial URL (Puppeteer will follow any redirections)
    await page.goto(initialUrl, { waitUntil: 'networkidle2' });

    // Get the final redirected URL
    const finalUrl = page.url();

    // Close the browser instance
    await browser.close();

    // Return the final URL as a JSON response
    return new Response(JSON.stringify({ videoUrl: finalUrl }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in Puppeteer fetching final URL:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch video URL' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
