import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

const ACCESS_CODE = 'AHN2026'

export async function POST(req: NextRequest) {
  const { code } = await req.json()

  if (code !== ACCESS_CODE) {
    return NextResponse.json({ error: 'Invalid access code' }, { status: 401 })
  }

  const html = readFileSync(join(process.cwd(), 'lib/tools/anyhelpnow.html'), 'utf-8')
  return NextResponse.json({ html })
}
