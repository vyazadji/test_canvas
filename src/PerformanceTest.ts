import FPSMonitor from './FPSMonitor'
import { addClick } from './utils/helpers'
import type { App } from './type'

/**
 * This is a test of performance for different technogies
 */
class PerformanceTest {
  constructor() {
    addClick('startPerformanceTest', () => {
      this.start()
    })
  }

  start() {
    //
    // Go To first HTML view and add "isTest"
    //
    // Create a URL object with the current location
    const url = new URL(window.location.href)
    // Get the existing search parameters
    const params = new URLSearchParams(url.search)

    // Check if "test" parameter already exists and it's "false"
    if (params.has('isTest') && params.get('isTest') !== 'true') {
      // Set the parameter value to "true"
      params.set('isTest', 'true')
    } else if (!params.has('isTest')) {
      // Add the new parameter if it doesn't exist
      params.append('isTest', 'true')
    }
    // Update the search parameters in the URL
    url.search = params.toString()
    // Navigate to the new URL
    window.location.href = url.toString()
  }

  async test(app: App) {
    console.log('Test #1 html page', app)

    const fpsMonitor = new FPSMonitor()

    const componentsCount = 500
    const elementsCount = 2
    app.addSvgInHtmlComponents(componentsCount, elementsCount)

    app.moveTest()
    const avarageFPS = await fpsMonitor.test(10)
    console.log('avarage FPS:', avarageFPS)
    app.stopDataSource()
    const noDataSourceavarageFPS = await fpsMonitor.test(10)
    console.log('noDataSource AvarageS FPS:', noDataSourceavarageFPS)

    console.table([
      {
        view: 'html',
        components: componentsCount,
        elements: elementsCount,
        dataSource: true,
        note: 'SVG components',
        FPS: avarageFPS,
      },
      {
        view: 'html',
        components: componentsCount,
        elements: elementsCount,
        dataSource: false,
        note: 'SVG components',
        FPS: noDataSourceavarageFPS,
      },
    ])
  }
}

export default PerformanceTest
