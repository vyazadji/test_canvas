import type { Layer, ComponentCore } from './types'

/**
 * Implementation a independent HTML Layer
 */
class LayerHtml implements Layer {
  width: number
  height: number

  element: HTMLElement
  components: ComponentCore[]

  constructor(width: number, height: number) {
    this.width = width
    this.height = height

    this.element = document.createElement('div')
    this.element.style.width = this.width + 'px'
    this.element.style.height = this.height + 'px'
    this.element.style.position = 'absolute'
    this.element.style.top = '0'
    this.element.style.left = '0'

    this.components = []
  }

  getElement() {
    return this.element
  }

  addComponent(component: ComponentCore) {
    this.components.push(component)
  }

  draw(zoomFactor: number, offsetX: number, offsetY: number) {
    this.element.style.transformOrigin = 'top left'
    this.element.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoomFactor})`

    for (let index = 0; index < this.components.length; index++) {
      const component = this.components[index]
      component.draw()
    }
  }
}

export default LayerHtml
