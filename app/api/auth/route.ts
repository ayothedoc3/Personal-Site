import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 })
  }

  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'GitHub OAuth not configured' }, { status: 500 })
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      throw new Error(tokenData.error_description || 'GitHub OAuth error')
    }

    // Get user info
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${tokenData.access_token}`,
        'Accept': 'application/json',
      },
    })

    if (!userResponse.ok) {
      throw new Error('Failed to get user info')
    }

    const userData = await userResponse.json()

    // Create the success response with token and user info
    const response = {
      token: tokenData.access_token,
      provider: 'github',
      user: {
        id: userData.id,
        login: userData.login,
        email: userData.email,
        name: userData.name,
        avatar_url: userData.avatar_url,
      }
    }

    // Return success response that Decap CMS expects
    return NextResponse.json(response, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })

  } catch (error) {
    console.error('GitHub OAuth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Handle POST requests for OAuth callback
  const body = await request.json()
  
  return NextResponse.json({
    token: body.token || '',
    provider: 'github'
  })
}