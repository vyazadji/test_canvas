import ViewSVGClass from './ViewSVG'
import ComponentClass from './Component'
import ComponentUISvgClass from './ComponentUISvg'
import DateSourceClass from './DataSource'
import { VIEW_HEIGHT, VIEW_WIDTH } from './consts'
import { getInputNumber, addClick } from './utils/helpers'

interface App {
  appElement: HTMLElement
}

/**
 * Application with SVG layer
 */
class Application implements App {
  appElement: HTMLElement

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
  }

  start() {
    // View
    const view = new ViewSVGClass(VIEW_HEIGHT, VIEW_WIDTH)

    const dataSource = new DateSourceClass()

    // Add Svg Grouped component
    addClick('addSvgComponentsInSvg', () => {
      const svgElementsCount = getInputNumber('svgElementsInSvgCount')
      const svgComponentsCount = getInputNumber('svgComponentsInSvgCount')

      for (let i = 0; i < svgComponentsCount; i++) {
        const componentSvgUI = new ComponentUISvgClass(svgElementsCount, 'g')
        const component = new ComponentClass(componentSvgUI)

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

export default Application
