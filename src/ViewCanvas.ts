import type { Component } from './type'
import ComponentUIRawCanvasClass from './ComponentUIRawCanvas'

import { COMPONENT_HEIGHT, COMPONENT_WIDTH } from './consts'

/**
 * Canvas layer
 */
class ViewCanvasDashboard {
  height: number
  width: number
  containerEl: HTMLCanvasElement
  context: CanvasRenderingContext2D
  components: Component[]

  constructor(height: number, width: number) {
    this.components = []
    this.width = width
    this.height = height

    this.containerEl = document.createElement('canvas')
    this.context = this.containerEl.getContext('2d') as CanvasRenderingContext2D
    this.containerEl.width = this.width
    this.containerEl.height = this.height

    this.containerEl.style.border = '1px solid red'
  }

  getContext(): CanvasRenderingContext2D {
    return this.context
  }

  addComponent(component: Component) {
    this.components.push(component)
  }

  start() {
    // clear
    this.context.clearRect(0, 0, this.width, this.height)

    this.components.forEach((component) => {
      component.draw(0)
    })

    // new Draggable(this.containerEl)
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
    let movedComponents = this.components
    if (movedComponentsCount !== 0) {
      // 0 - means all components
      movedComponents = this.components.slice(0, movedComponentsCount)
    }
    movedComponents.forEach((component) => {
      const el = component.getUIElement() as ComponentUIRawCanvasClass
      // randomly choose moving directions
      const x = Math.random() < 0.5 ? -1 : 1
      const y = Math.random() < 0.5 ? -1 : 1
      // 0 - not move
      // -1 move left or top
      // 1 move right or bottom
      el.directionX = x // 0 means it will not move left-right
      el.directionY = y // 0 means not move top-bottom
      this.moveElement(el)
    })
  }

  /**
   * This function change position of one element
   * We calculate the next position base on direction x and y
   */
  moveElement(el: ComponentUIRawCanvasClass) {
    // current position
    const left = el.x
    const top = el.y

    // detect direction

    // X direction
    if (left > this.width - COMPONENT_WIDTH) {
      // right border -> move element to the left
      const new_direction_x = -1
      el.directionX = new_direction_x
    } else if (left < 1) {
      // left border -> move element to the right
      const new_direction_x = 1
      el.directionX = new_direction_x
    }

    const direction_x = el.directionX

    // Y direction
    if (top > this.height - COMPONENT_HEIGHT) {
      // bottom border -> move element to the top
      const new_direction_y = -1
      el.directionY = new_direction_y
    } else if (top < 1) {
      // top border -> move element to the bottom
      const new_direction_y = 1
      el.directionY = new_direction_y
    }

    const direction_y = el.directionY

    const leftNew = left + 1 * direction_x
    const topNew = top + 1 * direction_y

    // canvas way how to change position

    el.move(leftNew, topNew)

    requestAnimationFrame(() => this.moveElement(el)) // Continue moving element in the next frame
  }
}

export default ViewCanvasDashboard
