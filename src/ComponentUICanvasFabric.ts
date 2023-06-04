import { ComponentUI } from './type'
import { fabric } from 'fabric'

import { COMPONENT_HEIGHT, COMPONENT_WIDTH } from './consts'

// UI Fabric Canvas implementation of component
class ComponentUICanvasFabricClass implements ComponentUI {
  private containerEl: HTMLDivElement
  private canvas: fabric.StaticCanvas

  constructor(serializedCanvas: object) {
    this.containerEl = document.createElement('div')
    const canvasEl = document.createElement('canvas')
    canvasEl.height = COMPONENT_HEIGHT
    canvasEl.width = COMPONENT_WIDTH
    this.containerEl.appendChild(canvasEl)

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

  getElement(): HTMLDivElement {
    return this.containerEl
  }
}

export default ComponentUICanvasFabricClass
