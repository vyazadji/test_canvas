import { DataSourceListener, DataSource } from './../type'
import type { ComponentUI } from './types'

interface ComponentApp1 {
  componentUI: ComponentUI | null
  x: number // position of component
  y: number // position of component
  position: (x: number, y: number) => void // change position of component
  data: number // value of component, can be different for different types. This is the simplest solution
}

class ComponentClass implements DataSourceListener, ComponentApp1 {
  componentUI: ComponentUI | null
  x: number
  y: number
  data: number
  index: number // index number of component, use for debug
  needsRedraw: boolean

  constructor(index: number) {
    this.x = 0
    this.y = 0

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
      return this.componentUI.draw(this.x, this.y, this.data, this.index)
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
  position(x: number, y: number) {
    this.x = x
    this.y = y
    // TODO set also in UI component?
  }
}

export default ComponentClass
