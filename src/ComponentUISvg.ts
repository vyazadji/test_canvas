import { ComponentUI } from './type'

// UI HTML implementation of component
class ComponentUISvgClass implements ComponentUI {
  containerEl: HTMLElement

  constructor() {
    this.containerEl = document.createElement('div')

    const svgns = 'http://www.w3.org/2000/svg'

    const svg = document.createElementNS(svgns, 'svg')
    svg.setAttribute('width', '50')
    svg.setAttribute('height', '50')

    // Create a line element
    const line = document.createElementNS(svgns, 'line')
    line.setAttribute('x1', '20')
    line.setAttribute('y1', '20')
    line.setAttribute('x2', '50')
    line.setAttribute('y2', '50')
    line.setAttribute('stroke', 'black')
    svg.appendChild(line)

    this.containerEl.appendChild(svg)
  }

  getElement(): HTMLElement {
    return this.containerEl
  }

  // html implementation of component
  draw(data: number) {
    // this.containerEl.textContent = data.toString()
  }
}

export default ComponentUISvgClass
