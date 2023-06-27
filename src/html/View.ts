import { random } from 'lodash'

import Draggable from './../utils/Dragable'
import PositionManager from './../utils/PositionManager'

import type { Component } from './../type'

import { COMPONENT_HEIGHT, COMPONENT_WIDTH } from './../consts'

class ViewDashboard {
  height: number
  width: number
  containerEl: HTMLElement
  components: Component[]
  wrappers: HTMLElement[]
  movedComponents: HTMLElement[]
  positionManager: PositionManager

  constructor(height: number, width: number) {
    this.components = []
    this.wrappers = []
    this.height = height
    this.width = width

    this.movedComponents = []
    this.positionManager = new PositionManager({
      viewWidth: this.width,
      viewHeight: this.height,
    })

    const domElement = document.createElement('div')
    domElement.style.border = '1px solid red'
    domElement.style.height = height + 'px'
    domElement.style.width = width + 'px'
    domElement.style.position = 'relative'

    // test. Don't see any changes
    // domElement.style.willChange = 'transform'

    this.containerEl = domElement
  }

  addComponent(component: Component) {
    this.components.push(component)
  }

  private getComponentWrapper(): HTMLElement {
    const componentDomWrapper = document.createElement('div')
    this.wrappers.push(componentDomWrapper)
    componentDomWrapper.style.border = '1px solid green'

    componentDomWrapper.style.height = COMPONENT_HEIGHT + 'px'
    componentDomWrapper.style.width = COMPONENT_WIDTH + 'px'

    componentDomWrapper.style.position = 'absolute'
    // componentDomWrapper.style.display = 'block' // Test performance for different display values

    componentDomWrapper.style.top = random(this.height - COMPONENT_HEIGHT) + 'px'
    componentDomWrapper.style.left = random(this.width - COMPONENT_WIDTH) + 'px'

    // test. Don't see any changes
    // componentDomWrapper.style.willChange = 'transform'

    return componentDomWrapper
  }

  /**
   * Start move test
   * All wrappers of elements will be moved progrmatically
   */
  moveTest(movedComponentsCount = 0) {
    this.movedComponents = this.wrappers
    if (movedComponentsCount !== 0) {
      // 0 - means all components
      this.movedComponents = this.wrappers.slice(0, movedComponentsCount)
    }
    this.movedComponents.forEach((el) => {
      // get positions
      const x = el.style.left
      const y = el.style.top

      this.positionManager.addPosition(parseInt(x, 10), parseInt(y, 10))
    })

    this.moveElements()
  }

  moveElements() {
    for (let i = 0; i < this.movedComponents.length; i++) {
      // update position
      const [x, y] = this.positionManager.calculateNextPosition(i)

      // apply new position
      const el = this.movedComponents[i] as HTMLElement
      el.style.left = x + 'px'
      el.style.top = y + 'px'
    }

    requestAnimationFrame(() => this.moveElements()) // Continue moving element in the next frame
  }

  /**
   * Start move test 2
   * All wrappers of elements will be moved progrmatically
   */
  moveTest2(movedComponentsCount = 0) {
    this.movedComponents = this.wrappers
    if (movedComponentsCount !== 0) {
      // 0 - means all components
      this.movedComponents = this.wrappers.slice(0, movedComponentsCount)
    }
    this.movedComponents.forEach((el) => {
      // get positions
      const x = el.style.left
      const y = el.style.top

      this.positionManager.addPosition(parseInt(x, 10), parseInt(y, 10))

      // reset position -> migrate to translate
      el.style.left = '0'
      el.style.top = '0'
      el.style.transform = `translate(${x}, ${y})`
    })

    this.moveElements2()
  }

  moveElements2() {
    for (let i = 0; i < this.movedComponents.length; i++) {
      // update position
      const [x, y] = this.positionManager.calculateNextPosition(i)

      const el = this.movedComponents[i] as HTMLElement
      el.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    }

    requestAnimationFrame(() => this.moveElements2())
  }
  //
  // /move2
  //

  start() {
    this.containerEl.innerHTML = '' // clear
    for (let index = 0; index < this.components.length; index++) {
      const componentElement = this.components[index].getUIElement() as HTMLElement
      const wrapperEl = this.getComponentWrapper()
      wrapperEl.appendChild(componentElement)
      this.containerEl.appendChild(wrapperEl)
    }

    new Draggable(this.containerEl)
    this.updateComponentsCount()
    return this.containerEl
  }

  updateComponentsCount() {
    const countEl = document.getElementById('componentCount') as HTMLButtonElement
    countEl.innerText = this.components.length.toString()
  }

  zoomTransform(zoom: number): void {
    this.containerEl.style.transform = `scale(${zoom})`
  }
}

export default ViewDashboard
