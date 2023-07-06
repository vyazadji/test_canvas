import ComponentClass from './Component'
// import ServiceLayer from './ServiceLayer'
import Layer from './Layer'

const LAYERS_COUNT = 5

/**
 * Canvas app with offscreenCanvas in separate layers
 */
class ViewCanvasApp4 {
  element: HTMLElement

  height: number
  width: number

  components: ComponentClass[]

  // serviceLayer: ServiceLayer
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

    // create main element
    this.element = document.createElement('div')
    this.element.style.width = this.width + 'px'
    this.element.style.height = this.height + 'px'
    this.element.style.position = 'relative'
    this.element.style.border = '1px solid blue'

    this.element.addEventListener('mousedown', this.handleMouseDown)
    this.element.addEventListener('mousemove', this.handleMouseMove)
    this.element.addEventListener('mouseup', this.handleMouseUp)
    this.element.addEventListener('mouseout', this.handleMouseUp) // Stop panning when mouse leaves canvas.
    this.element.addEventListener('wheel', this.handleWheel)

    // create service Layer
    // this.serviceLayer = new ServiceLayer(this.width, this.height)
    // this.element.appendChild(this.serviceLayer.getCanvas())

    // create components' layers
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
    component.getUIElement().addInLayer(layer, index)

    // this is a work around because only here we have
    // initialized all object: layer and componentUI
    // do it to set position in componentUI
    component.position(component.x, component.y)

    // add component
    this.components.push(component)
  }

  start() {
    // init draw
    this.needsRedraw = true
    this.draw()

    return this.element
  }

  clearLayers() {
    this.layers.forEach((layer) => {
      layer.clear()
    })
  }
  setScaleInLayers() {
    this.layers.forEach((layer) => {
      layer.setScale(this.zoomFactor, this.offsetX, this.offsetY)
    })
  }

  contextRestorLayers() {
    this.layers.forEach((layer) => {
      layer.contextRestore()
    })
  }

  draw() {
    const componentNeedsRedraw = this.components.some((c) => c.needsRedraw)

    if (this.needsRedraw || componentNeedsRedraw) {
      this.clearLayers()

      this.setScaleInLayers()

      // redraw all layers
      this.layers.forEach((layer) => {
        layer.draw()
      })

      // Draw my scene here
      /* this.components.forEach((component) => {
        component.draw()
      }) */

      this.contextRestorLayers()

      // Reset the flag
      this.needsRedraw = false

      // workaround disabble needsRedraw in all components
      for (let index = 0; index < this.components.length; index++) {
        const component = this.components[index]
        component.needsRedraw = false
      }
    }

    // Request the next frame
    requestAnimationFrame(this.draw.bind(this))
  }

  //
  //
  // Events handlers // TODO move in a separate component ?
  //
  //

  handleMouseDown = (event: MouseEvent) => {
    //
    // Drag full layout
    //
    if (event.metaKey) {
      // handle panning when metaKey is press
      this.isPanning = true
      this.lastPosition = { x: event.clientX, y: event.clientY }
      return
    }

    //
    // Drag one component
    //
    // Calculate mouse position in canvas
    const rect = this.element.getBoundingClientRect()
    let mouseX = event.clientX - rect.left
    let mouseY = event.clientY - rect.top

    // Adjust the position based on the current translation amounts
    mouseX -= this.offsetX
    mouseY -= this.offsetY

    // Adjust the position based on the current zoom factor
    mouseX /= this.zoomFactor
    mouseY /= this.zoomFactor

    // TODO hardcoded components dimensions
    const COMPONENT_WIDTH = 10
    const COMPONENT_HEIGHT = 10
    // Identify which component was clicked
    for (const component of this.components) {
      if (
        mouseX >= component.x &&
        mouseX <= component.x + COMPONENT_WIDTH &&
        mouseY >= component.y &&
        mouseY <= component.y + COMPONENT_HEIGHT
      ) {
        console.log('click on component', component.id, component)
        this.draggingComponent = component
        return
      }
    }
  }

  handleMouseMove = (event: MouseEvent) => {
    //
    //    Handle panning
    //
    if (this.isPanning && event.metaKey) {
      // Calculate the difference between the current mouse position and the last mouse position.
      const dx = event.clientX - this.lastPosition.x
      const dy = event.clientY - this.lastPosition.y

      // Update the offsets.
      // this.offsetX += dx / this.zoomFactor
      // this.offsetY += dy / this.zoomFactor
      this.offsetX += dx
      this.offsetY += dy

      // Update the last position.
      this.lastPosition = { x: event.clientX, y: event.clientY }

      // Redraw the scene.
      // this.draw()
      // Flag that a redraw is needed
      this.needsRedraw = true
    }

    //
    // Handle one component dragging
    //
    if (this.draggingComponent) {
      const rect = this.element.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      // Update the position of the dragging component
      const x = (mouseX - this.offsetX) / this.zoomFactor
      const y = (mouseY - this.offsetY) / this.zoomFactor
      this.draggingComponent.position(x, y)
      this.needsRedraw = true
    }
  }

  handleMouseUp = (_event: MouseEvent) => {
    this.isPanning = false
    this.draggingComponent = null
  }

  handleWheel = (event: WheelEvent) => {
    event.preventDefault()

    const scaleAmount = 1.1
    const mouseX = event.clientX - this.element.getBoundingClientRect().left
    const mouseY = event.clientY - this.element.getBoundingClientRect().top

    if (event.deltaY < 0) {
      // zoom in
      this.zoomFactor *= scaleAmount
      this.offsetX -= ((scaleAmount - 1) * (mouseX - this.offsetX)) / this.zoomFactor
      this.offsetY -= ((scaleAmount - 1) * (mouseY - this.offsetY)) / this.zoomFactor
    } else {
      // zoom out
      this.zoomFactor /= scaleAmount
      this.offsetX += ((1 - 1 / scaleAmount) * (mouseX - this.offsetX)) / this.zoomFactor
      this.offsetY += ((1 - 1 / scaleAmount) * (mouseY - this.offsetY)) / this.zoomFactor
    }
    this.needsRedraw = true
  }
}

export default ViewCanvasApp4
