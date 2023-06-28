import * as PIXI from 'pixi.js'
import { random } from 'lodash'

import { ComponentUI } from './../type'
import { COMPONENT_HEIGHT, COMPONENT_WIDTH, VIEW_HEIGHT, VIEW_WIDTH } from './../consts'
import { getRandomColor } from './../utils/colors'

const figureTemplates = [
  {
    // filled rect
    getFigure: (graphics: PIXI.Graphics, x: number, y: number, width: number, height: number): void => {
      graphics.lineStyle(2, getRandomColor())
      graphics.beginFill(getRandomColor())
      graphics.drawRect(0, 0, width, height)
      graphics.x = x
      graphics.y = y
      graphics.endFill()
    },
  },
  {
    //Filled triangle
    getFigure: (graphics: PIXI.Graphics, x: number, y: number, width: number, height: number): void => {
      graphics.beginFill(getRandomColor())
      graphics.moveTo(0, 0)
      graphics.lineTo(width, 0)
      graphics.lineTo(1, height)
      graphics.lineTo(0, 0)
      graphics.endFill()
      graphics.x = x
      graphics.y = y
    },
  },
  {
    //circle
    getFigure: (graphics: PIXI.Graphics, x: number, y: number, height: number, _width: number): void => {
      graphics.beginFill(getRandomColor())
      graphics.drawCircle(0, 0, height / 2)
      graphics.endFill()
      graphics.x = x // Note: not necessary when we use grouping by Container
      graphics.y = y
    },
  },
]

/**
 * UI Canvas implementation of component.
 * It contains raw Canvas elements
 * Use in Canvas view
 */
class ComponentUIPixijs implements ComponentUI {
  private context: PIXI.Container<PIXI.DisplayObject>
  x: number
  y: number
  dataSourceNumber: number
  width: number
  height: number
  container: PIXI.Container
  text: PIXI.Text

  constructor(context: PIXI.Container<PIXI.DisplayObject>) {
    this.context = context
    this.dataSourceNumber = 0

    // init position
    this.x = random(VIEW_WIDTH - COMPONENT_WIDTH)
    this.y = random(VIEW_HEIGHT - COMPONENT_HEIGHT)

    // random position for figure inside component
    this.width = random(2, COMPONENT_WIDTH)
    this.height = random(2, COMPONENT_HEIGHT)

    const graphics = new PIXI.Graphics()
    // Draw some figure
    const figureNumber = random(figureTemplates.length - 1)
    figureTemplates[figureNumber].getFigure(graphics, 0, 0, this.width, this.height)

    // Create text
    this.text = new PIXI.Text('22', { fontSize: 24, fill: 'red' })

    this.container = new PIXI.Container()

    this.container.addChild(graphics)
    this.container.addChild(this.text)
    // this.container.cacheAsBitmap = true

    // add in view
    this.context.addChild(this.container)
  }

  draw(number: number) {
    this.dataSourceNumber = number

    this.container.x = this.x
    this.container.y = this.y
  }

  move(leftNew: number, topNew: number) {
    // Clear the previous drawing

    this.x = leftNew
    this.y = topNew

    this.container.x = leftNew
    this.container.y = topNew
    // this.draw(this.dataSourceNumber)
  }

  getElement() {
    return this
  }
}

export default ComponentUIPixijs
