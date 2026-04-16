import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

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
    const html = readFileSync(join(process.cwd(), 'lib/tools/anyhelpnow.html'), 'utf-8')
    return NextResponse.json({ html })
  } catch (e) {
    return NextResponse.json({ error: `File error: ${String(e)}` }, { status: 500 })
  }
}
