import ViewCanvas from './ViewCanvas'
import ComponentClass from './Component'
import ComponentUIRawCanvasClass from './ComponentUIRawCanvas'
import DateSourceClass from './DataSource'
import { VIEW_HEIGHT, VIEW_WIDTH } from './consts'
import { getInputNumber, addClick } from './utils/helpers'
import type { App, DataSource } from './type'

export interface AppCanvas extends App {
  addRawCanvasComponents: (componentsCount: number) => void
}

/**
 * Application with Canvas layer
 */
class ApplicationCanvas implements AppCanvas {
  appElement: HTMLElement
  dataSource: DataSource
  view: ViewCanvas

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
    this.view = new ViewCanvas(VIEW_HEIGHT, VIEW_WIDTH)
    this.dataSource = new DateSourceClass()

    this.initButtonBindings()
  }

  initButtonBindings() {
    //
    // Init add components
    //

    // Add Canvas component
    addClick('addRawCanvasInCanvasView', () => {
      const rawCanvasComponentsCount = getInputNumber('rawCanvasComponentsCount')
      this.addRawCanvasComponents(rawCanvasComponentsCount)
    })

    //
    // Service buttons
    //

    // Data Source Settings
    addClick('setDataSourceSettings', () => {
      const interval = getInputNumber('updateInterval')
      this.dataSource.updateInterval(interval * 1_000)
    })

    // Move Test
    addClick('startMoveTest', () => {
      const movedComponentsCount = getInputNumber('movedComponentsCount')
      this.moveTest(movedComponentsCount)
    })
  }

  start() {
    // View
    this.view = new ViewCanvas(VIEW_HEIGHT, VIEW_WIDTH)

    this.dataSource = new DateSourceClass()

    this.appElement.appendChild(this.view.start())

    // start DataSources
    this.dataSource.start()
  }

  addRawCanvasComponents(componentsCount: number) {
    for (let i = 0; i < componentsCount; i++) {
      const componentRawCanvas = new ComponentUIRawCanvasClass(this.view.getContext())
      const component = new ComponentClass(componentRawCanvas)

      component.addSource(this.dataSource)
      this.view.addComponent(component)
    }
    this.view.start()
  }

  moveTest(movedComponentsCount = 0) {
    this.view.moveTest(movedComponentsCount)
  }

  stopDataSource() {
    this.dataSource.updateInterval(0)
  }
}

export default ApplicationCanvas
