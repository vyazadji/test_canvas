import { ComponentUI } from './type'

import { COMPONENT_HEIGHT, COMPONENT_WIDTH } from './consts'

// UI Canvas implementation of component
class ComponentUICanvasClass implements ComponentUI {
  private context: CanvasRenderingContext2D
  private containerEl: HTMLCanvasElement

  constructor() {
    this.containerEl = document.createElement('canvas')
    this.context = this.containerEl.getContext('2d') as CanvasRenderingContext2D

    // Set canvas size
    this.containerEl.width = COMPONENT_WIDTH // adjust size as needed
    this.containerEl.height = COMPONENT_HEIGHT // adjust size as needed
  }

  draw(number: number) {
    // Clear the canvas
    this.context.clearRect(0, 0, this.containerEl.width, this.containerEl.height)

    // Draw yellow background
    this.context.fillStyle = 'yellow'
    this.context.fillRect(0, 0, this.containerEl.width, this.containerEl.height)

    // Draw the number
    this.context.fillStyle = 'black'
    this.context.font = '18px Arial'
    this.context.fillText(number.toString(), 3, 20) // adjust position as needed
  }

  getElement(): HTMLCanvasElement {
    return this.containerEl
  }
}

export default ComponentUICanvasClass
