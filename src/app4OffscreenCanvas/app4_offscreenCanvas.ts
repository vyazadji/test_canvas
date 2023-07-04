import ViewCanvasApp4 from './ViewCanvasApp4'
import ComponentClass from './Component'
import DateSourceClass from './../DataSource'
import { DataSource } from '../type'
import ComponentUIBar from './ComponentUIBar'

const VIEW_WIDTH = 1500
const VIEW_HEIGHT = 1000
const COMPONENT_WIDTH = 10
const COMPONENT_HEIGHT = 10

/**
 * Application test offscreen Canvas
 */
class ApplicationOffscreenCanvas {
  appElement: HTMLElement
  dataSource1: DataSource
  dataSource2: DataSource
  view: ViewCanvasApp4

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
    this.view = new ViewCanvasApp4(VIEW_WIDTH, VIEW_HEIGHT)
    this.dataSource1 = new DateSourceClass(2000)
    this.dataSource2 = new DateSourceClass(4000)
  }

  start() {
    // View
    // this.view = new ViewCanvasApp1(VIEW_WIDTH, VIEW_HEIGHT)

    this.appElement.appendChild(this.view.start())

    // const COMPONENTS_COUNT = 5_000
    const COMPONENTS_COUNT = 10
    this.addBarComponent(COMPONENTS_COUNT)

    // start DataSources
    this.dataSource1.start()
    this.dataSource2.start()
  }

  addBarComponent(componentsCount: number) {
    for (let i = 0; i < componentsCount; i++) {
      const componentUI = new ComponentUIBar(i.toString()) // TODO duplication id in component and UI
      const component = new ComponentClass(componentUI, i.toString())

      const x = (COMPONENT_WIDTH * i) % VIEW_WIDTH
      const y = Math.floor((COMPONENT_WIDTH * i) / VIEW_WIDTH) * COMPONENT_HEIGHT
      component.position(x, y)

      component.addSource(i % 2 ? this.dataSource1 : this.dataSource2)
      this.view.addComponent(component, i)
    }
    this.view.start()
  }
}

export default ApplicationOffscreenCanvas
