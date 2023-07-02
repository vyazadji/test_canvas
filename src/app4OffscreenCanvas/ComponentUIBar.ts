// import { COMPONENT_HEIGHT, COMPONENT_WIDTH } from './../consts'

import { getRandomColor } from '../utils/colors'

/**
 * UI Canvas implementation of Bar component.
 * It contains raw Canvas elements
 */
class ComponentUIBar {
  private context: CanvasRenderingContext2D
  x: number
  y: number
  data: number
  barColor: string

  constructor(context: CanvasRenderingContext2D) {
    this.context = context
    this.data = 0

    this.barColor = getRandomColor()
    // init position
    this.x = 0
    this.y = 0
  }

  /**
   * Draw the component
   */
  draw(x: number, y: number, data: number, index?: number) {
    this.data = data
    // this.context.clearRect(this.x, this.y, COMPONENT_WIDTH, COMPONENT_HEIGHT)

    this.x = x
    this.y = y

    const width = 6
    const height = 9
    const barValueWidth = width - 2
    const barValueHeight = Math.round((height * data) / 100)

    // bar component
    this.context.fillStyle = 'green'
    this.context.fillRect(this.x, this.y, width, height)

    //circle example
    this.context.beginPath()
    this.context.arc(x + 3, y + 3, 2, 0, Math.PI * 2, true)
    this.context.stroke()

    // bar value
    this.context.fillStyle = this.barColor
    this.context.fillRect(this.x + 1, this.y + (height - barValueHeight), barValueWidth, barValueHeight)

    //

    // text
    if (index !== undefined) {
      this.context.fillStyle = 'black'
      this.context.font = '3px Arial'
      this.context.fillText(index.toString(), this.x, this.y + height) // adjust position as needed
    }
  }

  /* move(leftNew: number, topNew: number) {
    // Clear the previous drawing
    this.context.clearRect(this.x, this.y, COMPONENT_WIDTH, COMPONENT_HEIGHT)

    this.x = leftNew
    this.y = topNew

    this.draw(this.data)
  } */

  /* getElement() {
    return this
  } */
}

export default ComponentUIBar
