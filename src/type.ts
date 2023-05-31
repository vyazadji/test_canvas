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
  getUIElement: () => HTMLElement
  draw: (data: number) => void
}

// UI of component
export interface ComponentUI {
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
