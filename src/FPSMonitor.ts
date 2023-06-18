class FPSMonitor {
  private frameCount: number
  private lastTime: number
  private totalFrames: number
  private totalSeconds: number
  private shouldCalculateFPS: boolean

  constructor() {
    this.frameCount = 0
    this.lastTime = performance.now()
    this.totalFrames = 0
    this.totalSeconds = 0
    this.shouldCalculateFPS = false
  }

  /**
   * Start fps calculation
   **/
  start(): void {
    this.shouldCalculateFPS = true
    this.calculateFPS()
  }

  /**
   * Start fps calculation for a defined duration.
   * @duration in sec
   * return average FPS for this duration
   */
  test(duration: number): Promise<number> {
    // Reset totalFrames, totalSeconds, and lastTime at the start of each test.
    this.totalFrames = 0
    this.totalSeconds = 0
    this.lastTime = performance.now()

    this.start()

    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.totalSeconds >= duration) {
          clearInterval(interval)
          this.shouldCalculateFPS = false
          resolve(Math.round(this.totalFrames / this.totalSeconds))
        }
      }, 1000)
    })
  }

  private calculateFPS(): void {
    if (!this.shouldCalculateFPS) return

    this.frameCount++

    const currentTime: number = performance.now()
    const difference: number = currentTime - this.lastTime

    if (difference >= 1000) {
      console.log('FPS:', this.frameCount)
      this.totalFrames += this.frameCount
      this.frameCount = 0
      this.lastTime = currentTime
      this.totalSeconds++
    }

    requestAnimationFrame(() => this.calculateFPS())
  }
}

export default FPSMonitor
