// src/app/api/indexnow/route.ts
// IndexNow: Instantly notify search engines when you publish/update pages
// Supported by: Bing, Yandex, Seznam, Naver

import { NextResponse } from "next/server";

// Generate your own API key at: https://www.indexnow.org/
// Then save it as: /public/[YOUR_KEY].txt containing just the key
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "YOUR_INDEXNOW_KEY_HERE";
const SITE_URL = "https://ricrene.co.tz";

export async function POST(request: Request) {
  try {
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: "Please provide an array of URLs to submit" },
        { status: 400 }
      );
    }

    // Submit to Bing's IndexNow endpoint
    // (Automatically syncs to Yandex, Seznam, Naver)
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: "ricrene.co.tz",
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: `Successfully submitted ${urls.length} URL(s) to IndexNow`,
        urls,
      });
    } else {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: "IndexNow submission failed",
          details: errorText,
          status: response.status,
        },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("IndexNow error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

// Example usage from your code:
 fetch('/api/indexnow', {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({
    urls: [
       'https://ricrene.co.tz/services/web-development',
       'https://ricrene.co.tz/services/domain-hosting',
       'https://ricrene.co.tz/services/website-maintenance',
       'https://ricrene.co.tz/services/custom-systems',
       'https://ricrene.co.tz/services/data-analysis',
       'https://ricrene.co.tz/services/corporate-email',
       'https://ricrene.co.tz/services/seo-digital-marketing',
       'https://ricrene.co.tz/services/digital-solutions',
     ],      
   })
});