// Security utilities for form validation and spam prevention
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>\"']/g, '') // Remove potentially dangerous characters
    .slice(0, 1000) // Limit length
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email) && email.length <= 320 // RFC 5321 limit
}

export function isValidPhone(phone: string): boolean {
  // Allow various phone formats but limit length
  const phoneRegex = /^[\+]?[\d\s\-\(\)\.]{7,20}$/
  return phone === '' || phoneRegex.test(phone)
}

export function detectSpam(message: string): boolean {
  const spamKeywords = [
    'viagra', 'cialis', 'loan', 'casino', 'crypto', 'bitcoin',
    'investment', 'guaranteed', 'make money', 'click here',
    'free money', 'no risk', 'limited time', 'act now',
    'winner', 'congratulations', 'selected', 'claim',
    'http://', 'https://', 'www.', '.com', '.org', '.net'
  ]
  
  const lowerMessage = message.toLowerCase()
  const keywordCount = spamKeywords.filter(keyword => 
    lowerMessage.includes(keyword)
  ).length
  
  // Flag as spam if contains multiple spam keywords or excessive URLs
  return keywordCount >= 3 || /https?:\/\/[^\s]{10,}/gi.test(message)
}

export function isBot(formData: any): boolean {
  // Check honeypot field
  if (formData.website && formData.website.trim() !== '') {
    return true
  }
  
  // Check if form was filled too quickly (less than 3 seconds)
  const formStartTime = formData.formStartTime || Date.now()
  const fillTime = Date.now() - formStartTime
  if (fillTime < 3000) {
    return true
  }
  
  // Check for suspicious patterns
  const { firstName, lastName, email, message } = formData
  
  // Check if all fields are identical
  if (firstName === lastName && firstName === email) {
    return true
  }
  
  // Check for random character strings
  const randomPattern = /^[a-z]{20,}$/i
  if (randomPattern.test(firstName) || randomPattern.test(lastName)) {
    return true
  }
  
  return false
}

export function getClientFingerprint(): string {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return 'ssr-' + Math.random().toString(36).substring(7)
  }

  try {
    // Create a basic client fingerprint for tracking
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    let canvasData = 'no-canvas'
    
    if (ctx) {
      ctx.textBaseline = 'top'
      ctx.font = '14px Arial'
      ctx.fillText('Client fingerprint', 2, 2)
      canvasData = canvas.toDataURL()
    }
    
    const fingerprint = [
      navigator.userAgent || 'unknown',
      navigator.language || 'en',
      (screen.width || 0) + 'x' + (screen.height || 0),
      new Date().getTimezoneOffset(),
      canvasData
    ].join('|')
    
    // Simple hash function
    let hash = 0
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    
    return hash.toString()
  } catch (error) {
    // Fallback for any errors
    return 'fallback-' + Math.random().toString(36).substring(7)
  }
}