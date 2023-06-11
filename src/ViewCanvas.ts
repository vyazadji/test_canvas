import type { Component } from './type'

// import { COMPONENT_HEIGHT, COMPONENT_WIDTH } from './consts'

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
  /* moveTest(movedComponentsCount = 0) {
    let movedComponents = this.components
    if (movedComponentsCount !== 0) {
      // 0 - means all components
      movedComponents = this.components.slice(0, movedComponentsCount)
    }
    movedComponents.forEach((component) => {
      const el = component.getUIElement() as SVGElement
      // randomly choose moving directions
      const x = Math.random() < 0.5 ? -1 : 1
      const y = Math.random() < 0.5 ? -1 : 1
      // 0 - not move
      // -1 move left or top
      // 1 move right or bottom
      el.setAttribute('data-direction-x', x.toString()) // 0 means it will not move left-right
      el.setAttribute('data-direction-y', y.toString()) // 0 means not move top-bottom
      this.moveElement(el)
    })
  } */

  /**
   * This function change position of one element
   * We calculate the next position base on direction x and y
   */
  /* moveElement(el: SVGElement) {
    // current position
    const transform = el.getAttribute('transform') as string
    const matches = /translate\((.*?),(.*?)\)/.exec(transform)
    const left = matches ? parseFloat(matches[1]) : 0
    const top = matches ? parseFloat(matches[2]) : 0

    // detect direction

    // X direction
    if (left > this.width - COMPONENT_WIDTH) {
      // right border -> move element to the left
      const new_direction_x = -1
      el.setAttribute('data-direction-x', new_direction_x.toString())
    } else if (left < 1) {
      // left border -> move element to the right
      const new_direction_x = 1
      el.setAttribute('data-direction-x', new_direction_x.toString())
    }

    const direction_x = Number(el.dataset.directionX)

    // Y direction
    if (top > this.height - COMPONENT_HEIGHT) {
      // bottom border -> move element to the top
      const new_direction_y = -1
      el.setAttribute('data-direction-y', new_direction_y.toString())
    } else if (top < 1) {
      // top border -> move element to the bottom
      const new_direction_y = 1
      el.setAttribute('data-direction-y', new_direction_y.toString())
    }

    const direction_y = Number(el.dataset.directionY)

    const leftNew = left + 1 * direction_x
    const topNew = top + 1 * direction_y

    // svg way how to change position
    el.setAttribute('transform', `translate(${leftNew}, ${topNew})`) // Update element's position

    requestAnimationFrame(() => this.moveElement(el)) // Continue moving element in the next frame
  } */
}

export default ViewCanvasDashboard
