// app/api/contact/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  const response = await fetch('http://localhost:8000/api/contact/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}