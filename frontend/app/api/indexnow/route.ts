// src/app/api/indexnow/route.ts
// IndexNow: Instantly notify search engines when you publish/update pages
// Supported by: Bing, Yandex, Seznam, Naver

import { NextResponse } from "next/server";

// Generate your own API key at: https://www.indexnow.org/
// Save it as: /public/[YOUR_KEY].txt containing just the key
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "YOUR_INDEXNOW_KEY_HERE";
const SITE_URL = "https://ricrene.co.tz";

/**
 * Submit URLs to IndexNow
 * @param urls Array of full URLs to submit
 */
export async function submitToIndexNow(urls: string[]) {
  if (!urls || urls.length === 0) {
    throw new Error("Please provide an array of URLs to submit");
  }

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: "ricrene.co.tz",
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`IndexNow submission failed: ${errorText}`);
  }

  return { success: true, message: `Successfully submitted ${urls.length} URL(s) to IndexNow`, urls };
}

// API Route handler
export async function POST(request: Request) {
  try {
    const { urls } = await request.json();
    const result = await submitToIndexNow(urls);
    return NextResponse.json(result);
  } catch (error) {
    console.error("IndexNow error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * Example usage for build-time or server-side calls
 * (Works in getStaticProps / getServerSideProps)
 */
export async function submitIndexNowFromServer() {
  const urls = [
    'https://ricrene.co.tz/services/web-development',
    'https://ricrene.co.tz/services/domain-hosting',
    'https://ricrene.co.tz/services/website-maintenance',
    'https://ricrene.co.tz/services/custom-systems',
    'https://ricrene.co.tz/services/data-analysis',
    'https://ricrene.co.tz/services/corporate-email',
    'https://ricrene.co.tz/services/seo-digital-marketing',
    'https://ricrene.co.tz/services/digital-solutions',
  ];

  // Call the API handler directly (avoids fetch/URL issues)
  const fakeRequest = new Request("http://localhost:3000", {
    method: "POST",
    body: JSON.stringify({ urls }),
  });

  const response = await POST(fakeRequest);
  const data = await response.json();
  return data;
}