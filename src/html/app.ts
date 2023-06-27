import ViewClass from './View'
import ComponentClass from './../Component'
import ComponentUIHtmlClass from './ComponentUIHtml'
import ComponentUISvgClass from './../svg/ComponentUISvg'
import ComponentUICanvasClass from './ComponentUICanvas'
import ComponentUIHthmlCanvasFabricClass from './ComponentUIHtmlCanvasFabric'
import DateSourceClass from './../DataSource'
import CanvasEditor from './CanvasEditor'
import { VIEW_HEIGHT, VIEW_WIDTH } from './../consts'
import type { App, DataSource } from './../type'

import { getInputNumber, addClick } from './../utils/helpers'
import ZoomManager from './../utils/ZoomManager'

/* export interface AppHTML extends App {
  addSvgInHtmlComponents: (componentsCount: number, elementsCount: number) => void
} */

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

    const zoom = new ZoomManager()
    zoom.onChange = (newZoom) => {
      this.view.zoomTransform(newZoom)
    }
    this.initButtonBindings()
  }

  initButtonBindings() {
    //
    // Init add components
    //

    // SVG components
    addClick('addSvgInHtmlComponents', () => {
      const svgElementsCount = getInputNumber('svgElementsInHtmlCount')
      const svgComponentsCount = getInputNumber('svgComponentsInHtmlCount')

      this.addSvgInHtmlComponents(svgComponentsCount, svgElementsCount)
    })

    // Canvas editor
    const canvasEditor = new CanvasEditor()
    canvasEditor.onAddElement = (serializedCanvas, componentsCount) => {
      this.addCanvasFabricComponents(serializedCanvas, componentsCount)
    }

    // Canvas components
    addClick('addCanvasComponents', () => {
      const componentsCount = getInputNumber('canvasComponentsCount')
      this.addCanvasComponents(componentsCount)
    })

    // Add HTML components
    addClick('addHtmlComponents', () => {
      const elementsCount = getInputNumber('htmlElementsCount')
      const componentsCount = getInputNumber('htmlComponentsCount')

      this.addHtmlComponents(componentsCount, elementsCount)
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

    // Move Test2
    addClick('startMoveTest2', () => {
      const movedComponentsCount = getInputNumber('movedComponentsCount')
      this.view.moveTest2(movedComponentsCount)
    })
  }

  start() {
    // View
    this.view = new ViewClass(VIEW_HEIGHT, VIEW_WIDTH)

    // start View
    this.appElement.appendChild(this.view.start())

    // start DataSources
    this.dataSource.start()
  }

  addComponents(componentType: string, componentsCount: number, elementsCount: number) {
    switch (componentType) {
      case 'HTML':
        this.addHtmlComponents(componentsCount, elementsCount)
        break
      case 'SVG':
        this.addSvgInHtmlComponents(componentsCount, elementsCount)
        break

      case 'Canvas':
        this.addCanvasComponents(componentsCount)
        break

      default:
        throw new Error(`HTML app: unknown component type:${componentType}`)
    }
  }

  addHtmlComponents(componentsCount: number, elementsCount: number) {
    for (let i = 0; i < componentsCount; i++) {
      const componentHtmlUI = new ComponentUIHtmlClass(elementsCount)
      const component = new ComponentClass(componentHtmlUI)

      component.addSource(this.dataSource)

      this.view.addComponent(component)
    }
    this.view.start()
  }

  addCanvasFabricComponents(serializedCanvas: object, componentsCount: number) {
    for (let i = 0; i < componentsCount; i++) {
      const componentFabricCanvas = new ComponentUIHthmlCanvasFabricClass(serializedCanvas)
      const component3 = new ComponentClass(componentFabricCanvas)

      component3.addSource(this.dataSource)
      this.view.addComponent(component3)
    }
    this.view.start()
  }

  addCanvasComponents(componentsCount: number) {
    for (let i = 0; i < componentsCount; i++) {
      const componentCanvasUI = new ComponentUICanvasClass()
      const component = new ComponentClass(componentCanvasUI)

      component.addSource(this.dataSource)

      this.view.addComponent(component)
    }
    this.view.start()
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

  moveTest(movedComponentsCount = 0) {
    this.view.moveTest(movedComponentsCount)
  }

  stopDataSource() {
    this.dataSource.updateInterval(0)
  }
}

export default Application
