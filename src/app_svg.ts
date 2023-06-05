import ViewSVGClass from './ViewSVG'
//
import { VIEW_HEIGHT, VIEW_WIDTH } from './consts'

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
    const view = new ViewSVGClass(VIEW_HEIGHT, VIEW_WIDTH)

    // start View
    this.appElement.appendChild(view.start())
  }
}

export default Application
