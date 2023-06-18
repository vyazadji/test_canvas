import FPSMonitor from './FPSMonitor'
import { addClick } from './utils/helpers'
import type { App } from './type'
import { VIEW_TYPE } from './consts'

type TestCase = {
  viewType: string
  note: string
  componentsCount: number
  elementsCount: number
  componentsType: string
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
    this.testDuration = 4 // sec
    this.localStorageKey = 'performanceTest'

    addClick('startPerformanceTest', () => {
      this.start()
    })

    this.testCases = [
      //
      // HTML view
      //
      {
        viewType: VIEW_TYPE.HTML,
        note: 'Html view with HTML components',
        componentsType: 'HTML',
        componentsCount: 100,
        elementsCount: 2,
      },
      {
        viewType: VIEW_TYPE.HTML,
        note: 'Html view with HTML components',
        componentsType: 'HTML',
        componentsCount: 500,
        elementsCount: 2,
      },
      {
        viewType: VIEW_TYPE.HTML,
        note: 'Html view with HTML components',
        componentsType: 'HTML',
        componentsCount: 1000,
        elementsCount: 2,
      },
      {
        viewType: VIEW_TYPE.HTML,
        note: 'Html view with HTML components',
        componentsType: 'HTML',
        componentsCount: 2000,
        elementsCount: 2,
      },
      {
        viewType: VIEW_TYPE.HTML,
        note: 'Html view with HTML components',
        componentsType: 'HTML',
        componentsCount: 3000,
        elementsCount: 2,
      },
      {
        viewType: VIEW_TYPE.HTML,
        note: 'Html view with HTML components. Dependence on the number of elements',
        componentsType: 'HTML',
        componentsCount: 500,
        elementsCount: 10,
      },
      {
        viewType: VIEW_TYPE.HTML,
        note: 'Html view with SVG components',
        componentsType: 'SVG',
        componentsCount: 100,
        elementsCount: 2,
      },
      {
        viewType: VIEW_TYPE.HTML,
        note: 'Html view with SVG components',
        componentsType: 'SVG',
        componentsCount: 500,
        elementsCount: 2,
      },
      {
        viewType: VIEW_TYPE.HTML,
        note: 'Html view with SVG components',
        componentsType: 'SVG',
        componentsCount: 2000,
        elementsCount: 2,
      },
      {
        viewType: VIEW_TYPE.HTML,
        note: 'Html view with Canvas components',
        componentsType: 'Canvas',
        componentsCount: 100,
        elementsCount: 2,
      },
      {
        viewType: VIEW_TYPE.HTML,
        note: 'Html view with Canvas components',
        componentsType: 'Canvas',
        componentsCount: 500,
        elementsCount: 2,
      },
      {
        viewType: VIEW_TYPE.HTML,
        note: 'Html view with Canvas components',
        componentsType: 'Canvas',
        componentsCount: 2000,
        elementsCount: 2,
      },
      //
      // SVG view
      //
      {
        viewType: VIEW_TYPE.SVG,
        note: 'SVG view',
        componentsType: 'SVG',
        componentsCount: 100,
        elementsCount: 2,
      },
      {
        viewType: VIEW_TYPE.SVG,
        note: 'SVG view',
        componentsType: 'SVG',
        componentsCount: 500,
        elementsCount: 2,
      },
      {
        viewType: VIEW_TYPE.SVG,
        note: 'SVG view',
        componentsType: 'SVG',
        componentsCount: 1000,
        elementsCount: 2,
      },
      {
        viewType: VIEW_TYPE.SVG,
        note: 'SVG view',
        componentsType: 'SVG',
        componentsCount: 2000,
        elementsCount: 2,
      },
      {
        viewType: VIEW_TYPE.SVG,
        note: 'SVG view',
        componentsType: 'SVG',
        componentsCount: 3000,
        elementsCount: 2,
      },
      {
        viewType: VIEW_TYPE.SVG,
        note: 'SVG view',
        componentsType: 'SVG',
        componentsCount: 5000,
        elementsCount: 2,
      },
      {
        viewType: VIEW_TYPE.SVG,
        note: 'SVG view. Dependence on the number of elements',
        componentsType: 'SVG',
        componentsCount: 500,
        elementsCount: 10,
      },
      //
      // Canvas view
      //
      {
        viewType: VIEW_TYPE.CANVAS,
        note: 'Canvas view',
        componentsType: 'Canvas',
        componentsCount: 100,
        elementsCount: 2, // NOTE we can't change. In Canvas we can create component only from 2 elements
      },
      {
        viewType: VIEW_TYPE.CANVAS,
        note: 'Canvas view',
        componentsType: 'Canvas',
        componentsCount: 500,
        elementsCount: 2, // NOTE we can't change. In Canvas we can create component only from 2 elements
      },
      {
        viewType: VIEW_TYPE.CANVAS,
        note: 'Canvas view',
        componentsType: 'Canvas',
        componentsCount: 1000,
        elementsCount: 2, // NOTE we can't change. In Canvas we can create component only from 2 elements
      },
      {
        viewType: VIEW_TYPE.CANVAS,
        note: 'Canvas view',
        componentsType: 'Canvas',
        componentsCount: 2000,
        elementsCount: 2, // NOTE we can't change. In Canvas we can create component only from 2 elements
      },
      {
        viewType: VIEW_TYPE.CANVAS,
        note: 'Canvas view',
        componentsType: 'Canvas',
        componentsCount: 3000,
        elementsCount: 2, // NOTE we can't change. In Canvas we can create component only from 2 elements
      },
      {
        viewType: VIEW_TYPE.CANVAS,
        note: 'Canvas view',
        componentsType: 'Canvas',
        componentsCount: 5000,
        elementsCount: 2, // NOTE we can't change. In Canvas we can create component only from 2 elements
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
    const { viewType, note, componentsType, componentsCount, elementsCount } = this.testCases[testNumber]

    console.log(
      `Test #${testNumber} View type:${viewType}; Component type:${componentsType}; Components:${componentsCount} ; Elements:${elementsCount}`
    )

    const fpsMonitor = new FPSMonitor()

    // add elements
    app.addComponents(componentsType, componentsCount, elementsCount)

    // start moving
    app.moveTest()

    // calculate FPS
    const avarageFPS = await fpsMonitor.test(this.testDuration)
    console.log('Avarage FPS:', avarageFPS)

    console.log('Disable DataSource')
    // stop Data Source
    app.stopDataSource()
    const noDataSourceavarageFPS = await fpsMonitor.test(this.testDuration)
    console.log('No DataSource Avarages FPS:', noDataSourceavarageFPS)

    const results: TestCaseResult[] = [
      {
        viewType,
        note,
        componentsCount,
        elementsCount,
        isDataSource: true,
        FPS: avarageFPS,
      },
      {
        viewType,
        note,
        componentsCount,
        elementsCount,
        isDataSource: false,
        FPS: noDataSourceavarageFPS,
      },
    ]

    this.saveResults(results)

    // got to next test
    if (this.testCases.length === testNumber + 1) {
      // this the last test
      console.log('Test is finisined! ')
      console.warn(
        'Copy all the results and transfer them to a general table including the characteristics of your hardware'
      )
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
