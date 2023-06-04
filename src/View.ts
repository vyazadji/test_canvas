import { random } from 'lodash'

import Draggable from './utils/Dragable'

import type { Component } from './type'

const COMPONENT_HEIGHT = 50
const COMPONENT_WIDTH = 50

class ViewDashboard {
  height: number
  width: number
  containerEl: HTMLElement
  components: Component[]
  wrappers: HTMLElement[]

  constructor(height: number, width: number) {
    this.components = []
    this.wrappers = []
    this.height = height
    this.width = width

    const domElement = document.createElement('div')
    domElement.style.border = '1px solid red'
    domElement.style.height = height + 'px'
    domElement.style.width = width + 'px'
    domElement.style.position = 'relative'

    this.containerEl = domElement
  }

  addComponent(component: Component) {
    this.components.push(component)
  }

  private getComponentWrapper(): HTMLElement {
    const componentDomWrapper = document.createElement('div')
    this.wrappers.push(componentDomWrapper)
    componentDomWrapper.style.border = '1px solid green'

    componentDomWrapper.style.height = COMPONENT_HEIGHT + 'px'
    componentDomWrapper.style.width = COMPONENT_WIDTH + 'px'

    componentDomWrapper.style.position = 'absolute'

    componentDomWrapper.style.top = random(this.height - COMPONENT_HEIGHT) + 'px'
    componentDomWrapper.style.left = random(this.width - COMPONENT_WIDTH) + 'px'

    return componentDomWrapper
  }

  /**
   * Start move test
   * All wrappers of elements will be moved progrmatically
   */
  moveTest() {
    this.wrappers.forEach((el) => {
      const x = Math.random() < 0.5 ? -1 : 1
      const y = Math.random() < 0.5 ? -1 : 1
      // 0 - not move
      // -1 move left or top
      // 1 move right or bottom
      el.setAttribute('data-direction-x', x.toString()) // 0 means it will not move left-right
      el.setAttribute('data-direction-y', y.toString()) // 0 means not move top-bottom
      this.moveElement(el)
    })
  }

  /**
   * This function change position of one element
   * We calculate the next position base on direction x and y
   */
  moveElement(el: HTMLElement) {
    // current position
    const left = parseInt(el.style.left, 10)
    const top = parseInt(el.style.top, 10)
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

    el.style.left = leftNew + 'px' // Update element's left position
    el.style.top = topNew + 'px' // Update element's top position

    // if (Number(left) < 100 && Number(top) < 100) {
    // Stop moving when reaching position (100px, 100px)
    requestAnimationFrame(() => this.moveElement(el)) // Continue moving element in the next frame
    // }
  }

  start() {
    this.containerEl.innerHTML = ''
    for (let index = 0; index < this.components.length; index++) {
      const componentElement = this.components[index].getUIElement()
      const wrapperEl = this.getComponentWrapper()
      wrapperEl.appendChild(componentElement)
      this.containerEl.appendChild(wrapperEl)
    }

    new Draggable(this.containerEl)
    this.updateComponentsCount()
    return this.containerEl
  }

  updateComponentsCount() {
    const countEl = document.getElementById('componentCount') as HTMLButtonElement
    countEl.innerText = this.components.length.toString()
  }
}

export default ViewDashboard
