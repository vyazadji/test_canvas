import { ComponentUI } from './type'
import { fabric } from 'fabric'

// UI Fabric Canvas implementation of component
class ComponentUICanvasFabricClass implements ComponentUI {
  private containerEl: HTMLDivElement
  private canvas: fabric.StaticCanvas

  constructor(serializedCanvas: object) {
    this.containerEl = document.createElement('div')
    const canvasEl = document.createElement('canvas')
    this.containerEl.appendChild(canvasEl)

    this.canvas = new fabric.StaticCanvas(canvasEl)
    this.canvas.loadFromJSON(serializedCanvas, () => {
      console.log('--loadFromJSON callback: ---')
    })
  }

  draw(number: number) {
    console.log('will drave fabric canvas', number)
  }

  getElement(): HTMLDivElement {
    return this.containerEl
  }
}

export default ComponentUICanvasFabricClass
