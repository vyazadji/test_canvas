import './style.css'
import app_svg from './app_svg.ts'

document.addEventListener('DOMContentLoaded', () => {
  const app = new app_svg(document.querySelector<HTMLDivElement>('#app_svg') as HTMLDivElement)
  app.start()
})
