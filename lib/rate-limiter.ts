// Simple client-side rate limiter to prevent spam
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map()
  private readonly maxAttempts: number
  private readonly windowMs: number

  constructor(maxAttempts: number = 3, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts
    this.windowMs = windowMs
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const attempts = this.attempts.get(identifier) || []
    
    // Clean old attempts outside the time window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs)
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false
    }

    // Record this attempt
    recentAttempts.push(now)
    this.attempts.set(identifier, recentAttempts)
    
    return true
  }

  getRemainingTime(identifier: string): number {
    const attempts = this.attempts.get(identifier) || []
    if (attempts.length === 0) return 0
    
    const oldestAttempt = Math.min(...attempts)
    const remainingTime = this.windowMs - (Date.now() - oldestAttempt)
    
    return Math.max(0, remainingTime)
  }
}

// Global rate limiter instance
export const formRateLimiter = new RateLimiter(3, 300000) // 3 attempts per 5 minutes