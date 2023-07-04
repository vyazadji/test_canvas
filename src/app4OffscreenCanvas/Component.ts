import { DataSourceListener, DataSource } from './../type'
import ComponentUIBar from './ComponentUIBar'

interface ComponentApp4 {
  componentUI: ComponentUIBar // TODO use general component type
  x: number // position of component
  y: number // position of component
  position: (x: number, y: number) => void // change position of component
  data: number // value of component, can be different for different types. This is the simplest solution
}

class ComponentClass implements DataSourceListener, ComponentApp4 {
  componentUI: ComponentUIBar
  x: number
  y: number
  data: number
  id: string
  needsRedraw: boolean

  constructor(componentUI: ComponentUIBar, id: string) {
    this.x = 0
    this.y = 0
    this.data = 0
    this.componentUI = componentUI
    this.id = id
    this.needsRedraw = false
  }

  //
  // Component interface
  //
  getUIElement() {
    return this.componentUI
  }

  draw() {
    this.needsRedraw = false
    return this.componentUI.draw(this.id, this.x, this.y, this.data)
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
  }
}

export default ComponentClass
