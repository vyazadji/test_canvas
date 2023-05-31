import './style.css'
import app from './app.ts'

document.addEventListener('DOMContentLoaded', () => {
  const app1 = new app(document.querySelector<HTMLDivElement>('#app1') as HTMLDivElement)
  app1.start()
})
