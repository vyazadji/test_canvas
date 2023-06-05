import type { Component } from './type'

// import { COMPONENT_HEIGHT, COMPONENT_WIDTH } from './consts'

const SVGNS = 'http://www.w3.org/2000/svg'

/**
 * SVG layer
 */
class ViewSvgDashboard {
  height: number
  width: number
  containerEl: SVGElement
  components: Component[]
  wrappers: HTMLElement[]

  constructor(height: number, width: number) {
    this.components = []
    this.wrappers = []
    this.height = height
    this.width = width

    this.containerEl = document.createElementNS(SVGNS, 'svg')
    this.containerEl.setAttribute('height', this.height.toString())
    this.containerEl.setAttribute('width', this.width.toString())
    this.containerEl.style.border = '1px solid red'
  }

  addComponent(component: Component) {
    this.components.push(component)
  }

  start() {
    this.containerEl.innerHTML = '' // clear
    for (let index = 0; index < this.components.length; index++) {
      const componentElement = this.components[index].getUIElement()
      this.containerEl.appendChild(componentElement)
    }

    // new Draggable(this.containerEl)
    this.updateComponentsCount()

    return this.containerEl
  }

  updateComponentsCount() {
    const countEl = document.getElementById('componentCount') as HTMLButtonElement
    countEl.innerText = this.components.length.toString()
  }
}

export default ViewSvgDashboard
