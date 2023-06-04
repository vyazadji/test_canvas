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

  constructor(height: number, width: number) {
    this.components = []
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
    componentDomWrapper.style.border = '1px solid green'

    componentDomWrapper.style.height = COMPONENT_HEIGHT + 'px'
    componentDomWrapper.style.width = COMPONENT_WIDTH + 'px'

    componentDomWrapper.style.position = 'absolute'

    componentDomWrapper.style.top = random(this.height - COMPONENT_HEIGHT) + 'px'
    componentDomWrapper.style.left = random(this.width - COMPONENT_WIDTH) + 'px'

    return componentDomWrapper
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
