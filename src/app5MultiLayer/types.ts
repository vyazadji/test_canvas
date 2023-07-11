//
//Components
//
export interface ComponentCore {
  index: number // temp for debug
  componentUI: ComponentUI | null // UI implementation of component
  data: number // value of component, can be different for different types. This is the simplest solution
  needsRedraw: boolean // internal state of component was change, we need to redraw it
  draw: () => void // run draw (or redraw) of component
}

export interface ComponentCoordinates {
  x: number // position X of component
  y: number // position Y of component
  width: number // width of component
  height: number // height of component
  setPosition: (x: number, y: number) => void // change position of component
}

export interface Component extends ComponentCore, ComponentCoordinates {}

// /Component

export interface Layer {
  getElement(): HTMLElement
  draw(zoomFactor: number, offsetX: number, offsetY: number): void
  addComponent(component: ComponentCore): void
}

export interface ComponentUI {
  draw(x: number, y: number, data: number): void
}

export type Callback = (...args: any[]) => void
