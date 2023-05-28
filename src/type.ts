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
  draw: (data: number) => string
}

// UI of component
export interface ComponentUI {
  type: string
  draw: (data: number) => string //
}
