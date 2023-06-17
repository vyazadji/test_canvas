import ViewCanvas from './ViewCanvas'
import ComponentClass from './Component'
import ComponentUIRawCanvasClass from './ComponentUIRawCanvas'
import DateSourceClass from './DataSource'
import { VIEW_HEIGHT, VIEW_WIDTH } from './consts'
import { getInputNumber, addClick } from './utils/helpers'
import type { App, DataSource } from './type'

/**
 * Application with Canvas layer
 */
class ApplicationCanvas implements App {
  appElement: HTMLElement
  dataSource: DataSource
  view: ViewCanvas

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
    this.view = new ViewCanvas(VIEW_HEIGHT, VIEW_WIDTH)
    this.dataSource = new DateSourceClass()
  }

  start() {
    // View
    this.view = new ViewCanvas(VIEW_HEIGHT, VIEW_WIDTH)

    this.dataSource = new DateSourceClass()

    // Add Canvas component
    addClick('addRawCanvasInCanvasView', () => {
      const rawCanvasComponentsCount = getInputNumber('rawCanvasComponentsCount')

      for (let i = 0; i < rawCanvasComponentsCount; i++) {
        const componentRawCanvas = new ComponentUIRawCanvasClass(this.view.getContext())
        const component = new ComponentClass(componentRawCanvas)

        component.addSource(this.dataSource)
        this.view.addComponent(component)
      }
      this.view.start()
    })

    this.appElement.appendChild(this.view.start())

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

    // start DataSources
    this.dataSource.start()
  }

  moveTest(movedComponentsCount = 0) {
    this.view.moveTest(movedComponentsCount)
  }

  stopDataSource() {
    this.dataSource.updateInterval(0)
  }
}

export default ApplicationCanvas
