import type { Layer, ComponentUI, Component } from './types'

import LayerCanvas from './LayerCanvas'
import LayerHtml from './LayerHTML'
import ComponentUIBarCanvas from './ComponentUIBarCanvas'
import ComponentUIBarHTML from './ComponentUIBarHTML'
import ServiceLayer from './ServiceLayer'

type ViewPosition = {
  zoomFactor: number
  offsetX: number
  offsetY: number
}

/**
 * Multilayer View
 */
class ViewMultilayer {
  element: HTMLElement

  height: number
  width: number

  components: Component[]

  zoomFactor: number
  offsetX: number
  offsetY: number
  isPanning: boolean
  lastPosition: { x: number; y: number }
  needsRedraw: boolean

  draggingComponent: Component | null

  serviceLayer: ServiceLayer
  layers: Layer[]

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
    this.element.style.overflow = 'hidden'
    this.element.style.border = '1px solid blue'

    // create layers
    this.layers = []
    const canvasLayer = new LayerCanvas(this.width, this.height)
    this.layers.push(canvasLayer)

    const htmlLayer = new LayerHtml(this.width, this.height)
    this.layers.push(htmlLayer)

    this.serviceLayer = new ServiceLayer(this.width, this.height)
  }

  start() {
    // add all layers
    this.layers.forEach((layer: Layer) => {
      this.element.appendChild(layer.getElement())
    })

    this.initServiceLayer()

    this.needsRedraw = true
    this.draw()
    return this.element
  }

  initServiceLayer() {
    // add service layer
    this.element.appendChild(this.serviceLayer.getElement())

    //add event listeners
    this.serviceLayer.addListener('zoom', this.handleZoomAndPosition)
    this.serviceLayer.addListener('dragPanno', this.handleZoomAndPosition)
  }

  handleZoomAndPosition = ({ zoomFactor, offsetX, offsetY }: ViewPosition) => {
    this.zoomFactor = zoomFactor
    this.offsetX = offsetX
    this.offsetY = offsetY

    this.needsRedraw = true
  }

  ////
  addComponent(component: Component) {
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
    this.serviceLayer.addComponent(component)
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
    // draw if need service borders
    this.serviceLayer.draw() // TODO optimize it

    // Request the next frame
    requestAnimationFrame(this.draw.bind(this))
  }
}

export default ViewMultilayer
