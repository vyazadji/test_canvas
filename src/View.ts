import type { Component } from './type'

class ViewDashboard {
  // appElement: HTMLElement
  height: number
  width: number
  domElement: HTMLElement
  components: Component[]

  constructor(height: number, width: number) {
    this.components = []
    this.height = height
    this.width = width

    const domElement = document.createElement('div')
    domElement.style.border = '1px solid red'
    domElement.style.height = height + 'px'
    domElement.style.width = width + 'px'

    this.domElement = domElement
  }

  addComponent(component: Component) {
    this.components.push(component)
  }

  private getComponentWrapper(): HTMLElement {
    const componentDomWrapper = document.createElement('div')
    componentDomWrapper.style.border = '1px solid green'
    componentDomWrapper.style.height = '200px'
    componentDomWrapper.style.width = '200px'

    return componentDomWrapper
  }

  start() {
    this.domElement.innerHTML = ''
    for (let index = 0; index < this.components.length; index++) {
      const componentElement = this.components[index].getUIElement()
      const wrapperElement = this.getComponentWrapper()
      wrapperElement.appendChild(componentElement)
      this.domElement.appendChild(wrapperElement)
    }

    return this.domElement
  }
}

export default ViewDashboard
