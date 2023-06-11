import ViewClass from './View'
import ComponentClass from './Component'
import ComponentUIHtmlClass from './ComponentUIHtml'
import ComponentUISvgClass from './ComponentUISvg'
import ComponentUICanvasClass from './ComponentUICanvas'
import ComponentUICanvasFabricClass from './ComponentUICanvasFabric'
import DateSourceClass from './DataSource'
import CanvasEditor from './CanvasEditor'
import { VIEW_HEIGHT, VIEW_WIDTH } from './consts'

import { getInputNumber, addClick } from './utils/helpers'

interface App {
  appElement: HTMLElement
}

/**
 * Application with HTML layer
 */
class Application implements App {
  appElement: HTMLElement

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
  }

  start() {
    // View
    const view = new ViewClass(VIEW_HEIGHT, VIEW_WIDTH)

    // component html 1
    /* const componentHtmlUi = new ComponentUIHtmlClass()
    const component1 = new ComponentClass(componentHtmlUi)
    const dataSource1 = new DateSourceClass()
    component1.addSource(dataSource1)
    view.addComponent(component1) */

    //
    const dataSource = new DateSourceClass()

    // Canvas editor
    const canvasEditor = new CanvasEditor()
    canvasEditor.onAddElement = (serializedCanvas, componentsCount) => {
      for (let i = 0; i < componentsCount; i++) {
        const componentFabricCanvas = new ComponentUICanvasFabricClass(serializedCanvas)
        const component3 = new ComponentClass(componentFabricCanvas)

        component3.addSource(dataSource)
        view.addComponent(component3)
      }
      view.start()
    }

    // SVG components
    addClick('addSvgInHtmlComponents', () => {
      const svgElementsCount = getInputNumber('svgElementsInHtmlCount')
      const svgComponentsCount = getInputNumber('svgComponentsInHtmlCount')

      for (let i = 0; i < svgComponentsCount; i++) {
        const componentSvgUI = new ComponentUISvgClass(svgElementsCount)
        const component = new ComponentClass(componentSvgUI)

        component.addSource(dataSource)
        view.addComponent(component)
      }
      view.start()
    })

    // Canvas components
    addClick('addCanvasComponents', () => {
      const componentsCount = getInputNumber('canvasComponentsCount')

      for (let i = 0; i < componentsCount; i++) {
        const componentCanvasUI = new ComponentUICanvasClass()
        const component = new ComponentClass(componentCanvasUI)

        component.addSource(dataSource)

        view.addComponent(component)
      }
      view.start()
    })

    // Add HTML components
    addClick('addHtmlComponents', () => {
      const elementsCount = getInputNumber('htmlElementsCount')
      const componentsCount = getInputNumber('htmlComponentsCount')

      for (let i = 0; i < componentsCount; i++) {
        const componentHtmlUI = new ComponentUIHtmlClass(elementsCount)
        const component = new ComponentClass(componentHtmlUI)

        component.addSource(dataSource)

        view.addComponent(component)
      }
      view.start()
    })

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

    // start View
    this.appElement.appendChild(view.start())

    // start DataSources
    dataSource.start()
  }
}

export default Application
