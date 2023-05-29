import ViewClass from './View'
import ComponentClass from './Component'
import ComponentUIClass from './ComponentUI'
import ComponentUICanvasClass from './ComponentUICanvas'
import DateSourceClass from './DataSource'

interface App {
  appElement: HTMLElement
}

class Application implements App {
  appElement: HTMLElement

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
  }

  start() {
    const view = new ViewClass(400, 400)

    const componentHtmlUi = new ComponentUIClass()
    const component1 = new ComponentClass(componentHtmlUi)

    const dataSource1 = new DateSourceClass()
    component1.addSource(dataSource1)

    const componentCanvasUI = new ComponentUICanvasClass()
    const component2 = new ComponentClass(componentCanvasUI)

    const dataSource2 = new DateSourceClass()
    component2.addSource(dataSource2)

    view.addComponent(component1)
    view.addComponent(component2)

    this.appElement.appendChild(view.start())

    dataSource1.start()
    dataSource2.start()
  }
}

export default Application
