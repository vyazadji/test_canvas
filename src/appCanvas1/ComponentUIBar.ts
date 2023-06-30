// import { COMPONENT_HEIGHT, COMPONENT_WIDTH } from './../consts'

/**
 * UI Canvas implementation of Bar component.
 * It contains raw Canvas elements
 */
class ComponentUIBar {
  private context: CanvasRenderingContext2D
  x: number
  y: number
  data: number

  constructor(context: CanvasRenderingContext2D) {
    this.context = context
    this.data = 0

    // init position
    this.x = 0
    this.y = 0
  }

  draw(x: number, y: number, data: number) {
    this.data = data
    // this.context.clearRect(this.x, this.y, COMPONENT_WIDTH, COMPONENT_HEIGHT)

    this.x = x
    this.y = y

    const width = 5
    const height = 9

    this.context.fillStyle = 'green'
    this.context.fillRect(this.x, this.y, width, height)
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
