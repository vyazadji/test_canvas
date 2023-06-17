import ViewSVGClass from './ViewSVG'
import ComponentClass from './Component'
import ComponentUISvgClass from './ComponentUISvg'
import DateSourceClass from './DataSource'
import { VIEW_HEIGHT, VIEW_WIDTH } from './consts'
import { getInputNumber, addClick } from './utils/helpers'
import type { App, DataSource } from './type'

/**
 * Application with SVG layer
 */
class Application implements App {
  appElement: HTMLElement
  dataSource: DataSource
  view: ViewSVGClass

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
    this.view = new ViewSVGClass(VIEW_HEIGHT, VIEW_WIDTH)
    this.dataSource = new DateSourceClass()
  }

  start() {
    // View
    this.view = new ViewSVGClass(VIEW_HEIGHT, VIEW_WIDTH)

    this.dataSource = new DateSourceClass()

    // Add Svg Grouped component
    addClick('addSvgComponentsInSvg', () => {
      const svgElementsCount = getInputNumber('svgElementsInSvgCount')
      const svgComponentsCount = getInputNumber('svgComponentsInSvgCount')

      for (let i = 0; i < svgComponentsCount; i++) {
        const componentSvgUI = new ComponentUISvgClass(svgElementsCount, 'g')
        const component = new ComponentClass(componentSvgUI)

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

export default Application
