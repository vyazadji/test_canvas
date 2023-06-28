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
  private layer: Konva.Layer
  x: number
  y: number

  constructor(canvas: Konva.Layer) {
    this.layer = canvas

    // init position
    this.x = random(VIEW_WIDTH - COMPONENT_WIDTH)
    this.y = random(VIEW_HEIGHT - COMPONENT_HEIGHT)

    // random dimensions
    const width = random(2, COMPONENT_WIDTH)
    const height = random(2, COMPONENT_HEIGHT)

    const figureNumber = random(figureTemplates.length - 1)

    const figure = figureTemplates[figureNumber].getFigure(this.x, this.y, width, height)

    this.layer.add(figure)
  }

  draw(number: number) {
    // this.text.set({ text: number.toString() })
    // TODO On component's level redraw all canvas isn't efficient.
    // Need to do it on view level. But it doesn't cover by the current architecture
    // this.canvas.renderAll()
  }

  getElement() {
    return this
  }

  move(leftNew: number, topNew: number) {
    this.group.set({ left: leftNew, top: topNew })
    // this.figure.set({ left: leftNew, top: topNew })
    // this.text.set({ left: leftNew + 20, top: topNew + 20 })
  }
}

export default ComponentUICanvasKonvaClass
