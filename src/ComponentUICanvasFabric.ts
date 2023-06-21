import { fabric } from 'fabric'

import { ComponentUI } from './type'

import { COMPONENT_HEIGHT, COMPONENT_WIDTH } from './consts'

// UI Fabric UI component implementation for Canvas Fabric view
class ComponentUICanvasFabricClass implements ComponentUI {
  private containerEl: HTMLCanvasElement
  private canvas: fabric.StaticCanvas

  constructor(serializedCanvas: object) {
    const canvasEl = document.createElement('canvas')
    canvasEl.height = COMPONENT_HEIGHT
    canvasEl.width = COMPONENT_WIDTH

    this.containerEl = canvasEl

    this.canvas = new fabric.StaticCanvas(canvasEl)
    this.canvas.loadFromJSON(serializedCanvas, () => {
      // console.log('--loadFromJSON callback: ---')
    })
  }

  draw(number: number) {
    const textObjects = this.canvas.getObjects('text') as fabric.Text[]
    textObjects.forEach((text: fabric.Text) => {
      text.set('text', number.toString())
    })
    this.canvas.renderAll()
  }

  getElement() {
    return this.containerEl
  }
}

export default ComponentUICanvasFabricClass
