import type { Layer } from './types'

/**
 * Implementation a independent HTML Layer
 */
class LayerHtml implements Layer {
  width: number
  height: number

  element: HTMLElement

  constructor(width: number, height: number) {
    this.width = width
    this.height = height

    this.element = document.createElement('div')
    this.element.style.width = this.width + 'px'
    this.element.style.height = this.height + 'px'
    this.element.style.position = 'absolute'
  }

  getElement() {
    return this.element
  }

  draw() {
    // hmm what to do here?
  }
}

export default LayerHtml
