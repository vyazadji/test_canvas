import { random } from 'lodash'
import { fabric } from 'fabric'

import { getRandomColor } from './utils/colors'
import { ComponentUI } from './type'

import { COMPONENT_HEIGHT, COMPONENT_WIDTH } from './consts'

// UI Fabric UI component implementation for Canvas Fabric view
class ComponentUICanvasFabricClass implements ComponentUI {
  private canvas: fabric.Canvas
  private element: fabric.Rect

  constructor(canvas: fabric.Canvas) {
    this.canvas = canvas

    const rect = new fabric.Rect({
      left: random(750), // TODO set depends on view size
      top: random(750), // TODO set depends on view size
      fill: getRandomColor(),
      width: COMPONENT_WIDTH,
      height: COMPONENT_HEIGHT,
    })

    this.element = rect
  }

  draw(number: number) {
    console.log('draw canvas UI. // TODO number', number)

    this.canvas.add(this.element)
  }

  getElement() {
    return this.element
  }
}

export default ComponentUICanvasFabricClass
