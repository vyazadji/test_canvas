import { ComponentUI } from './type'

// UI Canvas implementation of component
class ComponentUICanvasClass implements ComponentUI {
  type: string
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private container: HTMLDivElement

  constructor() {
    this.type = 'number'

    this.container = document.createElement('div')
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D

    // Set canvas size
    this.canvas.width = 30 // adjust size as needed
    this.canvas.height = 30 // adjust size as needed

    // Draw initial number
    // this.draw(number)

    // Append canvas to container div
    this.container.appendChild(this.canvas)
  }

  draw(number: number) {
    // Clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Draw yellow background
    this.context.fillStyle = 'yellow'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Draw the number
    this.context.fillStyle = 'black'
    this.context.font = '18px Arial'
    this.context.fillText(number.toString(), 3, 20) // adjust position as needed
  }

  getElement(): HTMLDivElement {
    return this.container
  }
}

export default ComponentUICanvasClass
