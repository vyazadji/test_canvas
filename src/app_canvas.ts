import ViewCanvas from './ViewCanvas'
import ComponentClass from './Component'
import ComponentUIRawCanvasClass from './ComponentUIRawCanvas'
import DateSourceClass from './DataSource'
import { VIEW_HEIGHT, VIEW_WIDTH } from './consts'
import { getInputNumber, addClick } from './utils/helpers'

interface App {
  appElement: HTMLElement
}

/**
 * Application with Canvas layer
 */
class ApplicationCanvas implements App {
  appElement: HTMLElement

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
  }

  start() {
    // View
    const view = new ViewCanvas(VIEW_HEIGHT, VIEW_WIDTH)

    const dataSource = new DateSourceClass()

    // Add Canvas component
    addClick('addRawCanvasInCanvasView', () => {
      const rawCanvasComponentsCount = getInputNumber('rawCanvasComponentsCount')

      for (let i = 0; i < rawCanvasComponentsCount; i++) {
        const componentRawCanvas = new ComponentUIRawCanvasClass(view.getContext())
        const component = new ComponentClass(componentRawCanvas)

        component.addSource(dataSource)
        view.addComponent(component)
      }
      view.start()
    })

    this.appElement.appendChild(view.start())

    // Data Source Settings
    addClick('setDataSourceSettings', () => {
      const interval = getInputNumber('updateInterval')
      dataSource.updateInterval(interval * 1_000)
    })

    // Move Test
    addClick('startMoveTest', () => {
      const movedComponentsCount = getInputNumber('movedComponentsCount')
      view.moveTest(movedComponentsCount)
    })

    // start DataSources
    dataSource.start()
  }
}

export default ApplicationCanvas
