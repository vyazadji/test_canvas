import Layer from './Layer'

/**
 * UI Canvas implementation of Bar component.
 * It's main part that we use in Component
 * Draw will do in the worker's part of this component
 */
class ComponentUIBar {
  id: string
  layer: Layer | null

  constructor(id: string) {
    this.id = id
    this.layer = null
  }

  addInLayer(layer: Layer, index: number) {
    this.layer = layer
    this.layer.addComponent(this.id, index)
  }

  position(x: number, y: number) {
    if (this.layer) {
      this.layer.setComponentPosition(this.id, x, y)
    }
  }

  setData(data: number) {
    if (this.layer) {
      this.layer.setComponentData(this.id, data)
    }
  }

  /**
   * Draw the component
   */
  /* draw(id: string, x: number, y: number, data: number) {
    if (this.layer) {
      this.layer.draw(id, x, y, data)
    } else {
      console.warn('Try to draw ComponentUIBar without layer; id=', this.id)
    }
  } */
}

export default ComponentUIBar
