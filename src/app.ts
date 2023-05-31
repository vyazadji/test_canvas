import ViewClass from './View'
import ComponentClass from './Component'
import ComponentUIHtmlClass from './ComponentUIHtml'
import ComponentUICanvasClass from './ComponentUICanvas'
import ComponentUICanvasFabricClass from './ComponentUICanvasFabric'
import DateSourceClass from './DataSource'
import CanvasEditor from './CanvasEditor'

interface App {
  appElement: HTMLElement
}

class Application implements App {
  appElement: HTMLElement

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
  }

  start() {
    // View
    const view = new ViewClass(800, 800)

    // component1
    const componentHtmlUi = new ComponentUIHtmlClass()
    const component1 = new ComponentClass(componentHtmlUi)

    const dataSource1 = new DateSourceClass()
    component1.addSource(dataSource1)

    view.addComponent(component1)

    // component2
    const componentCanvasUI = new ComponentUICanvasClass()
    const component2 = new ComponentClass(componentCanvasUI)

    const dataSource2 = new DateSourceClass()
    component2.addSource(dataSource2)

    view.addComponent(component2)

    // Canvas editor
    const canvasEditor = new CanvasEditor()
    canvasEditor.onAddElement = (serializedCanvas) => {
      console.log('test 11', serializedCanvas)
      const componentFabricCanvas = new ComponentUICanvasFabricClass(serializedCanvas)
      const component3 = new ComponentClass(componentFabricCanvas)
      component3.addSource(dataSource2)
      view.addComponent(component3)
      view.start()
    }

    // start View
    this.appElement.appendChild(view.start())

    // start DataSources
    dataSource1.start()
    dataSource2.start()
  }
}

export default Application
