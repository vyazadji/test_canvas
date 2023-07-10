import type { Layer, ComponentUI } from './types'

import ComponentClass from './Component'
import LayerCanvas from './LayerCanvas'
import LayerHtml from './LayerHTML'
import ComponentUIBarCanvas from './ComponentUIBarCanvas'
import ComponentUIBarHTML from './ComponentUIBarHTML'
import { ELEMENT_HEIGHT, ELEMENT_WIDTH } from './constants'

/**
 * Multilayer View
 */
class ViewMultilayer {
  element: HTMLElement

  height: number
  width: number

  components: ComponentClass[]

  zoomFactor: number
  offsetX: number
  offsetY: number
  isPanning: boolean
  lastPosition: { x: number; y: number }
  needsRedraw: boolean

  draggingComponent: ComponentClass | null

  layers: Layer[]

  constructor(height: number, width: number) {
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
    this.element.style.overflow = 'hidden'
    this.element.style.border = '1px solid blue'

    // create layers
    this.layers = []
    const canvasLayer = new LayerCanvas(this.width, this.height)
    this.layers.push(canvasLayer)

    const htmlLayer = new LayerHtml(this.width, this.height)
    this.layers.push(htmlLayer)

    this.element.addEventListener('mousedown', this.handleMouseDown)
    this.element.addEventListener('mousemove', this.handleMouseMove)
    this.element.addEventListener('mouseup', this.handleMouseUp)
    this.element.addEventListener('mouseout', this.handleMouseUp) // Stop panning when mouse leaves canvas.
    this.element.addEventListener('wheel', this.handleWheel)
  }

  start() {
    // add all layers
    this.layers.forEach((layer: Layer) => {
      this.element.appendChild(layer.getElement())
    })

    this.needsRedraw = true
    this.draw()
    return this.element
  }

  ////
  addComponent(component: ComponentClass) {
    if (component.index % 2) {
      // Canvas Layer
      const layerCanvas = this.layers[0] as LayerCanvas // TODO not to use predefined layer's indexes
      const context = layerCanvas.getContext()
      const componentUI: ComponentUI = new ComponentUIBarCanvas(context, component.index)
      component.componentUI = componentUI // TODO use a set method for this?
      layerCanvas.addComponent(component)
    } else {
      // HTML Layer
      const layerHtml = this.layers[1] // TODO not to use index to get html layer
      const htmlLayerElement = layerHtml.getElement()
      const componentUI: ComponentUI = new ComponentUIBarHTML(
        htmlLayerElement,
        component.x,
        component.y,
        component.index
      )
      layerHtml.addComponent(component)
      component.componentUI = componentUI
    }

    this.components.push(component)
  }

  drawComponents() {
    this.components.forEach((component) => {
      component.draw()
    })
  }

  draw() {
    const componentNeedsRedraw = this.components.some((c) => c.needsRedraw)
    if (this.needsRedraw || componentNeedsRedraw) {
      // run redraw in all layers
      this.layers.forEach((layer: Layer) => {
        layer.draw(this.zoomFactor, this.offsetX, this.offsetY)
      })
      // Reset the flag
      this.needsRedraw = false
    }

    // Request the next frame
    requestAnimationFrame(this.draw.bind(this))
  }

  //
  //
  // Zoom and dragging layer handlers
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

    // Identify which component was clicked
    for (const component of this.components) {
      if (
        mouseX >= component.x &&
        mouseX <= component.x + ELEMENT_WIDTH &&
        mouseY >= component.y &&
        mouseY <= component.y + ELEMENT_HEIGHT
      ) {
        console.log('click on component', component.index, component)
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

export default ViewMultilayer
