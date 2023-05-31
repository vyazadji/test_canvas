import { Component, ComponentUI, DataSourceListener, DataSource } from './type'

class ComponentClass implements Component, DataSourceListener {
  componentUI: ComponentUI

  constructor(componentUI: ComponentUI) {
    this.componentUI = componentUI
  }

  // Component
  getUIElement(): HTMLElement {
    return this.componentUI.getElement()
  }

  draw(data: number) {
    return this.componentUI.draw(data)
  }

  addSource(dataSource: DataSource) {
    dataSource.addListener(this)
  }

  // DataSourceListener
  onDataChange(data: number) {
    this.draw(data)
  }
}

export default ComponentClass
