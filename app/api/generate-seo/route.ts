import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import { getProviderKey } from '@/lib/secrets'

const execAsync = promisify(exec)

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  // Verify secret token
  const authHeader = request.headers.get('authorization')
  const expectedToken = process.env.SEO_GENERATION_SECRET

  if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const geminiKey = await getProviderKey('gemini')
    const { stdout, stderr } = await execAsync('python3 scripts/programmatic_seo.py', {
      cwd: process.cwd(),
      env: {
        ...process.env,
        GEMINI_API_KEY: geminiKey || process.env.GEMINI_API_KEY || '',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'SEO content generated successfully',
      output: stdout,
      errors: stderr || null,
    })
  } catch (error) {
    console.error('SEO generation failed:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Generation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
