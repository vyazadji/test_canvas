import FPSMonitor from './FPSMonitor'
import { addClick } from './utils/helpers'
import type { App } from './type'
import type { AppHTML } from './app'
import Application from './app'
import type { AppSVG } from './app_svg'
import type { AppCanvas } from './app_canvas'
import { VIEW_TYPE } from './consts'

type TestCase = {
  viewType: string
  note: string
  elementsCount: number
  addComponents: (app: App, componentsCount: number, elementsCount?: number) => void
}

type TestCaseResult = {
  viewType: string
  note: string
  isDataSource: boolean
  componentsCount: number
  elementsCount: number
  FPS: number
}

/**
 * This is a test of performance for different technogies
 */
class PerformanceTest {
  testCases: TestCase[]
  testDuration: number // sec
  localStorageKey: string

  constructor() {
    this.testDuration = 2 // sec
    this.localStorageKey = 'performanceTest'

    addClick('startPerformanceTest', () => {
      this.start()
    })

    this.testCases = [
      {
        viewType: VIEW_TYPE.HTML,
        note: 'Html view; html components',
        elementsCount: 2,
        addComponents: (app: App, componentsCount: number, elementsCount = 2) => {
          if (app instanceof Application) {
            app.addSvgInHtmlComponents(componentsCount, elementsCount)
          } else {
            console.warn('Incomplete app type')
          }
        },
      },
      /* {
        viewType: VIEW_TYPE.HTML,
        note: 'Html view; html components',
        elementsCount: 2,
        addComponents: (app: AppHTML, componentsCount: number, elementsCount: number) => {
          app.addSvgInHtmlComponents(componentsCount, elementsCount)
        },
      },
      {
        viewType: VIEW_TYPE.SVG,
        note: 'SVG view',
        elementsCount: 2,
        addComponents: (app: AppSVG, componentsCount: number, elementsCount: number) => {
          app.addSvgComponentsInSvg(componentsCount, elementsCount)
        },
      }, */
      {
        viewType: VIEW_TYPE.CANVAS,
        note: 'Canvas view',
        elementsCount: 2, // NOTE we can't change. In Canvas we can create component only from 2 elements
        addComponents: (app: AppCanvas, componentsCount: number, _el: number) => {
          app.addRawCanvasComponents(componentsCount)
        },
      },
    ]
  }

  start() {
    this.cleanResults()
    //
    // Go To HTML view and run first test
    //
    this.navigateToTest(0)
  }

  async runTestCase(app: App, testNumber: number) {
    console.log(`Test #${testNumber} html page`)

    const fpsMonitor = new FPSMonitor()

    const componentsCount = 50
    const { viewType, note, elementsCount, addComponents } = this.testCases[testNumber]

    // add elements
    addComponents(app, componentsCount, elementsCount)

    // start moving
    app.moveTest()

    // calculate FPS
    const avarageFPS = await fpsMonitor.test(this.testDuration)
    console.log('Avarage FPS:', avarageFPS)

    // stop Data Source
    app.stopDataSource()
    const noDataSourceavarageFPS = await fpsMonitor.test(this.testDuration)
    console.log('No DataSource Avarages FPS:', noDataSourceavarageFPS)

    const results: TestCaseResult[] = [
      {
        viewType,
        componentsCount,
        elementsCount,
        isDataSource: true,
        note,
        FPS: avarageFPS,
      },
      {
        viewType,
        componentsCount,
        elementsCount,
        isDataSource: false,
        note,
        FPS: noDataSourceavarageFPS,
      },
    ]

    this.saveResults(results)

    // got to next test
    if (this.testCases.length === testNumber + 1) {
      // this the last test
      console.log('!!! THIS is the Testing End !!!')
      const allResults = this.getResults()
      console.table(allResults)
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

  //
  // Save/get results from localStorage
  //

  cleanResults(): void {
    // Remove data from localStorage
    localStorage.removeItem(this.localStorageKey)
  }

  saveResults(results: TestCaseResult[]): void {
    // Get data from localStorage
    let data = this.getResults()

    data = [...data, ...results]

    // save in localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(data))
  }

  getResults(): TestCaseResult[] {
    const data: string | null = localStorage.getItem(this.localStorageKey)
    let results: TestCaseResult[] = data ? JSON.parse(data) : null

    if (!results) {
      results = []
    }

    return results
  }
}

export default PerformanceTest
