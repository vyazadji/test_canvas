// import { COMPONENT_HEIGHT, COMPONENT_WIDTH } from './../consts'

import type { ComponentUI } from './types'
import { getRandomColor } from '../utils/colors'
import { ELEMENT_HEIGHT, ELEMENT_WIDTH } from './constants'

/**
 * UI Canvas implementation of Bar component.
 * It contains raw Canvas elements
 */
class ComponentUIBarHTML implements ComponentUI {
  private layerElement: HTMLElement
  x: number
  y: number
  data: number

  index: number // for debug

  width: number
  height: number

  containerEl: HTMLElement
  barEl: HTMLElement

  constructor(layerElement: HTMLElement, x: number, y: number, index: number) {
    this.layerElement = layerElement

    this.data = 0
    this.index = index

    this.width = ELEMENT_WIDTH
    this.height = ELEMENT_HEIGHT

    // init position
    this.x = x
    this.y = y

    // view dimensions
    const width = this.width - 4
    const height = this.height - 1

    // bar component
    this.containerEl = document.createElement('div')
    this.containerEl.style.width = width + 'px'
    this.containerEl.style.height = height + 'px'
    this.containerEl.style.position = 'absolute'
    this.containerEl.style.left = this.x + 'px'
    this.containerEl.style.top = this.y + 'px'
    this.containerEl.style.fontSize = '4px'
    this.containerEl.style.backgroundColor = 'orange'

    // revers for bar positions
    this.containerEl.style.display = 'flex'
    this.containerEl.style.flexDirection = 'column-reverse'

    this.barEl = document.createElement('div')
    this.barEl.style.backgroundColor = getRandomColor()
    this.barEl.style.position = 'relative'
    this.barEl.style.left = '1px'
    this.barEl.style.width = width - 2 + 'px'

    this.containerEl.appendChild(this.barEl)

    // const textEl = document.createTextNode(this.index.toString())
    const textEl = document.createElement('div')
    textEl.innerText = index.toString()
    textEl.style.fontSize = '3px'
    textEl.style.lineHeight = '2px'
    textEl.style.position = 'absolute'
    this.containerEl.appendChild(textEl)

    this.layerElement.appendChild(this.containerEl)
  }

  /**
   * Draw the component
   */
  draw(x: number, y: number, data: number) {
    // console.log('draw html component', { x, y })
    if (data !== this.data) {
      this.data = data
      const barValueHeight = Math.round((this.height * data) / 100)
      this.barEl.style.height = barValueHeight + 'px'
    }

    if (x !== this.x || y !== this.y) {
      this.x = x
      this.y = y

      this.containerEl.style.left = this.x + 'px'
      this.containerEl.style.top = this.y + 'px'
    }
  }
}

export default ComponentUIBarHTML
