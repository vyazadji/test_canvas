// import { View } from './type'
import type { Component } from './type'

class ViewDashboard {
  // appElement: HTMLElement
  height: number
  width: number
  div: string
  components: Component[]

  constructor(height: number, width: number) {
    this.components = []
    this.height = height
    this.width = width
    this.div = `<div>View</div><div style="height: ${height}px; width: ${width}px; border: 1px solid red">`
  }

  addComponent(component: Component) {
    this.components.push(component)
    // this.div = this.div + component.draw()
  }

  start() {
    this.div = this.div + this.components[0].draw(1)
    return this.div + '</div>'
  }
}

export default ViewDashboard
