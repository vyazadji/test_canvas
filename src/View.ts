import Draggable from './utils/Dragable'

import type { Component } from './type'

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

  private getComponentWrapper(positionNumber: number): HTMLElement {
    const componentDomWrapper = document.createElement('div')
    componentDomWrapper.style.border = '1px solid green'
    componentDomWrapper.style.height = '50px'
    componentDomWrapper.style.width = '50px'
    componentDomWrapper.style.position = 'absolute'
    componentDomWrapper.style.left = positionNumber * 50 + 'px'

    return componentDomWrapper
  }

  start() {
    this.containerEl.innerHTML = ''
    for (let index = 0; index < this.components.length; index++) {
      const componentElement = this.components[index].getUIElement()
      const wrapperEl = this.getComponentWrapper(index)
      wrapperEl.appendChild(componentElement)
      this.containerEl.appendChild(wrapperEl)
    }

    new Draggable(this.containerEl)
    return this.containerEl
  }
}

export default ViewDashboard
