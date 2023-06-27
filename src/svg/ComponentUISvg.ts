import { random } from 'lodash'

import type { ComponentUI } from './../type'
import { getRandomColor } from './../utils/colors'
import { COMPONENT_HEIGHT, COMPONENT_WIDTH, VIEW_HEIGHT, VIEW_WIDTH } from './../consts'

const randomStr = (number: number): string => random(number).toString()

const SVGNS = 'http://www.w3.org/2000/svg'
/**
 * UI SVG implementation of component
 * Use in both HTML and SVG layers
 */
class ComponentUISvgClass implements ComponentUI {
  containerEl: SVGElement
  textEl: SVGElement

  /**
   * @countElements number - count of elements generated inside this component
   * @baseElement string - in HTML view we use "svg" component in SVG layout we use "g"
   */
  constructor(countElements: number, baseElement = 'svg') {
    const svg = document.createElementNS(SVGNS, baseElement)
    svg.setAttribute('width', COMPONENT_WIDTH.toString())
    svg.setAttribute('height', COMPONENT_HEIGHT.toString())

    // set random positin for <g>
    if (baseElement === 'g') {
      // Set the transform attribute to move the group to a random position
      svg.setAttribute(
        'transform',
        `translate(${randomStr(VIEW_WIDTH - COMPONENT_WIDTH)}, ${randomStr(VIEW_HEIGHT - COMPONENT_HEIGHT)})`
      )
      // Note <g> doesn't support border
    }
    this.containerEl = svg

    const elements = this.getRandomSVGElements(countElements)

    this.textEl = elements[0] // text element is always the first

    elements.reverse().forEach((el) => {
      svg.appendChild(el)
    })
  }

  getElement(): SVGElement {
    return this.containerEl
  }

  /**
   * Return random svg elements. The first element is always "text"
   */
  private getRandomSVGElements(countElements: number): SVGElement[] {
    const elements = [
      (): SVGElement => {
        const text = document.createElementNS(SVGNS, 'text')
        text.setAttribute('x', randomStr(COMPONENT_WIDTH - 10))
        text.setAttribute('y', randomStr(COMPONENT_HEIGHT - 10))
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
        line.setAttribute('x1', randomStr(COMPONENT_WIDTH))
        line.setAttribute('y1', randomStr(COMPONENT_HEIGHT))
        line.setAttribute('x2', randomStr(COMPONENT_WIDTH))
        line.setAttribute('y2', randomStr(COMPONENT_HEIGHT))
        line.setAttribute('stroke-width', randomStr(4))
        line.setAttribute('stroke', getRandomColor())
        return line
      },
      (): SVGElement => {
        const circle = document.createElementNS(SVGNS, 'circle')
        circle.setAttribute('cx', randomStr(COMPONENT_WIDTH - 10))
        circle.setAttribute('cy', randomStr(COMPONENT_HEIGHT - 10))
        circle.setAttribute('r', randomStr(COMPONENT_HEIGHT / 2))
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
