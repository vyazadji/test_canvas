import { getRandomColor } from '../utils/colors'

/**
 * UI Canvas implementation of Bar component.
 * It contains raw Canvas elements
 * This is the part that draw component inside Worker
 */
class ComponentUIBarWorker {
  private context: OffscreenCanvasRenderingContext2D
  x: number
  y: number
  data: number
  barColor: string

  index: number // index of element. Use for debug only

  constructor(context: OffscreenCanvasRenderingContext2D, index: number) {
    this.context = context
    this.data = 0

    this.index = index

    this.barColor = getRandomColor()
    // init position
    this.x = 0
    this.y = 0
  }

  position(x: number, y: number) {
    this.x = x
    this.y = y
  }

  setData(data: number) {
    this.data = data
  }

  /**
   * Draw the component
   */
  draw() {
    const width = 6
    const height = 9
    const barValueWidth = width - 2
    const barValueHeight = Math.round((height * this.data) / 100)

    // bar component
    this.context.fillStyle = 'green'
    this.context.fillRect(this.x, this.y, width, height)

    //circle example
    this.context.beginPath()
    this.context.arc(this.x + 3, this.y + 3, 2, 0, Math.PI * 2, true)
    this.context.stroke()

    // bar value
    this.context.fillStyle = this.barColor
    this.context.fillRect(this.x + 1, this.y + (height - barValueHeight), barValueWidth, barValueHeight)

    // text
    if (this.index !== undefined) {
      this.context.fillStyle = 'black'
      this.context.font = '3px Arial'
      this.context.fillText(this.index.toString(), this.x, this.y + height) // adjust position as needed
    }
  }
}

export default ComponentUIBarWorker
