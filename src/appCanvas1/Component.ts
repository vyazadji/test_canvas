import { DataSourceListener, DataSource } from './../type'
import ComponentUIBar from './ComponentUIBar'

interface ComponentApp1 {
  componentUI: ComponentUIBar // TODO use general component type
  x: number // position of component
  y: number // position of component
  position: (x: number, y: number) => void // change position of component
  data: number // value of component, can be different for different types. This is the simplest solution
}

class ComponentClass implements DataSourceListener, ComponentApp1 {
  componentUI: ComponentUIBar
  x: number
  y: number
  data: number
  index: number // index number

  constructor(componentUI: ComponentUIBar, index: number) {
    this.x = 0
    this.y = 0
    this.data = 0
    this.componentUI = componentUI
    this.index = index
  }

  //
  // Component interface
  //
  getUIElement() {
    // return this.componentUI.getElement()
  }

  draw() {
    return this.componentUI.draw(this.x, this.y, this.data, this.index)
  }

  addSource(dataSource: DataSource) {
    dataSource.addListener(this)
  }

  //
  // DataSourceListener interface
  //
  onDataChange(data: number) {
    this.data = data
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
