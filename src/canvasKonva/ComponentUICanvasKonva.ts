import Konva from 'konva'
import { random } from 'lodash'

import { getRandomColor } from './../utils/colors'
import { ComponentUI } from './../type'

import { COMPONENT_HEIGHT, COMPONENT_WIDTH, VIEW_HEIGHT, VIEW_WIDTH } from './../consts'

const figureTemplates = [
  {
    // filled rect
    getFigure: (x: number, y: number, width: number, height: number): Konva.Shape => {
      return new Konva.Rect({
        left: x,
        top: y,
        fill: getRandomColor(),
        width,
        height,
      })
    },
  },
  {
    //Filled Circle
    getFigure: (x: number, y: number, width: number, height: number): Konva.Shape => {
      const circle = new Konva.Circle({
        x,
        y,
        radius: (width + height) / 2 / 2,
        fill: getRandomColor(),
        draggable: true,
      })
      return circle
    },
  },
  {
    //Filled Triangle
    getFigure: (x: number, y: number, width: number, height: number): Konva.Shape => {
      const triangle = new Konva.Line({
        x,
        y,
        points: [0, 0, width, 0, height, width, 0, 0],
        fill: getRandomColor(),
        closed: true,
        draggable: true,
      })
      return triangle
    },
  },
]

// UI Konva UI component implementation for Canvas Konva view
class ComponentUICanvasKonvaClass implements ComponentUI {
  x: number
  y: number
  private layer: Konva.Layer
  group: Konva.Group
  text: Konva.Text

  constructor(canvas: Konva.Layer) {
    this.layer = canvas

    // init position
    this.x = random(VIEW_WIDTH - COMPONENT_WIDTH)
    this.y = random(VIEW_HEIGHT - COMPONENT_HEIGHT)

    // random dimensions
    const width = random(2, COMPONENT_WIDTH)
    const height = random(2, COMPONENT_HEIGHT)

    const figureNumber = random(figureTemplates.length - 1)

    const figure = figureTemplates[figureNumber].getFigure(0, 0, width, height)

    this.group = new Konva.Group({
      x: this.x,
      y: this.y,
      draggable: true,
    })

    this.text = new Konva.Text({
      x: 20,
      y: 20,
      text: '..',
      fontSize: 30,
      fill: getRandomColor(),
    })

    this.group.add(figure)
    this.group.add(this.text)

    this.layer.add(this.group)
  }

  draw(number: number) {
    this.text.text(number.toString())
  }

  getElement() {
    return this
  }

  move(leftNew: number, topNew: number) {
    this.group.position({ x: leftNew, y: topNew })
  }
}

export default ComponentUICanvasKonvaClass
