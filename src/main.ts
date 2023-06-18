import './style.css'
import app_html from './app'
import app_svg from './app_svg'
import app_canvas from './app_canvas'
import PerformanceTest from './PerformanceTest'
import { VIEW_TYPE } from './consts'

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const view = urlParams.get('view') || VIEW_TYPE.HTML
  const test = urlParams.get('test') || null
  const testStep = urlParams.get('testStep') || 0

  const performanceTest = new PerformanceTest()

  // set view name in header
  const viewNameEl = document.getElementById('viewName') as HTMLElement
  viewNameEl.innerText = view

  // show settings
  const settings: NodeListOf<HTMLDivElement> = document.querySelectorAll(`.view_${view}_only`)
  settings.forEach((setting: HTMLDivElement) => {
    setting.style.display = 'block'
  })

  // start app
  let app
  if (view === VIEW_TYPE.HTML) {
    app = new app_html(document.querySelector<HTMLDivElement>('#app') as HTMLDivElement)
    app.start()
  } else if (view === VIEW_TYPE.SVG) {
    app = new app_svg(document.querySelector<HTMLDivElement>('#app') as HTMLDivElement)
    app.start()
  } else if (view === VIEW_TYPE.CANVAS) {
    app = new app_canvas(document.querySelector<HTMLDivElement>('#app') as HTMLDivElement)
    app.start()
  } else {
    alert('"view" is unknown. Please set correct view')
    return
  }

  if (test) {
    await performanceTest.runTestCase(app, Number(test), Number(testStep))
  }
})
