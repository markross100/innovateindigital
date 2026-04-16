import { NextRequest, NextResponse } from 'next/server'
import { anyhelpnowHtml } from '@/lib/tools/anyhelpnow'

const ACCESS_CODE = 'AHN2026'

export async function POST(req: NextRequest) {
  const { code } = await req.json()

  if (code !== ACCESS_CODE) {
    return NextResponse.json({ error: 'Invalid access code' }, { status: 401 })
  }

  return NextResponse.json({ html: anyhelpnowHtml })
}
