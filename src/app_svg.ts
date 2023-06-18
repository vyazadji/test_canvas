import ViewSVGClass from './ViewSVG'
import ComponentClass from './Component'
import ComponentUISvgClass from './ComponentUISvg'
import DateSourceClass from './DataSource'
import { VIEW_HEIGHT, VIEW_WIDTH } from './consts'
import { getInputNumber, addClick } from './utils/helpers'
import type { App, DataSource } from './type'

export interface AppSVG extends App {
  addSvgComponentsInSvg: (componentsCount: number, elementsCount: number) => void
}

/**
 * Application with SVG layer
 */
class Application implements AppSVG {
  appElement: HTMLElement
  dataSource: DataSource
  view: ViewSVGClass

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
    this.view = new ViewSVGClass(VIEW_HEIGHT, VIEW_WIDTH)
    this.dataSource = new DateSourceClass()

    this.initButtonBindings()
  }

  initButtonBindings() {
    //
    // Init add components
    //

    // Add Svg Grouped component
    addClick('addSvgComponentsInSvg', () => {
      const svgElementsCount = getInputNumber('svgElementsInSvgCount')
      const svgComponentsCount = getInputNumber('svgComponentsInSvgCount')

      this.addSvgComponentsInSvg(svgComponentsCount, svgElementsCount)
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
    this.view = new ViewSVGClass(VIEW_HEIGHT, VIEW_WIDTH)
    this.dataSource = new DateSourceClass()
    this.appElement.appendChild(this.view.start())

    // start DataSources
    this.dataSource.start()
  }

  addComponents(componentType: string, componentsCount: number, elementsCount: number) {
    switch (componentType) {
      case 'SVG':
        this.addSvgComponentsInSvg(componentsCount, elementsCount)
        break

      default:
        throw new Error(`SVG App: unknown component type:${componentType}`)
    }
  }

  addSvgComponentsInSvg(componentsCount: number, elementsCount: number) {
    for (let i = 0; i < componentsCount; i++) {
      const componentSvgUI = new ComponentUISvgClass(elementsCount, 'g')
      const component = new ComponentClass(componentSvgUI)

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

export default Application
