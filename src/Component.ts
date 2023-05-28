import { Component, ComponentUI } from './type'

class ComponentClass implements Component {
  type: string
  // data: number
  componentUI: ComponentUI

  constructor(componentUI: ComponentUI) {
    this.type = 'number'
    this.componentUI = componentUI
  }

  draw(data: number): string {
    return this.componentUI.draw(data)
  }
}

export default ComponentClass
