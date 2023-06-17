import FPSMonitor from './FPSMonitor'
import { addClick } from './utils/helpers'
import type { App } from './type'
import type { AppHTML } from './app'
import type { AppSVG } from './app_svg'
import type { AppCanvas } from './app_canvas'
import { VIEW_TYPE } from './consts'

/**
 * This is a test of performance for different technogies
 */
class PerformanceTest {
  testCases: object[]
  testDuration: number // sec

  constructor() {
    this.testDuration = 2 // sec

    addClick('startPerformanceTest', () => {
      this.start()
    })

    this.testCases = [
      {
        viewType: VIEW_TYPE.HTML,
        name: 'Html view; html components',
        test: (app: AppHTML) => {
          const componentsCount = 5
          const elementsCount = 2
          app.addSvgInHtmlComponents(componentsCount, elementsCount)
        },
      },
      {
        viewType: VIEW_TYPE.HTML,
        name: 'Html view; html components',
        test: (app: AppHTML) => {
          const componentsCount = 500
          const elementsCount = 2
          app.addSvgInHtmlComponents(componentsCount, elementsCount)
        },
      },
      {
        viewType: VIEW_TYPE.SVG,
        name: 'SVG view',
        test: (app: AppSVG) => {
          const componentsCount = 20
          const elementsCount = 2
          app.addSvgComponentsInSvg(componentsCount, elementsCount)
        },
      },
      {
        viewType: VIEW_TYPE.CANVAS,
        name: 'SVG view',
        test: (app: AppCanvas) => {
          const componentsCount = 5
          app.addRawCanvasComponents(componentsCount)
        },
      },
    ]
  }

  start() {
    //
    // Go To first HTML view and add "isTest"
    //
    this.navigateToTest(0)
  }

  async runTestCase(app: App, testNumber: number) {
    console.log(`Test #${testNumber} html page`)

    const fpsMonitor = new FPSMonitor()

    const currentViewType = this.testCases[testNumber].viewType
    const currentTestRun = this.testCases[testNumber].test

    currentTestRun(app)
    app.moveTest()
    const avarageFPS = await fpsMonitor.test(this.testDuration)
    console.log('avarage FPS:', avarageFPS)
    app.stopDataSource()
    const noDataSourceavarageFPS = await fpsMonitor.test(this.testDuration)
    console.log('noDataSource AvarageS FPS:', noDataSourceavarageFPS)

    console.table([
      {
        view: currentViewType,
        // components: componentsCount,
        // elements: elementsCount,
        dataSource: true,
        note: 'SVG components',
        FPS: avarageFPS,
      },
      {
        view: currentViewType,
        // components: componentsCount,
        // elements: elementsCount,
        dataSource: false,
        note: 'SVG components',
        FPS: noDataSourceavarageFPS,
      },
    ])

    // got to next test
    if (this.testCases.length === testNumber + 1) {
      // this the last test
      console.log('!!! THIS is the Testing End !!!')
    } else {
      // got to the next test
      const nextVewType = this.testCases[testNumber + 1].viewType

      this.navigateToTest(testNumber + 1, nextVewType)
    }
  }

  navigateToTest(test = 0, view: string = VIEW_TYPE.HTML) {
    // Create a URL object with the current location
    const url = new URL(window.location.href)
    // Get the existing search parameters
    const params = new URLSearchParams(url.search)

    // Check if "test" parameter already exists
    if (params.has('test')) {
      params.set('test', test.toString())
    } else if (!params.has('test')) {
      // Add the new parameter if it doesn't exist
      params.append('test', '0')
    }
    params.set('view', view) // in any case
    // Update the search parameters in the URL
    url.search = params.toString()

    // Navigate to the new URL with test = 0
    window.location.href = url.toString()
  }
}

export default PerformanceTest
