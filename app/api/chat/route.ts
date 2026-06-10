import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    const response = await fetch('https://iid1974.app.n8n.cloud/webhook/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      return NextResponse.json({ reply: 'Sorry, something went wrong. Please try again.' }, { status: 200 })
    }

    const text = await response.text()
    console.log('n8n response:', text)
    
    try {
      const data = JSON.parse(text)
      return NextResponse.json(data)
    } catch {
      return NextResponse.json({ reply: text })
    }

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ reply: 'Sorry, something went wrong. Please try again.' }, { status: 200 })
  }
}
