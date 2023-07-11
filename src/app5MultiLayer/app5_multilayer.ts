import ViewMultilayer from './ViewMultilayer'
import ComponentClass from './Component'
import DateSourceClass from './../DataSource'
import { DataSource } from '../type'

// const COMPONENTS_COUNT = 5_000
const COMPONENTS_COUNT = 100

const VIEW_WIDTH = 1500
const VIEW_HEIGHT = 1000
const COMPONENT_WIDTH = 10
const COMPONENT_HEIGHT = 10

/**
 * Application test 5: try to use multiple layers (canvas, html ...) in one application
 */
class Application5Multilayer {
  appElement: HTMLElement
  dataSource1: DataSource
  dataSource2: DataSource
  view: ViewMultilayer

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
    this.dataSource1 = new DateSourceClass(2000)
    this.dataSource2 = new DateSourceClass(4000)

    this.view = new ViewMultilayer(VIEW_WIDTH, VIEW_HEIGHT)
  }

  start() {
    this.appElement.appendChild(this.view.start())

    this.addBarComponent(COMPONENTS_COUNT)

    // start DataSources
    this.dataSource1.start()
    this.dataSource2.start()
  }

  addBarComponent(componentsCount: number) {
    for (let i = 0; i < componentsCount; i++) {
      const component = new ComponentClass(i)
      const x = (COMPONENT_WIDTH * i) % VIEW_WIDTH
      const y = Math.floor((COMPONENT_WIDTH * i) / VIEW_WIDTH) * COMPONENT_HEIGHT
      component.setPosition(x, y)

      component.addSource(i % 2 ? this.dataSource1 : this.dataSource2)
      this.view.addComponent(component)
    }
    this.view.start()
  }
}

export default Application5Multilayer
