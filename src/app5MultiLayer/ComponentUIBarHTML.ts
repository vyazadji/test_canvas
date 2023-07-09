// import { COMPONENT_HEIGHT, COMPONENT_WIDTH } from './../consts'

import type { ComponentUI } from './types'
import { getRandomColor } from '../utils/colors'

/**
 * UI Canvas implementation of Bar component.
 * It contains raw Canvas elements
 */
class ComponentUIBarHTML implements ComponentUI {
  private layerElement: HTMLElement
  x: number
  y: number
  data: number
  barColor: string

  width: number
  height: number

  containerEl: HTMLElement

  constructor(layerElement: HTMLElement, x: number, y: number) {
    this.layerElement = layerElement

    this.data = 0

    this.width = 10 // TODO where to set it?
    this.height = 10

    this.barColor = getRandomColor()
    // init position
    this.x = x
    this.y = y

    // const width = 6
    // const height = 9
    // const barValueWidth = width - 2
    // const barValueHeight = Math.round((height * data) / 100)

    // bar component
    this.containerEl = document.createElement('div')
    this.containerEl.style.width = this.width + 'px'
    this.containerEl.style.height = this.height + 'px'
    this.containerEl.style.position = 'absolute'
    this.containerEl.style.left = this.x + 'px'
    this.containerEl.style.top = this.y + 'px'
    this.containerEl.style.fontSize = '4px'
    this.containerEl.style.backgroundColor = 'orange'

    const textEl = document.createTextNode('[...]')
    this.containerEl.appendChild(textEl)

    this.layerElement.appendChild(this.containerEl)
  }

  /**
   * Draw the component
   */
  draw(x: number, y: number, data: number, index?: number) {
    this.data = data
    // this.context.clearRect(this.x, this.y, COMPONENT_WIDTH, COMPONENT_HEIGHT)

    this.x = x
    this.y = y

    // this.context.fillStyle = 'green'
    // this.context.fillRect(this.x, this.y, width, height)

    //circle example
    // this.context.beginPath()
    // this.context.arc(x + 3, y + 3, 2, 0, Math.PI * 2, true)
    // this.context.stroke()

    // bar value
    // this.context.fillStyle = this.barColor
    // this.context.fillRect(this.x + 1, this.y + (height - barValueHeight), barValueWidth, barValueHeight)

    //

    // text
    if (index !== undefined) {
      // the last node must be the text node with datasource value
      const lastNode = this.containerEl.childNodes[this.containerEl.childNodes.length - 1]
      if (lastNode.nodeType === Node.TEXT_NODE) {
        lastNode.textContent = data.toString()
      }
      // this.context.font = '3px Arial'
      // this.context.fillText(index.toString(), this.x, this.y + height) // adjust position as needed
    }
  }
}

export default ComponentUIBarHTML
