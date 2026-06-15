import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = await fetch(
    'https://iid1974.app.n8n.cloud/webhook/06b2b40f-7e07-4943-bba8-5cc86237f3b6',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  const text = await response.text();
  try {
    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ output: text });
  }
}
