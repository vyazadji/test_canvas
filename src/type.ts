// "scene" for components
export interface View {
  addComponent: (component: Component) => void
  // addSourceInComponent: (source: Source, component: Component) => void
}

// Data source
export interface Source {
  data: string
}

// Business logic of comp
export interface Component {
  componentUI: ComponentUI
  type: string // describe type of component
  // addSource: (source: Source) => void
  getUIElement: () => HTMLElement
  draw: (data: number) => void
}

// UI of component
export interface ComponentUI {
  type: string
  draw: (data: number) => void //
  getElement: () => HTMLElement
}

// Data Source
export interface DataSource {
  start: () => void
  addListener: (listener: DataSourceListener) => void
}

export interface DataSourceListener {
  addSource: (dataSource: DataSource) => void
  onDataChange: (data: number) => void
}
