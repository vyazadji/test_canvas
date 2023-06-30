import ViewCanvasApp1 from './ViewCanvasApp1'
import ComponentClass from './Component'
// import DateSourceClass from './../DataSource'
// import { VIEW_HEIGHT, VIEW_WIDTH } from './../consts'
// import { getInputNumber, addClick } from './../utils/helpers'
import ComponentUIBar from './ComponentUIBar'

const VIEW_WIDTH = 2000
const VIEW_HEIGHT = 1100
const COMPONENT_WIDTH = 50
const COMPONENT_HEIGHT = 50

/**
 * Application test 1 base on Canvas layer
 */
class ApplicationCanvas1 {
  appElement: HTMLElement
  // dataSource: DataSource
  view: ViewCanvasApp1

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
    this.view = new ViewCanvasApp1(VIEW_HEIGHT, VIEW_WIDTH)
    // this.dataSource = new DateSourceClass()

    this.initButtonBindings()
  }

  initButtonBindings() {
    //
    // Init add components
    //
    // Add Canvas component
    /* addClick('addBarComponentsButton', () => {
      const componentsCount = getInputNumber('barComponentsCount')
      this.addBarComponent(componentsCount)
    }) */
    //
    // Service buttons
    //
    // Data Source Settings
    /* addClick('setDataSourceSettings', () => {
      const interval = getInputNumber('updateInterval')
      this.dataSource.updateInterval(interval * 1_000)
    }) */
  }

  start() {
    // View
    this.view = new ViewCanvasApp1(VIEW_HEIGHT, VIEW_WIDTH)

    // this.dataSource = new DateSourceClass()

    this.appElement.appendChild(this.view.start())

    this.addBarComponent(500)
    // start DataSources
    // this.dataSource.start()
  }

  addBarComponent(componentsCount: number) {
    for (let i = 0; i < componentsCount; i++) {
      const componentUI = new ComponentUIBar(this.view.getContext())
      const component = new ComponentClass(componentUI)
      const x = (COMPONENT_WIDTH * i) % VIEW_WIDTH
      const y = Math.floor((COMPONENT_WIDTH * i) / VIEW_WIDTH) * COMPONENT_HEIGHT
      component.position(x, y)
      // console.log('add component')

      // component.addSource(this.dataSource)
      this.view.addComponent(component)
    }
    this.view.start()
  }

  /* stopDataSource() {
    this.dataSource.updateInterval(0)
  } */
}

export default ApplicationCanvas1
