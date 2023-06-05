import ViewSVGClass from './ViewSVG'
import ComponentClass from './Component'
import ComponentUISvgClass from './ComponentUISvg'
import DateSourceClass from './DataSource'
//
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
    const view = new ViewSVGClass(VIEW_HEIGHT, VIEW_WIDTH)

    const dataSource1 = new DateSourceClass()
    const dataSource2 = new DateSourceClass()

    // Add Svg Grouped component
    const addSvgButton = document.getElementById('addSvgComponents') as HTMLButtonElement

    addSvgButton.addEventListener('click', () => {
      const svgElementsCountEl = document.getElementById('SvgElementsCount') as HTMLInputElement
      const svgComponentsCountEl = document.getElementById('SvgComponentsCount') as HTMLInputElement

      const svgElementsCount = Number(svgElementsCountEl.value)
      const svgComponentsCount = Number(svgComponentsCountEl.value)

      for (let i = 0; i < svgComponentsCount; i++) {
        const componentSvgUI = new ComponentUISvgClass(svgElementsCount, 'g')
        const component = new ComponentClass(componentSvgUI)

        component.addSource(dataSource2)
        view.addComponent(component)
      }
      view.start()
    })

    this.appElement.appendChild(view.start())

    // start DataSources
    dataSource1.start()
    dataSource2.start()
  }
}

export default Application
