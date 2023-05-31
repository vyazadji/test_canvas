import { ComponentUI } from './type'
import { fabric } from 'fabric'

// type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue>

// UI Canvas implementation of component
class ComponentUICanvasFabricClass implements ComponentUI {
  type: string
  private container: HTMLDivElement
  private canvas: fabric.StaticCanvas

  constructor(serializedCanvas: object) {
    this.type = 'number'

    this.container = document.createElement('div')
    const canvasEl = document.createElement('canvas')
    this.container.appendChild(canvasEl)

    this.canvas = new fabric.StaticCanvas(canvasEl)
    this.canvas.loadFromJSON(serializedCanvas, () => {
      console.log('--loadFromJSON callback: ---')
    })
  }

  draw(number: number) {
    console.log('will drave fabric canvas', number)
  }

  getElement(): HTMLDivElement {
    return this.container
  }
}

export default ComponentUICanvasFabricClass
