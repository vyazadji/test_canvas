import ViewClass from './View'
import ComponentClass from './Component'
import ComponentUIClass from './ComponentUI'

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

    // const dataSource1 = new DateSource()
    const componentHtmlUi = new ComponentUIClass()
    const component1 = new ComponentClass(componentHtmlUi)
    // component1.addSource(dataSource1)

    view.addComponent(component1)

    this.appElement.innerHTML = view.start()
  }
}

export default Application
