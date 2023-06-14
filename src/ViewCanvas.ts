import type { Component } from './type'
import ComponentUIRawCanvasClass from './ComponentUIRawCanvas'
import PositionManager from './PositionManager'

/**
 * Canvas layer
 */
class ViewCanvasDashboard {
  height: number
  width: number
  containerEl: HTMLCanvasElement
  context: CanvasRenderingContext2D
  components: Component[]
  movedComponents: Component[]
  positionManager: PositionManager

  constructor(height: number, width: number) {
    this.components = []
    this.width = width
    this.height = height

    this.movedComponents = []
    this.positionManager = new PositionManager({
      viewWidth: this.width,
      viewHeight: this.height,
    })

    this.containerEl = document.createElement('canvas')
    this.containerEl.width = this.width
    this.containerEl.height = this.height
    this.containerEl.style.border = '1px solid red'

    this.context = this.containerEl.getContext('2d') as CanvasRenderingContext2D
  }

  getContext(): CanvasRenderingContext2D {
    return this.context
  }

  addComponent(component: Component) {
    this.components.push(component)
  }

  start() {
    // clear all
    this.context.clearRect(0, 0, this.width, this.height)

    this.components.forEach((component) => {
      component.draw(0)
    })

    this.updateComponentsCount()

    return this.containerEl
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
      const el = component.getUIElement() as ComponentUIRawCanvasClass

      this.positionManager.addPosition(el.x, el.y)
    })

    this.moveElements()
  }

  moveElements() {
    for (let i = 0; i < this.movedComponents.length; i++) {
      // update position
      this.positionManager.calculateNextPosition(i)

      // set new position
      const el = this.movedComponents[i].getUIElement() as ComponentUIRawCanvasClass
      const x = this.positionManager.positions[i].x
      const y = this.positionManager.positions[i].y
      el.move(x, y)
    }

    requestAnimationFrame(() => this.moveElements()) // Continue moving element in the next frame
  }
}

export default ViewCanvasDashboard
