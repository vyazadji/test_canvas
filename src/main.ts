import './style.css'
import app_html from './html/app'
import app_svg from './svg/app_svg'
import app_canvas from './canvas/app_canvas'
import app_canvasFabric from './canvasFabric/app_canvasFabric'
import app_pixijs from './pixijs/app_pixijs'
import app_canvasKonva from './canvasKonva/app_canvasKonva'
import PerformanceTest from './PerformanceTest'
import { VIEW_TYPE } from './consts'

import app_2_canvas from './app2Canvas/app2_canvas'
import app_3_webgl from './app3Webgl/app3_webgl'
import app_4_offscreenCanvas from './app4OffscreenCanvas/app4_offscreenCanvas'
import app_5_multilayer from './app5MultiLayer/app5_multilayer'

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
    const appEl = getElementById('apps2')
    appEl.style.display = 'block'

    const app = new app_2_canvas(appEl)
    app.start()
  } else if (view === VIEW_TYPE.APP_3_WEBGL) {
    getElementById('apps1').style.display = 'none'
    const appEl = getElementById('apps3')
    appEl.style.display = 'block'

    const app = new app_3_webgl(appEl)
    app.start()
  } else if (view === VIEW_TYPE.APP_4_OFFSCREEN_CANVAS) {
    getElementById('apps1').style.display = 'none'

    const appEl = getElementById('apps4')
    appEl.style.display = 'block'

    const app = new app_4_offscreenCanvas(appEl)
    app.start()
  } else if (view === VIEW_TYPE.APP_5_MULTILAYER) {
    getElementById('apps1').style.display = 'none'

    const appEl = getElementById('apps5')
    appEl.style.display = 'block'

    const app = new app_5_multilayer(appEl)
    app.start()
  } else {
    alert('"view" is unknown. Please set correct view')
    return
  }

  if (test && app) {
    await performanceTest.runTestCase(app, Number(test), Number(testStep))
  }
})
