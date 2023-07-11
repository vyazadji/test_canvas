import { DataSourceListener, DataSource } from './../type'
import type { ComponentUI, Component } from './types'
import { ELEMENT_HEIGHT, ELEMENT_WIDTH } from './constants'

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
    this.width = ELEMENT_WIDTH // set default width
    this.height = ELEMENT_HEIGHT // set default height

    this.data = 0
    this.needsRedraw = false

    this.index = index

    this.componentUI = null
  }

  //
  // Component interface
  //

  draw() {
    this.needsRedraw = false
    if (this.componentUI) {
      return this.componentUI.draw(this.x, this.y, this.width, this.height, this.data)
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
    this.needsRedraw = true
  }
}

export default ComponentClass
