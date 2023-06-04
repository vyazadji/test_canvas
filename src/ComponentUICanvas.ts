import { ComponentUI } from './type'

// UI Canvas implementation of component
class ComponentUICanvasClass implements ComponentUI {
  private canvasEl: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private containerEl: HTMLDivElement

  constructor() {
    this.containerEl = document.createElement('div')
    this.canvasEl = document.createElement('canvas')
    this.context = this.canvasEl.getContext('2d') as CanvasRenderingContext2D

    // Set canvas size
    this.canvasEl.width = 50 // adjust size as needed
    this.canvasEl.height = 50 // adjust size as needed

    // Draw initial number
    // this.draw(number)

    // Append canvas to container div
    this.containerEl.appendChild(this.canvasEl)
  }

  draw(number: number) {
    // Clear the canvas
    this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height)

    // Draw yellow background
    this.context.fillStyle = 'yellow'
    this.context.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height)

    // Draw the number
    this.context.fillStyle = 'black'
    this.context.font = '18px Arial'
    this.context.fillText(number.toString(), 3, 20) // adjust position as needed
  }

  getElement(): HTMLDivElement {
    return this.containerEl
  }
}

export default ComponentUICanvasClass
