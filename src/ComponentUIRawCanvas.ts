import { random } from 'lodash'

import { ComponentUI } from './type'
import { COMPONENT_HEIGHT, COMPONENT_WIDTH, VIEW_HEIGHT, VIEW_WIDTH } from './consts'
import { getRandomColor } from './utils/colors'

const figureTemplates = [
  {
    // filled rect
    getFigure: (
      context: CanvasRenderingContext2D,
      backgroundColor: string,
      x: number,
      y: number,
      randomX: number,
      randomY: number
    ): void => {
      context.fillStyle = backgroundColor
      context.fillRect(x, y, randomX, randomY)
    },
  },
  {
    //Filled triangle
    getFigure: (
      context: CanvasRenderingContext2D,
      backgroundColor: string,
      x: number,
      y: number,
      randomX: number,
      randomY: number
    ): void => {
      const randomX2 = randomX / 2
      const randomY2 = randomY / 2
      context.fillStyle = backgroundColor
      context.beginPath()
      context.moveTo(x + randomX2, y + randomY2)
      context.lineTo(x + randomX2 + 20, y + randomY2)
      context.lineTo(x + randomX2, y + randomY2 + 20)
      context.fill()
    },
  },
  {
    //circle
    getFigure: (
      context: CanvasRenderingContext2D,
      _backgroundColor: string,
      x: number,
      y: number,
      randomX: number,
      randomY: number
    ): void => {
      const randomX2 = randomX / 2
      const randomY2 = randomY / 2
      context.beginPath()
      context.arc(x + randomX2, y + randomY2, randomX2, 0, Math.PI * 2, true)
      context.stroke()
    },
  },
]

/**
 * UI Canvas implementation of component.
 * It contains raw Canvas elements
 * Use in Canvas view
 */
class ComponentUIRawCanvasClass implements ComponentUI {
  private context: CanvasRenderingContext2D
  x: number
  y: number
  dataSourceNumber: number
  backgroundColor: string
  randomX: number
  randomY: number
  figure: number

  constructor(context: CanvasRenderingContext2D) {
    this.context = context
    this.dataSourceNumber = 0
    this.backgroundColor = getRandomColor()

    // init position
    this.x = random(VIEW_WIDTH - COMPONENT_WIDTH)
    this.y = random(VIEW_HEIGHT - COMPONENT_HEIGHT)

    // random position for figure inside component
    this.randomX = random(COMPONENT_WIDTH)
    this.randomY = random(COMPONENT_HEIGHT)

    this.figure = random(figureTemplates.length - 1)
  }

  draw(number: number) {
    this.dataSourceNumber = number
    this.context.clearRect(this.x, this.y, COMPONENT_WIDTH, COMPONENT_HEIGHT)

    // Draw some figure
    figureTemplates[this.figure].getFigure(
      this.context,
      this.backgroundColor,
      this.x,
      this.y,
      this.randomX,
      this.randomY
    )

    // Draw the number
    this.context.fillStyle = 'black'
    this.context.font = '18px Arial'
    this.context.fillText(number.toString(), this.x + 5, this.y + 20) // adjust position as needed
  }

  move(leftNew: number, topNew: number) {
    // Clear the previous drawing
    this.context.clearRect(this.x, this.y, COMPONENT_WIDTH, COMPONENT_HEIGHT)

    this.x = leftNew
    this.y = topNew

    this.draw(this.dataSourceNumber)
  }

  getElement() {
    return this
  }
}

export default ComponentUIRawCanvasClass
