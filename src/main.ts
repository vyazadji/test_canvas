import './style.css'
import app_html from './html/app'
import app_svg from './svg/app_svg'
import app_canvas from './canvas/app_canvas'
import app_canvasFabric from './canvasFabric/app_canvasFabric'
import app_pixijs from './pixijs/app_pixijs'
import app_canvasKonva from './canvasKonva/app_canvasKonva'
import PerformanceTest from './PerformanceTest'
import { VIEW_TYPE } from './consts'

import app_canvas1 from './appCanvas1/app_canvas1'

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
  const appEl = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement
  if (view === VIEW_TYPE.HTML) {
    app = new app_html(appEl)
    app.start()
  } else if (view === VIEW_TYPE.SVG) {
    app = new app_svg(appEl)
    app.start()
  } else if (view === VIEW_TYPE.CANVAS) {
    app = new app_canvas(appEl)
    app.start()
  } else if (view === VIEW_TYPE.CANVAS_FABRIC) {
    app = new app_canvasFabric(appEl)
    app.start()
  } else if (view === VIEW_TYPE.PIXIJS) {
    app = new app_pixijs(appEl)
    app.start()
  } else if (view === VIEW_TYPE.CANVAS_KONVA) {
    app = new app_canvasKonva(appEl)
    app.start()
  } else if (view === VIEW_TYPE.APP_CANVAS_1) {
    const apps1 = document.getElementById('apps1') as HTMLElement
    apps1.style.display = 'none'

    const apps2 = document.getElementById('apps2') as HTMLElement
    apps2.style.display = 'block'

    const appTest = new app_canvas1(apps2)
    appTest.start()
  } else {
    alert('"view" is unknown. Please set correct view')
    return
  }

  if (test) {
    await performanceTest.runTestCase(app, Number(test), Number(testStep))
  }
})
