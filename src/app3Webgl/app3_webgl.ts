import WebglExample from './WebglExample'
import ThreejsExample from './ThreejsExample'

/**
 * Application test 3 for testing WEBG approach
 */
class Application3Webgl {
  appElement: HTMLElement

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
  }

  start() {
    const urlParams = new URLSearchParams(window.location.search)
    const exampleParam = urlParams.get('example')

    let example

    if (exampleParam === 'webgl') {
      // Webgl raw example
      example = new WebglExample(this.appElement)
    } else {
      // three js
      example = new ThreejsExample(this.appElement)
    }

    example.start()
  }
}

export default Application3Webgl
