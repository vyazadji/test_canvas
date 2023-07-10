import ViewCanvasApp1 from './ViewCanvasApp1'
import ComponentClass from './Component'
import DateSourceClass from './../DataSource'
import { DataSource } from '../type'
import ComponentUIBar from './ComponentUIBar'

const COMPONENTS_COUNT = 10_000
// const COMPONENTS_COUNT = 1_000

const VIEW_WIDTH = 1500
const VIEW_HEIGHT = 1000
const COMPONENT_WIDTH = 10
const COMPONENT_HEIGHT = 10

/**
 * Application test 1 base on Canvas layer
 */
class ApplicationCanvas1 {
  appElement: HTMLElement
  dataSource1: DataSource
  dataSource2: DataSource
  view: ViewCanvasApp1

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
    this.view = new ViewCanvasApp1(VIEW_HEIGHT, VIEW_WIDTH)
    this.dataSource1 = new DateSourceClass(2000)
    this.dataSource2 = new DateSourceClass(4000)
  }

  start() {
    // View
    this.view = new ViewCanvasApp1(VIEW_HEIGHT, VIEW_WIDTH)

    this.appElement.appendChild(this.view.start())

    this.addBarComponent(COMPONENTS_COUNT)

    // start DataSources
    this.dataSource1.start()
    this.dataSource2.start()
  }

  addBarComponent(componentsCount: number) {
    for (let i = 0; i < componentsCount; i++) {
      const componentUI = new ComponentUIBar(this.view.getContext())
      const component = new ComponentClass(componentUI, i)
      const x = (COMPONENT_WIDTH * i) % VIEW_WIDTH
      const y = Math.floor((COMPONENT_WIDTH * i) / VIEW_WIDTH) * COMPONENT_HEIGHT
      component.position(x, y)

      component.addSource(i % 2 ? this.dataSource1 : this.dataSource2)
      this.view.addComponent(component)
    }
    this.view.start()
  }
}

export default ApplicationCanvas1
