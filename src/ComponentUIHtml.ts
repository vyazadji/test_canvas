import { ComponentUI } from './type'

// UI HTML implementation of component
class ComponentUIHtmlClass implements ComponentUI {
  containerEl: HTMLElement

  constructor() {
    this.containerEl = document.createElement('div')
    this.containerEl.textContent = '[...]'
  }

  getElement(): HTMLElement {
    return this.containerEl
  }

  // html implementation of component
  draw(data: number) {
    this.containerEl.textContent = data.toString()
  }
}

export default ComponentUIHtmlClass
