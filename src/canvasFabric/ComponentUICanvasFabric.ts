import { random } from 'lodash'
import { fabric } from 'fabric'

import { getRandomColor } from './../utils/colors'
import { ComponentUI } from './../type'

import { COMPONENT_HEIGHT, COMPONENT_WIDTH, VIEW_HEIGHT, VIEW_WIDTH } from './../consts'

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
  private group: fabric.Group
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
    const figure2 = figureTemplates[random(figureTemplates.length - 1)].getFigure(this.x + 10, this.y + 10)
    const figure3 = figureTemplates[random(figureTemplates.length - 1)].getFigure(this.x + 30, this.y + 30)
    const figure4 = figureTemplates[random(figureTemplates.length - 1)].getFigure(this.x + 30, this.y + 20)
    const figure5 = figureTemplates[random(figureTemplates.length - 1)].getFigure(this.x, this.y + 30)
    const figure6 = figureTemplates[random(figureTemplates.length - 1)].getFigure(this.x + 10, this.y + 20)
    const figure7 = figureTemplates[random(figureTemplates.length - 1)].getFigure(this.x, this.y + 15)
    const figure8 = figureTemplates[random(figureTemplates.length - 1)].getFigure(this.x + 15, this.y)
    // this.text.set('objectCaching', false) // increase FPS but decrease the time of creation
    // this.figure.set('objectCaching', false)

    this.group = new fabric.Group(
      [this.figure, figure2, figure3, figure4, figure5, figure6, figure7, figure8, this.text],
      // [this.figure, /* figure2, figure3, figure4, figure5, figure6, figure7, figure8, */ this.text],
      {
        left: this.x,
        top: this.y,
        // objectCaching: false,
      }
    )
    this.canvas.add(this.group)
  }

  draw(number: number) {
    this.text.set({ text: number.toString() })
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

export default ComponentUICanvasFabricClass
