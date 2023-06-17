import ViewClass from './View'
import ComponentClass from './Component'
import ComponentUIHtmlClass from './ComponentUIHtml'
import ComponentUISvgClass from './ComponentUISvg'
import ComponentUICanvasClass from './ComponentUICanvas'
import ComponentUICanvasFabricClass from './ComponentUICanvasFabric'
import DateSourceClass from './DataSource'
import CanvasEditor from './CanvasEditor'
import { VIEW_HEIGHT, VIEW_WIDTH } from './consts'
import type { DataSource } from './type'

import { getInputNumber, addClick } from './utils/helpers'

interface App {
  appElement: HTMLElement
}

/**
 * Application with HTML layer
 */
class Application implements App {
  appElement: HTMLElement
  dataSource: DataSource
  view: ViewClass

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
    this.view = new ViewClass(VIEW_HEIGHT, VIEW_WIDTH)
    this.dataSource = new DateSourceClass()
  }

  addSvgInHtmlComponents(svgComponentsCount: number, svgElementsCount: number) {
    for (let i = 0; i < svgComponentsCount; i++) {
      const componentSvgUI = new ComponentUISvgClass(svgElementsCount)
      const component = new ComponentClass(componentSvgUI)

      component.addSource(this.dataSource)
      this.view.addComponent(component)
    }
    this.view.start()
  }

  start() {
    // View
    this.view = new ViewClass(VIEW_HEIGHT, VIEW_WIDTH)

    // Canvas editor
    const canvasEditor = new CanvasEditor()
    canvasEditor.onAddElement = (serializedCanvas, componentsCount) => {
      for (let i = 0; i < componentsCount; i++) {
        const componentFabricCanvas = new ComponentUICanvasFabricClass(serializedCanvas)
        const component3 = new ComponentClass(componentFabricCanvas)

        component3.addSource(this.dataSource)
        this.view.addComponent(component3)
      }
      this.view.start()
    }

    // SVG components
    addClick('addSvgInHtmlComponents', () => {
      const svgElementsCount = getInputNumber('svgElementsInHtmlCount')
      const svgComponentsCount = getInputNumber('svgComponentsInHtmlCount')

      this.addSvgInHtmlComponents(svgComponentsCount, svgElementsCount)
    })

    // Canvas components
    addClick('addCanvasComponents', () => {
      const componentsCount = getInputNumber('canvasComponentsCount')

      for (let i = 0; i < componentsCount; i++) {
        const componentCanvasUI = new ComponentUICanvasClass()
        const component = new ComponentClass(componentCanvasUI)

        component.addSource(this.dataSource)

        this.view.addComponent(component)
      }
      this.view.start()
    })

    // Add HTML components
    addClick('addHtmlComponents', () => {
      const elementsCount = getInputNumber('htmlElementsCount')
      const componentsCount = getInputNumber('htmlComponentsCount')

      for (let i = 0; i < componentsCount; i++) {
        const componentHtmlUI = new ComponentUIHtmlClass(elementsCount)
        const component = new ComponentClass(componentHtmlUI)

        component.addSource(this.dataSource)

        this.view.addComponent(component)
      }
      this.view.start()
    })

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

    // Move Test2
    addClick('startMoveTest2', () => {
      const movedComponentsCount = getInputNumber('movedComponentsCount')
      this.view.moveTest2(movedComponentsCount)
    })

    // start View
    this.appElement.appendChild(this.view.start())

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
