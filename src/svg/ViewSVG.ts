import type { Component } from './../type'
import PositionManager from './../utils/PositionManager'

const SVGNS = 'http://www.w3.org/2000/svg'

/**
 * SVG layer
 */
class ViewSvgDashboard {
  height: number
  width: number
  containerEl: SVGElement
  components: Component[]
  movedComponents: Component[]
  positionManager: PositionManager

  constructor(height: number, width: number) {
    this.components = []
    this.height = height
    this.width = width

    this.movedComponents = []
    this.positionManager = new PositionManager({
      viewWidth: this.width,
      viewHeight: this.height,
    })

    this.containerEl = document.createElementNS(SVGNS, 'svg')
    this.containerEl.setAttribute('height', this.height.toString())
    this.containerEl.setAttribute('width', this.width.toString())
    this.containerEl.style.border = '1px solid red'
  }

  addComponent(component: Component) {
    this.components.push(component)
  }

  start() {
    this.containerEl.innerHTML = '' // clear
    for (let index = 0; index < this.components.length; index++) {
      const componentElement = this.components[index].getUIElement() as SVGElement
      this.containerEl.appendChild(componentElement)
    }

    // new Draggable(this.containerEl)
    this.updateComponentsCount()

    return this.containerEl
  }

  updateComponentsCount() {
    const countEl = document.getElementById('componentCount') as HTMLButtonElement
    countEl.innerText = this.components.length.toString()
  }

  /**
   * Start move test
   * All components be moved progrmatically
   */
  moveTest(movedComponentsCount = 0) {
    this.movedComponents = this.components
    if (movedComponentsCount !== 0) {
      // 0 - means all components
      this.movedComponents = this.components.slice(0, movedComponentsCount)
    }

    // Get positions from moved components
    this.movedComponents.forEach((component) => {
      const el = component.getUIElement() as SVGElement

      // save current position
      const transform = el.getAttribute('transform') as string
      const matches = /translate\((.*?),(.*?)\)/.exec(transform)
      const x = matches ? parseFloat(matches[1]) : 0
      const y = matches ? parseFloat(matches[2]) : 0

      this.positionManager.addPosition(x, y)
    })
    this.moveElements()
  }

  moveElements() {
    // calculate new positions
    for (let i = 0; i < this.movedComponents.length; i++) {
      // update position
      const [x, y] = this.positionManager.calculateNextPosition(i)

      // set new position
      const el = this.movedComponents[i].getUIElement() as SVGElement
      const translate = 'translate(' + x + ', ' + y + ')'
      // Update element's position
      el.setAttribute('transform', translate)
    }

    requestAnimationFrame(() => this.moveElements()) // Continue moving element in the next frame
  }

  zoomTransform(zoom: number): void {
    this.containerEl.style.transform = `scale(${zoom})`
  }

  zoomViewBox(zoom: number): void {
    const zoomX = this.height / zoom
    const zoomY = this.width / zoom
    this.containerEl.setAttribute('viewBox', `0 0 ${zoomX} ${zoomY}`)
  }
}

export default ViewSvgDashboard
