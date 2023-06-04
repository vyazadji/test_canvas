import { random } from 'lodash'

import type { ComponentUI } from './type'
import { getRandomColor } from './utils/colors'

const randomStr = (number: number): string => random(number).toString()

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
        text.setAttribute('x', randomStr(40))
        text.setAttribute('y', randomStr(40))
        text.textContent = '[...]'
        return text
      },
      (): SVGElement => {
        const rect = document.createElementNS(SVGNS, 'rect')
        rect.setAttribute('x', randomStr(30))
        rect.setAttribute('y', randomStr(30))
        rect.setAttribute('width', randomStr(40))
        rect.setAttribute('height', randomStr(40))
        rect.setAttribute('fill', getRandomColor())
        return rect
      },
      (): SVGElement => {
        const path = document.createElementNS(SVGNS, 'path')
        path.setAttribute('d', `M${random(10)} 0 L${random(50)} ${random(50)} L${random(49)} ${random(50)} Z`)
        path.setAttribute('fill', getRandomColor())
        return path
      },
      (): SVGElement => {
        const line = document.createElementNS(SVGNS, 'line')
        line.setAttribute('x1', randomStr(50))
        line.setAttribute('y1', randomStr(50))
        line.setAttribute('x2', randomStr(50))
        line.setAttribute('y2', randomStr(50))
        line.setAttribute('stroke-width', randomStr(4))
        line.setAttribute('stroke', getRandomColor())
        return line
      },
      (): SVGElement => {
        const circle = document.createElementNS(SVGNS, 'circle')
        circle.setAttribute('cx', randomStr(30))
        circle.setAttribute('cy', randomStr(30))
        circle.setAttribute('r', randomStr(25))
        circle.setAttribute('fill', getRandomColor())
        return circle
      },
    ]

    const items = []
    for (let index = 0; index < countElements; index++) {
      if (index === 0) {
        items.push(elements[0]())
      } else {
        items.push(elements[random(elements.length - 1)]())
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
