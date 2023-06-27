import * as PIXI from 'pixi.js'

import type { Component } from './../type'
import ComponentUIPixijs from './ComponentUIPixijs'
import PositionManager from './../utils/PositionManager'

/**
 * Canvas layer
 */
class ViewPixijs {
  height: number
  width: number
  app: PIXI.Application
  components: Component[]
  movedComponents: Component[]
  positionManager: PositionManager

  constructor(height: number, width: number) {
    this.components = []
    this.width = width
    this.height = height

    this.movedComponents = []
    this.positionManager = new PositionManager({
      viewWidth: this.width,
      viewHeight: this.height,
    })

    this.app = new PIXI.Application({ width: this.width, height: this.height })

    // Add zoom by mouse
    // eslint-disable-next-line
    // @ts-ignore
    this.app.view.addEventListener('wheel', (event) => {
      // eslint-disable-next-line
      // @ts-ignore
      if (event.deltaY < 0) {
        // Zoom in
        this.app.stage.scale.x *= 1.1
        this.app.stage.scale.y *= 1.1
      } else {
        // Zoom out
        this.app.stage.scale.x /= 1.1
        this.app.stage.scale.y /= 1.1
      }

      // NOTE
      // If you want to manipulate the rendering at a lower level in PixiJS,
      // you could look into custom shaders, where you have control over the vertex transformations.
      // However, this would require knowledge of GLSL (the shader language used in WebGL)
    })
  }

  getContext(): PIXI.Container<PIXI.DisplayObject> {
    return this.app.stage
  }

  addComponent(component: Component) {
    this.components.push(component)
  }

  start(): PIXI.ICanvas {
    this.components.forEach((component) => {
      component.draw(0)
    })

    this.updateComponentsCount()

    return this.app.view
  }

  updateComponentsCount() {
    const countEl = document.getElementById('componentCount') as HTMLElement
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
    this.movedComponents.forEach((component) => {
      const el = component.getUIElement() as ComponentUIPixijs // TODO create interface movable

      this.positionManager.addPosition(el.x, el.y)
    })

    this.app.ticker.add(() => {
      this.moveElements()
    })
  }

  moveElements() {
    for (let i = 0; i < this.movedComponents.length; i++) {
      // update position
      const [x, y] = this.positionManager.calculateNextPosition(i)

      // set new position
      const el = this.movedComponents[i].getUIElement() as ComponentUIPixijs
      el.move(x, y)
    }
  }

  zoomScale(zoom: number): void {
    this.app.stage.scale.x = zoom
    this.app.stage.scale.y = zoom
  }
}

export default ViewPixijs
