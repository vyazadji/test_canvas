import { random } from 'lodash'

import { ComponentUI } from './type'
import { COMPONENT_HEIGHT, COMPONENT_WIDTH, VIEW_HEIGHT, VIEW_WIDTH } from './consts'

/**
 * UI Canvas implementation of component.
 * It contains raw Canvas elements
 * Use in Canvas view
 */
class ComponentUIRawCanvasClass implements ComponentUI {
  private context: CanvasRenderingContext2D
  x: number
  y: number
  directionX: number
  directionY: number
  dataSourceNumber: number

  constructor(context: CanvasRenderingContext2D) {
    this.context = context
    this.dataSourceNumber = 0

    // init position
    this.x = random(VIEW_WIDTH - COMPONENT_WIDTH)
    this.y = random(VIEW_HEIGHT - COMPONENT_HEIGHT)

    //init direction
    this.directionX = 0
    this.directionY = 0
  }

  draw(number: number) {
    this.dataSourceNumber = number

    // Draw yellow background
    this.context.fillStyle = 'yellow'
    this.context.fillRect(this.x, this.y, COMPONENT_WIDTH, COMPONENT_HEIGHT)

    // Draw the number
    this.context.fillStyle = 'black'
    this.context.font = '18px Arial'
    this.context.fillText(number.toString(), this.x + 5, this.y + 20) // adjust position as needed
  }

  move(leftNew: number, topNew: number) {
    // Clear the previous drawing
    this.context.clearRect(this.x, this.y, COMPONENT_WIDTH, COMPONENT_HEIGHT)

    this.x = leftNew
    this.y = topNew

    this.reDraw()
  }

  reDraw() {
    this.draw(this.dataSourceNumber)
  }

  getElement() {
    return this
  }
}

export default ComponentUIRawCanvasClass
