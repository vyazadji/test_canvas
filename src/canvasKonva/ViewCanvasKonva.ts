import Konva from 'konva'

import type { Component } from './../type'
import PositionManager from './../utils/PositionManager'
import ComponentUICanvasKonvaClass from './ComponentUICanvasKonva'

/**
 * Canvas layer
 */
class ViewCanvasKonvaDashboard {
  height: number
  width: number
  layer: Konva.Layer

  components: Component[]
  movedComponents: Component[]
  positionManager: PositionManager

  constructor(height: number, width: number, appElement: HTMLDivElement) {
    this.components = []
    this.width = width
    this.height = height

    this.movedComponents = []
    this.positionManager = new PositionManager({
      viewWidth: this.width,
      viewHeight: this.height,
    })

    const stage = new Konva.Stage({
      container: appElement,
      width: this.width,
      height: this.height,
    })

    // then create layer
    this.layer = new Konva.Layer()

    stage.add(this.layer)
  }

  getLayer(): Konva.Layer {
    return this.layer
  }

  addComponent(component: Component) {
    this.components.push(component)
  }

  start() {
    // clear all
    // this.canvas.clearContext()

    this.components.forEach((component) => {
      component.draw(0)
    })

    // this.canvas.renderAll()

    this.updateComponentsCount()

    return undefined
  }

  updateComponentsCount() {
    const countEl = document.getElementById('componentCount') as HTMLElement
    countEl.innerText = this.components.length.toString()
  }

  /**
   * Start move test
   * All components be moved progrmatically
   */
  moveTest(movedComponentsCount = 0) {
    this.movedComponents = this.components
    if (movedComponentsCount !== 0) {
      // 0 - means all components
      this.movedComponents = this.components.slice(0, movedComponentsCount)
    }
    this.movedComponents.forEach((component) => {
      const el = component.getUIElement() as ComponentUICanvasKonvaClass

      this.positionManager.addPosition(el.x, el.y)
    })

    this.moveElements()
  }

  moveElements() {
    for (let i = 0; i < this.movedComponents.length; i++) {
      // update position
      const [x, y] = this.positionManager.calculateNextPosition(i)

      // set new position
      const el = this.movedComponents[i].getUIElement() as ComponentUICanvasKonvaClass
      el.move(x, y)
    }

    this.canvas.renderAll()

    requestAnimationFrame(() => this.moveElements()) // Continue moving element in the next frame
  }

  zoomTransform(zoom: number): void {
    this.containerEl.style.transform = `scale(${zoom})`
  }

  zoomCanvasFabric(zoom: number): void {
    this.canvas.zoomToPoint({ x: this.width / 2, y: this.height / 2 }, zoom)
  }
}

export default ViewCanvasKonvaDashboard
