import './style.css'
import app from './app.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Test component decomposition</h1>
    <div id="app1"/>
  </div>
`

const app1 = new app(document.querySelector<HTMLDivElement>('#app1')!)
app1.start()
