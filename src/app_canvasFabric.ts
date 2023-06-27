import ViewCanvasFabric from './ViewCanvasFabric'
import DateSourceClass from './DataSource'

import ComponentUICanvasFabricClass from './ComponentUICanvasFabric'
import ComponentClass from './Component'

import { VIEW_HEIGHT, VIEW_WIDTH } from './consts'
import { getInputNumber, addClick } from './utils/helpers'
import type { App, DataSource } from './type'
import ZoomManager from './ZoomManager'

/**
 * Application with Canvas layer implemented via Fabric.js lib
 */
class ApplicationCanvasFabric implements App {
  appElement: HTMLElement
  dataSource: DataSource
  view?: ViewCanvasFabric

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

    const zoomViewBox = new ZoomManager('canvasFabric')
    zoomViewBox.onChange = (value) => {
      this.view?.zoomCanvasFabric(value)
    }

    this.initButtonBindings()
  }

  initButtonBindings() {
    //
    // Init add components
    //
    // Add Canvas component
    addClick('addCanvasFabricInFabricView', () => {
      const fabricComponentsCount = getInputNumber('fabricComponentsCount')
      this.addFabricComponents(fabricComponentsCount)
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
    this.view = new ViewCanvasFabric(VIEW_HEIGHT, VIEW_WIDTH, this.appElement)

    this.dataSource = new DateSourceClass()

    // this.appElement.appendChild(this.view.start())

    // start DataSources
    this.dataSource.start()
  }

  addComponents(componentType: string, componentsCount: number, _elementsCount: number) {
    switch (componentType) {
      case 'CanvasFabric':
        this.addFabricComponents(componentsCount)
        break

      default:
        throw new Error(`Canvas Fabric App: unknown component type:${componentType}`)
    }
  }

  addFabricComponents(componentsCount: number) {
    if (this.view) {
      for (let i = 0; i < componentsCount; i++) {
        const componentUICanvasFabric = new ComponentUICanvasFabricClass(this.view.getCanvas())
        const component = new ComponentClass(componentUICanvasFabric)

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

export default ApplicationCanvasFabric
