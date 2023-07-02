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
import app_3_webgl from './app3Webgl/app3_webgl'
import { getElementById } from './utils/helpers'

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
  } else if (view === VIEW_TYPE.APP_2_CANVAS) {
    getElementById('apps1').style.display = 'none'
    const app2El = getElementById('apps3')
    app2El.style.display = 'block'

    const app2 = new app_canvas1(app2El)
    app2.start()
  } else if (view === VIEW_TYPE.APP_3_WEBGL) {
    getElementById('apps1').style.display = 'none'
    const app3El = getElementById('apps3')
    app3El.style.display = 'block'

    const app3 = new app_3_webgl(app3El)
    app3.start()
  } else {
    alert('"view" is unknown. Please set correct view')
    return
  }

  if (test && app) {
    await performanceTest.runTestCase(app, Number(test), Number(testStep))
  }
})
