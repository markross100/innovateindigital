import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

const ACCESS_CODE = 'AHN2026'

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()

 if (code !== ACCESS_CODE) {
  return NextResponse.json({ error: `Got: "${code}" Expected: "${ACCESS_CODE}"` }, { status: 401 })
}
    }

    try {
      const html = readFileSync(join(process.cwd(), 'lib/tools/anyhelpnow.html'), 'utf-8')
      return NextResponse.json({ html })
    } catch (fileError) {
      return NextResponse.json({ error: 'File not found', detail: String(fileError) }, { status: 500 })
    }

  } catch (err) {
    return NextResponse.json({ error: 'Bad request', detail: String(err) }, { status: 400 })
  }
}
