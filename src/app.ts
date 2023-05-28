import ViewClass from './View'
import ComponentClass from './Component'
import ComponentUIClass from './ComponentUI'
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

    view.addComponent(component1)

    this.appElement.appendChild(view.start())

    dataSource1.start()
  }
}

export default Application
