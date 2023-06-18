// Application
export interface App {
  appElement: HTMLElement
  start: () => void
  addComponents: (componentType: string, componentsCount: number, elementsCount: number) => void
  moveTest: (components?: number) => void
  stopDataSource: () => void
}

// "scene" for components
export interface View {
  addComponent: (component: Component) => void
}

// Data source
export interface Source {
  data: string
}

// Business logic of component
export interface Component {
  componentUI: ComponentUI
  getUIElement: () => HTMLElement | SVGElement | object
  draw: (data: number) => void
}

// UI of component
export interface ComponentUI {
  draw: (data: number) => void //
  getElement: () => HTMLElement | SVGElement | HTMLCanvasElement | object
}

// Data Source
export interface DataSource {
  start: () => void
  addListener: (listener: DataSourceListener) => void
  updateInterval: (interval: number) => void
}

export interface DataSourceListener {
  addSource: (dataSource: DataSource) => void
  onDataChange: (data: number) => void
}
