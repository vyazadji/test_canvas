import { DataSourceListener, DataSource } from './../type'
import type { ComponentUI, Component } from './types'

class ComponentClass implements DataSourceListener, Component {
  componentUI: ComponentUI | null
  x: number
  y: number
  width: number
  height: number
  data: number
  index: number // index number of component, use for debug
  needsRedraw: boolean

  constructor(index: number) {
    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0

    this.data = 0
    this.needsRedraw = false

    this.index = index

    this.componentUI = null
  }

  //
  // Component interface
  //
  // getUIElement() {
  // return this.componentUI.getElement()
  // }

  draw() {
    this.needsRedraw = false
    if (this.componentUI) {
      return this.componentUI.draw(this.x, this.y, this.data)
    } else {
      console.warn('this.componentUI is not initilaized!')
    }
  }

  addSource(dataSource: DataSource) {
    dataSource.addListener(this)
  }

  //
  // DataSourceListener interface
  //
  onDataChange(data: number) {
    this.data = data
    this.needsRedraw = true
  }

  //
  //ComponentApp1 interface
  //
  setPosition(x: number, y: number) {
    this.x = x
    this.y = y
    // TODO set also in UI component?
  }
}

export default ComponentClass
