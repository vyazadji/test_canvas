import Konva from 'konva'

import type { Component } from './../type'
import PositionManager from './../utils/PositionManager'
import ComponentUICanvasKonvaClass from './ComponentUICanvasKonva'

/**
 * Canvas layer
 */
class ViewCanvasKonvaDashboard {
  height: number
  width: number
  stage: Konva.Stage
  layer: Konva.Layer

  components: Component[]
  movedComponents: Component[]
  positionManager: PositionManager

  constructor(height: number, width: number, appElement: HTMLDivElement) {
    this.components = []
    this.width = width
    this.height = height

    this.movedComponents = []
    this.positionManager = new PositionManager({
      viewWidth: this.width,
      viewHeight: this.height,
    })

    this.stage = new Konva.Stage({
      container: appElement,
      width: this.width,
      height: this.height,
    })

    // then create layer
    this.layer = new Konva.Layer()

    this.stage.add(this.layer)

    // zoom in / out
    // by mouse
    window.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault()

        const stage = this.stage

        const oldScale = stage.scaleX()

        const mousePointTo = {
          x: stage.getPointerPosition()!.x / oldScale - stage.x() / oldScale,
          y: stage.getPointerPosition()!.y / oldScale - stage.y() / oldScale,
        }

        const newScale = e.deltaY > 0 ? oldScale * 1.1 : oldScale / 1.1
        stage.scale({ x: newScale, y: newScale })

        const newPos = {
          x: -(mousePointTo.x - stage.getPointerPosition()!.x / newScale) * newScale,
          y: -(mousePointTo.y - stage.getPointerPosition()!.y / newScale) * newScale,
        }
        stage.position(newPos)
        stage.batchDraw()
      },
      { passive: false }
    )
  }

  getLayer(): Konva.Layer {
    return this.layer
  }

  addComponent(component: Component) {
    this.components.push(component)
  }

  start() {
    // clear all
    // this.canvas.clearContext()

    this.components.forEach((component) => {
      component.draw(0)
    })

    // this.canvas.renderAll()

    this.updateComponentsCount()

    return undefined
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
      const el = component.getUIElement() as ComponentUICanvasKonvaClass

      this.positionManager.addPosition(el.x, el.y)
    })

    this.moveElements()

    // TODO need to test this approach
    /* const anim = new Konva.Animation((frame) => {
      // const time = frame.time,
      //   timeDiff = frame.timeDiff,
      //   frameRate = frame.frameRate

      for (let i = 0; i < this.movedComponents.length; i++) {
        // update position
        const [x, y] = this.positionManager.calculateNextPosition(i)

        const dist = x * (frame.timeDiff / 1000)

        // set new position
        const el = this.movedComponents[i].getUIElement() as ComponentUICanvasKonvaClass
        el.move(dist, 0)
      }
    }, this.layer)

    anim.start() */
  }

  moveElements() {
    for (let i = 0; i < this.movedComponents.length; i++) {
      // update position
      const [x, y] = this.positionManager.calculateNextPosition(i)

      // set new position
      const el = this.movedComponents[i].getUIElement() as ComponentUICanvasKonvaClass
      el.figure.position({ x, y })
    }
    requestAnimationFrame(() => this.moveElements()) // Continue moving element in the next frame
  }

  zoomTransform(zoom: number): void {
    this.stage.scale({ x: zoom, y: zoom })
    const newPos = {
      x: this.stage.width() / 2 - (this.stage.width() / 2) * zoom,
      y: this.stage.height() / 2 - (this.stage.height() / 2) * zoom,
    }
    this.stage.position(newPos)
    this.stage.batchDraw()
  }
}

export default ViewCanvasKonvaDashboard
