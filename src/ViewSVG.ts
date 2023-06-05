import type { Component } from './type'

// import { COMPONENT_HEIGHT, COMPONENT_WIDTH } from './consts'

class ViewSvgDashboard {
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

  start() {
    return this.containerEl
  }

  updateComponentsCount() {
    const countEl = document.getElementById('componentCount') as HTMLButtonElement
    countEl.innerText = this.components.length.toString()
  }
}

export default ViewSvgDashboard
