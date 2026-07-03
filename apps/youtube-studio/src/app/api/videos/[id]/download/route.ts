import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const backendUrl = process.env['NEXT_PUBLIC_API_URL'] || 'http://localhost:8000';

    // Proxy the request to the backend
    const range = request.headers.get('range');
    const response = await fetch(`${backendUrl}/api/videos/${id}/download`, {
      headers: {
        // Forward the range header for partial content requests
        ...(range && { Range: range }),
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Video not found or not ready' },
        { status: response.status },
      );
    }

    // Get the video blob
    const blob = await response.blob();

    // Return the video with proper headers
    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'video/mp4',
        'Content-Length': response.headers.get('content-length') || '',
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error proxying video download:', error);
    return NextResponse.json({ error: 'Failed to download video' }, { status: 500 });
  }
}
