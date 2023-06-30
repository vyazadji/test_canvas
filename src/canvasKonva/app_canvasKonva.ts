import ViewCanvasKonva from './ViewCanvasKonva'
import DateSourceClass from './../DataSource'

import ComponentUICanvasKonvaClass from './ComponentUICanvasKonva'
import ComponentClass from './../Component'

import { VIEW_HEIGHT, VIEW_WIDTH } from './../consts'
import { getInputNumber, addClick } from './../utils/helpers'
import type { App, DataSource } from './../type'
import ZoomManager from './../utils/ZoomManager'

/**
 * Application with Canvas layer implemented via Konva lib
 */
class ApplicationCanvasKonva implements App {
  appElement: HTMLElement
  dataSource: DataSource
  view?: ViewCanvasKonva

  constructor(appElement: HTMLElement) {
    this.appElement = appElement

    // Fabric adds position absolute
    // So prepare parent element for this
    this.appElement.style.position = 'relative'
    this.appElement.style.width = VIEW_WIDTH + 'px'
    this.appElement.style.height = VIEW_HEIGHT + 'px'

    this.view = undefined
    this.dataSource = new DateSourceClass()

    const zoom = new ZoomManager()
    zoom.onChange = (newZoom) => {
      this.view?.zoomTransform(newZoom)
    }

    this.initButtonBindings()
  }

  initButtonBindings() {
    //
    // Init add components
    //
    // Add Canvas Konva component
    addClick('addCanvasKonvaComponent', () => {
      const componentsCount = getInputNumber('konvaComponentsCount')
      this.addKonvaComponents(componentsCount)
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
    this.view = new ViewCanvasKonva(VIEW_HEIGHT, VIEW_WIDTH, this.appElement as HTMLDivElement)

    this.dataSource = new DateSourceClass()

    // start DataSources
    this.dataSource.start()
  }

  addComponents(componentType: string, componentsCount: number, _elementsCount: number) {
    switch (componentType) {
      case 'CanvasKonva':
        this.addKonvaComponents(componentsCount)
        break

      default:
        throw new Error(`Canvas Konva App: unknown component type:${componentType}`)
    }
  }

  addKonvaComponents(componentsCount: number) {
    if (this.view) {
      for (let i = 0; i < componentsCount; i++) {
        const componentUI = new ComponentUICanvasKonvaClass(this.view.getLayer())
        const component = new ComponentClass(componentUI)

        // component.addSource(this.dataSource)
        this.view?.addComponent(component)
      }
      this.view?.start()
    }
  }

  moveTest(movedComponentsCount = 0) {
    this.view?.moveTest(movedComponentsCount)
  }

  stopDataSource() {
    this.dataSource.updateInterval(0)
  }
}

export default ApplicationCanvasKonva
