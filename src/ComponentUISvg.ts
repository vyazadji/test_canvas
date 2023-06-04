import { ComponentUI } from './type'

const SVGNS = 'http://www.w3.org/2000/svg'
// UI SVG implementation of component
class ComponentUISvgClass implements ComponentUI {
  containerEl: HTMLElement
  textEl: SVGElement

  constructor(countElements: number) {
    this.containerEl = document.createElement('div')

    const svg = document.createElementNS(SVGNS, 'svg')
    svg.setAttribute('width', '50')
    svg.setAttribute('height', '50')

    const elements = this.getRandomSVGElements(countElements)
    console.log('pelements', countElements, elements)

    this.textEl = elements[0]

    elements.reverse().forEach((el) => {
      svg.appendChild(el)
    })

    // Create a line element

    this.containerEl.appendChild(svg)
  }

  getElement(): HTMLElement {
    return this.containerEl
  }

  /**
   * Return random svg elements. The first element is always "text"
   */
  private getRandomSVGElements(countElements: number): SVGElement[] {
    const elements = [
      (): SVGElement => {
        const text = document.createElementNS(SVGNS, 'text')
        text.setAttribute('x', '20')
        text.setAttribute('y', '20')
        text.textContent = '[...]'
        return text
      },
      (): SVGElement => {
        const rect = document.createElementNS(SVGNS, 'rect')
        rect.setAttribute('x', '10')
        rect.setAttribute('y', '10')
        rect.setAttribute('width', '30')
        rect.setAttribute('height', '30')
        rect.setAttribute('fill', 'blue')
        return rect
      },
      (): SVGElement => {
        const path = document.createElementNS(SVGNS, 'path')
        path.setAttribute('d', 'M15 0 L25 200 L225 200 Z')
        path.setAttribute('fill', 'green')
        return path
      },
      (): SVGElement => {
        const line = document.createElementNS(SVGNS, 'line')
        line.setAttribute('x1', '20')
        line.setAttribute('y1', '20')
        line.setAttribute('x2', '50')
        line.setAttribute('y2', '50')
        line.setAttribute('stroke', 'black')
        return line
      },
      (): SVGElement => {
        const circle = document.createElementNS(SVGNS, 'circle')
        circle.setAttribute('cx', '25')
        circle.setAttribute('cy', '25')
        circle.setAttribute('r', '20')
        circle.setAttribute('fill', 'red')
        return circle
      },
    ]

    const items = []
    for (let index = 0; index < countElements; index++) {
      if (index === 0) {
        items.push(elements[0]())
      } else {
        const randomNumber = Math.floor(Math.random() * elements.length)
        items.push(elements[randomNumber]())
      }
    }

    return items
  }

  // html implementation of component
  draw(data: number) {
    this.textEl.textContent = data.toString()
  }
}

export default ComponentUISvgClass
