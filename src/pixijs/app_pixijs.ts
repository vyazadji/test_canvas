import ViewPixijs from './ViewPixijs'
import ComponentClass from './../Component'
import ComponentUIPixijs from './ComponentUIPixijs'
import DateSourceClass from './../DataSource'
import { VIEW_HEIGHT, VIEW_WIDTH } from './../consts'
import { getInputNumber, addClick } from './../utils/helpers'
import type { App, DataSource } from './../type'
// import ZoomManager from './../utils/ZoomManager'

/**
 * Application with Pixijs
 */
class ApplicationPixijs implements App {
  appElement: HTMLElement
  dataSource: DataSource
  view: ViewPixijs

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
    this.view = new ViewPixijs(VIEW_HEIGHT, VIEW_WIDTH)
    this.dataSource = new DateSourceClass()

    /* const zoom = new ZoomManager()
    zoom.onChange = (newZoom) => {
      this.view.zoomTransform(newZoom)
    } */

    this.initButtonBindings()
  }

  initButtonBindings() {
    //
    // Init add components
    //

    // Add Pixijs component
    addClick('addPixijsComponents', () => {
      const componentsCount = getInputNumber('pixijsComponentsCount')
      this.addPixijsComponents(componentsCount)
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
    this.view = new ViewPixijs(VIEW_HEIGHT, VIEW_WIDTH)

    this.dataSource = new DateSourceClass()

    // eslint-disable-next-line
    // @ts-ignore
    this.appElement.appendChild(this.view.start())

    // start DataSources
    this.dataSource.start()
  }

  addComponents(componentType: string, componentsCount: number, _elementsCount: number) {
    switch (componentType) {
      case 'pixijs':
        this.addPixijsComponents(componentsCount)
        break

      default:
        throw new Error(`Pixijs App: unknown component type:${componentType}`)
    }
  }

  addPixijsComponents(componentsCount: number) {
    for (let i = 0; i < componentsCount; i++) {
      const componentUI = new ComponentUIPixijs(this.view.getContext())
      const component = new ComponentClass(componentUI)

      // component.addSource(this.dataSource)
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

export default ApplicationPixijs
