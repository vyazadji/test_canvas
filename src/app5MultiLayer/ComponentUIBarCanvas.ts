// import { COMPONENT_HEIGHT, COMPONENT_WIDTH } from './../consts'

import type { ComponentUI } from './types'
import { getRandomColor } from '../utils/colors'
import { ELEMENT_HEIGHT, ELEMENT_WIDTH } from './constants'

/**
 * UI Canvas implementation of Bar component.
 * It contains raw Canvas elements
 */
class ComponentUIBarCanvas implements ComponentUI {
  private context: CanvasRenderingContext2D
  x: number
  y: number
  width: number
  height: number
  data: number
  barColor: string

  index: number // for debug

  constructor(context: CanvasRenderingContext2D, index: number) {
    this.context = context
    this.data = 0
    this.index = index

    this.barColor = getRandomColor()
    // init position
    this.x = 0
    this.y = 0

    this.width = ELEMENT_WIDTH
    this.height = ELEMENT_HEIGHT
  }

  /**
   * Draw the component
   */
  draw(x: number, y: number, data: number) {
    this.data = data
    // this.context.clearRect(this.x, this.y, COMPONENT_WIDTH, COMPONENT_HEIGHT)

    this.x = x
    this.y = y

    // view dimensions
    const width = this.width - 4
    const height = this.height - 1

    const barValueWidth = width - 2
    const barValueHeight = Math.round((height * data) / 100)

    // bar component
    this.context.fillStyle = 'green'
    this.context.fillRect(this.x, this.y, width, height)

    //circle example
    this.context.beginPath()
    this.context.arc(x + 3, y + 3, 2, 0, Math.PI * 2, true)
    this.context.stroke()

    // bar value
    this.context.fillStyle = this.barColor
    this.context.fillRect(this.x + 1, this.y + (height - barValueHeight), barValueWidth, barValueHeight)

    //

    // text
    if (this.index !== undefined) {
      this.context.fillStyle = 'black'
      this.context.font = '3px Arial'
      this.context.fillText(this.index.toString(), this.x, this.y + height) // adjust position as needed
    }
  }
}

export default ComponentUIBarCanvas
