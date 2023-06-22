import { random } from 'lodash'
import { fabric } from 'fabric'

import { getRandomColor } from './utils/colors'
import { ComponentUI } from './type'

import { COMPONENT_HEIGHT, COMPONENT_WIDTH, VIEW_HEIGHT, VIEW_WIDTH } from './consts'

const figureTemplates = [
  {
    // filled rect
    getFigure: (x: number, y: number): fabric.Rect => {
      return new fabric.Rect({
        left: x,
        top: y,
        fill: getRandomColor(),
        width: random(10, COMPONENT_WIDTH),
        height: random(10, COMPONENT_HEIGHT),
      })
    },
  },
  {
    //Filled Circle
    getFigure: (x: number, y: number): fabric.Circle => {
      return new fabric.Circle({
        left: x,
        top: y,
        fill: getRandomColor(),
        radius: random(COMPONENT_HEIGHT / 2),
      })
    },
  },
  {
    //Filled Triangle
    getFigure: (x: number, y: number): fabric.Object => {
      return new fabric.Triangle({
        left: x,
        top: y,
        fill: getRandomColor(),
        width: random(10, COMPONENT_WIDTH),
        height: random(10, COMPONENT_HEIGHT),
      })
    },
  },
  {
    //Filled Line
    getFigure: (x: number, y: number): fabric.Object => {
      return new fabric.Line([x, y, x + random(COMPONENT_HEIGHT), y + random(COMPONENT_WIDTH)], {
        stroke: getRandomColor(),
        strokeWidth: random(1, 10),
      })
    },
  },
]

// UI Fabric UI component implementation for Canvas Fabric view
class ComponentUICanvasFabricClass implements ComponentUI {
  private canvas: fabric.Canvas
  private figure: fabric.Object
  private text: fabric.Text
  x: number
  y: number

  constructor(canvas: fabric.Canvas) {
    this.canvas = canvas

    // init position
    this.x = random(VIEW_WIDTH - COMPONENT_WIDTH)
    this.y = random(VIEW_HEIGHT - COMPONENT_HEIGHT)

    const figureNumber = random(figureTemplates.length - 1)

    this.text = new fabric.Text('...', { left: this.x + 20, top: this.y + 20 })
    this.figure = figureTemplates[figureNumber].getFigure(this.x, this.y)
    this.canvas.add(this.figure)
    this.canvas.add(this.text)
  }

  draw(number: number) {
    this.text.set({ text: number.toString() })
    // TODO On component's level redraw all canvas isn't efficient.
    // Need to do it on view level. But it doesn't cover by the current architecture
    // this.canvas.renderAll()
  }

  getElement() {
    return this.figure
  }
}

export default ComponentUICanvasFabricClass
