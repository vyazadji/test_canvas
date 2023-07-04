import ComponentClass from './Component'
import Layer from './Layer'

const LAYERS_COUNT = 3

/**
 * Canvas app with offscreenCanvas in separate layers
 */
class ViewCanvasApp4 {
  element: HTMLElement

  height: number
  width: number

  components: ComponentClass[]

  layers: Layer[]

  zoomFactor: number
  offsetX: number
  offsetY: number
  isPanning: boolean
  lastPosition: { x: number; y: number }
  needsRedraw: boolean

  draggingComponent: ComponentClass | null

  constructor(width: number, height: number) {
    this.width = width
    this.height = height

    this.components = []

    this.zoomFactor = 1
    this.offsetX = 0
    this.offsetY = 0
    this.isPanning = false
    this.lastPosition = { x: 0, y: 0 }
    this.needsRedraw = false

    this.draggingComponent = null

    this.element = document.createElement('div')
    this.element.style.width = this.width + 'px'
    this.element.style.height = this.height + 'px'
    this.element.style.position = 'relative'
    this.element.style.border = '1px solid blue'

    this.layers = []

    this.createLayers()
  }

  createLayers() {
    for (let index = 0; index < LAYERS_COUNT; index++) {
      const layer = new Layer(this.width, this.height)
      const canvasLayer = layer.getCanvas()
      this.element.appendChild(canvasLayer)
      this.layers.push(layer)
    }
  }

  getContext(): HTMLElement {
    return this.element
  }

  addComponent(component: ComponentClass, index: number) {
    // get layer number
    const targetLayerNumber = index % LAYERS_COUNT

    // add UI in layer
    const layer = this.layers[targetLayerNumber]
    component.getUIElement().addInLayer(layer)

    // add component
    this.components.push(component)
  }

  start() {
    // init draw
    this.needsRedraw = true
    this.draw()

    return this.element
  }

  clearLayouts() {
    this.layers.forEach((layer) => {
      layer.clear()
    })
  }

  draw() {
    const componentNeedsRedraw = this.components.some((c) => c.needsRedraw)
    if (this.needsRedraw || componentNeedsRedraw) {
      this.clearLayouts()

      /* this.context.save()
      // Clear the canvas
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // Translate and scale context
      this.context.translate(this.offsetX, this.offsetY)
      this.context.scale(this.zoomFactor, this.zoomFactor)
*/

      // Draw my scene here
      this.components.forEach((component) => {
        component.draw()
      })

      // Reset the flag
      this.needsRedraw = false
    }

    // Request the next frame
    requestAnimationFrame(this.draw.bind(this))
  }
}

export default ViewCanvasApp4
