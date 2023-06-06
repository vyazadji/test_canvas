import { random } from 'lodash'
import { ComponentUI } from './type'
import { getRandomColor } from './utils/colors'

// UI HTML implementation of component
class ComponentUIHtmlClass implements ComponentUI {
  containerEl: HTMLElement

  constructor(elementsCount = 1) {
    this.containerEl = document.createElement('div')
    this.containerEl.style.backgroundColor = 'orange'

    // one element will be text node,
    // so add only if we need more elements
    for (let index = 1; index < elementsCount; index++) {
      const childEl = document.createElement('div')
      childEl.style.width = random(5, 95) + '%'
      childEl.style.height = '1px'
      childEl.style.border = '1px solid ' + getRandomColor()
      this.containerEl.appendChild(childEl)
    }

    const textEl = document.createTextNode('[...]')
    this.containerEl.appendChild(textEl)
  }

  getElement(): HTMLElement {
    return this.containerEl
  }

  // html implementation of component
  draw(data: number) {
    // the last node must be the text node with datasource value
    const lastNode = this.containerEl.childNodes[this.containerEl.childNodes.length - 1]
    if (lastNode.nodeType === Node.TEXT_NODE) {
      lastNode.textContent = data.toString()
    }
  }
}

export default ComponentUIHtmlClass
