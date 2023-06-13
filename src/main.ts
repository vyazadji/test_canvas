import './style.css'
import app_html from './app'
import app_svg from './app_svg'
import app_canvas from './app_canvas'

const VIEW = {
  HTML: 'html',
  SVG: 'svg',
  CANVAS: 'canvas',
} as const

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search)
  const view = urlParams.get('view') || VIEW.HTML

  // set view name in header
  const viewNameEl = document.getElementById('viewName') as HTMLElement
  viewNameEl.innerText = view

  // show settings
  const settings: NodeListOf<HTMLDivElement> = document.querySelectorAll(`.view_${view}_only`)
  settings.forEach((setting: HTMLDivElement) => {
    setting.style.display = 'block'
  })

  // start app
  if (view === VIEW.HTML) {
    const app = new app_html(document.querySelector<HTMLDivElement>('#app') as HTMLDivElement)
    app.start()
  } else if (view === VIEW.SVG) {
    const app = new app_svg(document.querySelector<HTMLDivElement>('#app') as HTMLDivElement)
    app.start()
  } else if (view === VIEW.CANVAS) {
    const app = new app_canvas(document.querySelector<HTMLDivElement>('#app') as HTMLDivElement)
    app.start()
  } else {
    alert('"view" is unknown. Please set correct view')
    return
  }
})
