import { NextRequest, NextResponse } from 'next/server'

const ACCESS_CODE = 'AHN2026'

export async function POST(req: NextRequest) {
  let code = ''
  try {
    const body = await req.text()
    const parsed = JSON.parse(body)
    code = (parsed.code || '').trim().toUpperCase()
  } catch {
    return NextResponse.json({ error: 'Could not parse request' }, { status: 400 })
  }

  if (code !== ACCESS_CODE) {
    return NextResponse.json({ error: `Received: "${code}"` }, { status: 401 })
  }

  try {
    const response = await fetch('https://innovateindigital.com/tools/anyhelpnow.html')
    const html = await response.text()
    return NextResponse.json({ html })
  } catch (e) {
    return NextResponse.json({ error: `Fetch error: ${String(e)}` }, { status: 500 })
  }
}
