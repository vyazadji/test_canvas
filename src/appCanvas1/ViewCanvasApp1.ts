// import type { Component } from './../type'

import ComponentClass from './Component'

/**
 * Canvas layer
 */
class ViewCanvasApp1 {
  height: number
  width: number
  canvasEl: HTMLCanvasElement
  context: CanvasRenderingContext2D
  components: ComponentClass[]

  constructor(height: number, width: number) {
    this.components = []
    this.width = width
    this.height = height

    this.canvasEl = document.createElement('canvas')
    this.canvasEl.width = this.width
    this.canvasEl.height = this.height
    this.canvasEl.style.border = '1px solid blue'

    this.context = this.canvasEl.getContext('2d') as CanvasRenderingContext2D
  }

  getContext(): CanvasRenderingContext2D {
    return this.context
  }

  addComponent(component: ComponentClass) {
    this.components.push(component)
  }

  start() {
    // clear all
    this.context.clearRect(0, 0, this.width, this.height)

    this.components.forEach((component) => {
      component.draw(0)
    })
    return this.canvasEl
  }
}

export default ViewCanvasApp1
