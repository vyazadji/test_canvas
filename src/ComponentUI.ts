import { ComponentUI } from './type'

// UI HTML implementation of component
class ComponentUIClass implements ComponentUI {
  type: string
  domElement: HTMLElement

  constructor() {
    this.type = 'number'

    this.domElement = document.createElement('div')
    this.domElement.textContent = '[init ui component ...]'
  }

  getElement(): HTMLElement {
    return this.domElement
  }

  // html implementation of component
  draw(data: number) {
    this.domElement.textContent = data.toString()
  }
}

export default ComponentUIClass
