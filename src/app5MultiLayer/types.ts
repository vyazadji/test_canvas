import ComponentClass from './Component'

export interface Layer {
  getElement(): HTMLElement
  draw(zoomFactor: number, offsetX: number, offsetY: number): void
  addComponent(component: ComponentClass): void
}

export interface ComponentUI {
  draw(x: number, y: number, data: number, index?: number): void
}
