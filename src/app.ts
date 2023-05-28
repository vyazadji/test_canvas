interface App {
  appElement: HTMLElement
}

class app implements App {
  appElement: HTMLElement

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
  }

  start() {
    this.appElement.innerHTML = 'Init app'
  }
}

export default app
