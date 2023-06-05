import ViewClass from './View'
import ComponentClass from './Component'
import ComponentUIHtmlClass from './ComponentUIHtml'
import ComponentUISvgClass from './ComponentUISvg'
import ComponentUICanvasClass from './ComponentUICanvas'
import ComponentUICanvasFabricClass from './ComponentUICanvasFabric'
import DateSourceClass from './DataSource'
import CanvasEditor from './CanvasEditor'
import { VIEW_HEIGHT, VIEW_WIDTH } from './consts'

interface App {
  appElement: HTMLElement
}

class Application implements App {
  appElement: HTMLElement

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
  }

  start() {
    // View
    const view = new ViewClass(VIEW_HEIGHT, VIEW_WIDTH)

    // component1
    const componentHtmlUi = new ComponentUIHtmlClass()
    const component1 = new ComponentClass(componentHtmlUi)

    const dataSource1 = new DateSourceClass()
    component1.addSource(dataSource1)

    view.addComponent(component1)

    //
    const dataSource2 = new DateSourceClass()

    // Canvas editor
    const canvasEditor = new CanvasEditor()
    canvasEditor.onAddElement = (serializedCanvas, componentsCount) => {
      for (let i = 0; i < componentsCount; i++) {
        const componentFabricCanvas = new ComponentUICanvasFabricClass(serializedCanvas)
        const component3 = new ComponentClass(componentFabricCanvas)

        component3.addSource(dataSource2)
        view.addComponent(component3)
      }
      view.start()
    }

    // SVG components
    const addSvgButton = document.getElementById('addSvgComponents') as HTMLButtonElement

    addSvgButton.addEventListener('click', () => {
      const svgElementsCountEl = document.getElementById('SvgElementsCount') as HTMLInputElement
      const svgComponentsCountEl = document.getElementById('SvgComponentsCount') as HTMLInputElement

      const svgElementsCount = Number(svgElementsCountEl.value)
      const svgComponentsCount = Number(svgComponentsCountEl.value)

      for (let i = 0; i < svgComponentsCount; i++) {
        const componentSvgUI = new ComponentUISvgClass(svgElementsCount)
        const component = new ComponentClass(componentSvgUI)

        component.addSource(dataSource2)
        view.addComponent(component)
      }
      view.start()
    })

    // Canvas components
    const addCanvasButton = document.getElementById('addCanvasComponents') as HTMLButtonElement

    addCanvasButton.addEventListener('click', () => {
      const canvasComponentsCountEl = document.getElementById('canvasComponentsCount') as HTMLInputElement
      const componentsCount = Number(canvasComponentsCountEl.value)

      for (let i = 0; i < componentsCount; i++) {
        const componentCanvasUI = new ComponentUICanvasClass()
        const component = new ComponentClass(componentCanvasUI)

        component.addSource(dataSource2)

        view.addComponent(component)
      }
      view.start()
    })

    // Move Test
    const moveTestButton = document.getElementById('startMoveTest') as HTMLButtonElement
    moveTestButton.addEventListener('click', () => {
      view.moveTest()
    })

    // start View
    this.appElement.appendChild(view.start())

    // start DataSources
    dataSource1.start()
    dataSource2.start()
  }
}

export default Application
