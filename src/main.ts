import './style.css'
import app from './app.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Test component decomposition</h1>
    <div id="view1"/>
  </div>
`

const app1 = new app(document.querySelector<HTMLDivElement>('#view1')!)
app1.start()
