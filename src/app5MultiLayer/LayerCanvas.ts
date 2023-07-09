import type { Layer } from './types'
import ComponentClass from './Component'

/**
 * Implementation a independent Canvas Layer
 */
class LayerCanvas implements Layer {
  height: number
  width: number

  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D

  components: ComponentClass[]

  constructor(width: number, height: number) {
    this.width = width
    this.height = height

    this.components = []

    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.style.position = 'absolute'

    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
  }

  getElement() {
    return this.canvas
  }

  getContext() {
    return this.context
  }

  addComponent(component: ComponentClass) {
    this.components.push(component)
  }

  drawComponents() {
    for (let index = 0; index < this.components.length; index++) {
      const component = this.components[index]
      component.draw()
    }
  }

  draw() {
    console.log('LayerCanvas draw()')
    this.context.save()

    // Clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Translate and scale context
    // this.context.translate(this.offsetX, this.offsetY)
    // this.context.scale(this.zoomFactor, this.zoomFactor)

    // Draw my scene here
    this.drawComponents()

    this.context.restore()
  }
}

export default LayerCanvas
