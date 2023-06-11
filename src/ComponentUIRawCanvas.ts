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

  constructor(context: CanvasRenderingContext2D) {
    this.context = context

    this.x = random(VIEW_WIDTH - COMPONENT_WIDTH)
    this.y = random(VIEW_HEIGHT - COMPONENT_HEIGHT)

    // Set canvas size
    // this.containerEl.width = COMPONENT_WIDTH // adjust size as needed
    // this.containerEl.height = COMPONENT_HEIGHT // adjust size as needed
  }

  draw(number: number) {
    // Draw yellow background
    this.context.fillStyle = 'yellow'
    this.context.fillRect(this.x, this.y, COMPONENT_WIDTH, COMPONENT_HEIGHT)

    // Draw the number
    this.context.fillStyle = 'black'
    this.context.font = '18px Arial'
    this.context.fillText(number.toString(), this.x + 5, this.y + 20) // adjust position as needed
  }

  getElement() {
    // TODO this is stub. do we need it for this type of components?
    return document.createElement('div')
  }
}

export default ComponentUIRawCanvasClass
