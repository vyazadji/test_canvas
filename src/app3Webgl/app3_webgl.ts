import ThreejsExample from './ThreejsExample'
import WebglExample from './WebglExample'

/**
 * Application test 3 for testing WEBG approach
 */
class Application3Webgl {
  appElement: HTMLElement

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
  }

  start() {
    // three js
    const example = new ThreejsExample(this.appElement)

    // Webgl raw example
    // const example = new WebglExample(this.appElement)
    example.start()
  }
}

export default Application3Webgl
