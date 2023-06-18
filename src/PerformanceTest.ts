import FPSMonitor from './FPSMonitor'
import { addClick } from './utils/helpers'
import type { App } from './type'
import { VIEW_TYPE } from './consts'

type TestCase = {
  viewType: string
  note: string
  componentsCount: number | number[]
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

const FPS_THRESHOLD = 25 // FPS
const TEST_DURATION = 5 // sec

const componentsCountSteps = [50, 500, 1000, 2000, 3000, 5000, 6000]

const TEST_CASES: TestCase[] = [
  //
  // HTML view
  //
  {
    viewType: VIEW_TYPE.HTML,
    note: 'Html view with HTML components',
    componentsType: 'HTML',
    componentsCount: componentsCountSteps,
    elementsCount: 2,
  },
  {
    viewType: VIEW_TYPE.HTML,
    note: 'Html view with HTML components. Dependence on the number of elements',
    componentsType: 'HTML',
    componentsCount: componentsCountSteps,
    elementsCount: 20,
  },
  {
    viewType: VIEW_TYPE.HTML,
    note: 'Html view with SVG components',
    componentsType: 'SVG',
    componentsCount: componentsCountSteps,
    elementsCount: 2,
  },

  //
  // SVG view
  //
  {
    viewType: VIEW_TYPE.SVG,
    note: 'SVG view',
    componentsType: 'SVG',
    componentsCount: componentsCountSteps,
    elementsCount: 2,
  },
  {
    viewType: VIEW_TYPE.SVG,
    note: 'SVG view; Dependence on the number of elements',
    componentsType: 'SVG',
    componentsCount: componentsCountSteps,
    elementsCount: 20,
  },
  //
  // Canvas view
  //
  {
    viewType: VIEW_TYPE.CANVAS,
    note: 'Canvas view',
    componentsType: 'Canvas',
    componentsCount: componentsCountSteps,
    elementsCount: 2, // NOTE we can't change. In Canvas we can create component only from 2 elements
  },

  //
  // HTML view with Canvas in each component
  //
  {
    viewType: VIEW_TYPE.HTML,
    note: 'Html view with Canvas components',
    componentsType: 'Canvas',
    componentsCount: componentsCountSteps,
    elementsCount: 2,
  },
  {
    // the last test with 1 component is to cleanup resources
    viewType: VIEW_TYPE.HTML,
    note: 'Html view with Canvas components',
    componentsType: 'Canvas',
    componentsCount: 1,
    elementsCount: 2, // NOTE we can't change. In Canvas we can create component only from 2 elements
  },
]

/**
 * This is a test of performance for different technogies
 */
class PerformanceTest {
  localStorageKey: string

  constructor() {
    this.localStorageKey = 'performanceTest'

    addClick('startPerformanceTest', () => {
      this.start()
    })
  }

  start() {
    this.cleanResults()
    this.navigateToTest(0)
  }

  async runTestCase(app: App, testNumber: number, testStep: number) {
    const { viewType, note, componentsType, componentsCount, elementsCount } = TEST_CASES[testNumber]

    let componentsCountCurrentStep: number
    if (Array.isArray(componentsCount)) {
      componentsCountCurrentStep = componentsCount[testStep]
    } else {
      componentsCountCurrentStep = componentsCount
    }

    console.log(
      `Test #${testNumber} View type:${viewType}; Component type:${componentsType}; Components:${componentsCountCurrentStep} ; Elements:${elementsCount}`
    )

    const fpsMonitor = new FPSMonitor()

    // add elements
    app.addComponents(componentsType, componentsCountCurrentStep, elementsCount)

    // start moving
    app.moveTest()

    // calculate FPS
    const averageFPS = await fpsMonitor.test(TEST_DURATION)
    console.log('Average FPS:', averageFPS)

    console.log('Disable DataSource')
    // stop Data Source
    app.stopDataSource()
    const noDataSourceAverageFPS = await fpsMonitor.test(TEST_DURATION)
    console.log('No DataSource Averages FPS:', noDataSourceAverageFPS)

    const results: TestCaseResult[] = [
      {
        viewType,
        note,
        componentsCount: componentsCountCurrentStep,
        elementsCount,
        isDataSource: true,
        FPS: averageFPS,
      },
      {
        viewType,
        note,
        componentsCount: componentsCountCurrentStep,
        elementsCount,
        isDataSource: false,
        FPS: noDataSourceAverageFPS,
      },
    ]

    this.saveResults(results)

    //
    // Calculate next test or testStep
    //
    const isFpsHigherThreshold = noDataSourceAverageFPS > FPS_THRESHOLD
    const isStepsTest = Array.isArray(componentsCount) // TODO refactor name
    const hasNextStep = isStepsTest && testStep + 1 < componentsCount.length
    if (isFpsHigherThreshold && isStepsTest && hasNextStep) {
      // we have next step and
      console.log('Go to next test step:', testStep + 1)
      this.navigateToTest(testNumber, viewType, testStep + 1)
    } else if (TEST_CASES.length === testNumber + 1) {
      // this the last test
      console.log('All test cases are finisined!')
      console.warn(
        'Copy all the results and transfer them to a general table including the characteristics of your hardware'
      )
      const allResults = this.getResults()
      console.table(allResults)
    } else {
      // got to the next test
      console.log('Go to next test case')
      const nextVewType = TEST_CASES[testNumber + 1].viewType

      this.navigateToTest(testNumber + 1, nextVewType)
    }
  }

  /**
   * waits for a specified number of seconds
   * Need to give time for browser to clear resources from the previous test
   */
  /* sleep(seconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
  } */

  navigateToTest(test = 0, view: string = VIEW_TYPE.HTML, testStep = 0) {
    // Create a URL object with the current location
    const url = new URL(window.location.href)
    // Get the existing search parameters
    const params = new URLSearchParams(url.search)

    // Check if "test" parameter already exists
    if (params.has('test')) {
      params.set('test', test.toString())
    } else if (!params.has('test')) {
      // Add the new parameter if it doesn't exist
      params.append('test', test.toString())
    }

    // Check if "testStep" parameter already exists
    if (params.has('testStep')) {
      params.set('testStep', testStep.toString())
    } else if (!params.has('testStep')) {
      // Add the new parameter if it doesn't exist
      params.append('testStep', testStep.toString())
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
