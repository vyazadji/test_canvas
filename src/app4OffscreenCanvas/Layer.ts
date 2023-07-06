/**
 * Implementation a independent Canvas Layer
 * Use OffscreenCanvas in a Worker
 */
class Layer {
  canvas: HTMLCanvasElement

  height: number
  width: number

  worker: Worker

  constructor(width: number, height: number) {
    this.width = width
    this.height = height

    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.style.position = 'absolute'

    // convert to offscreen
    const offscreen: OffscreenCanvas = <OffscreenCanvas>this.canvas.transferControlToOffscreen()

    this.worker = new Worker(new URL('./LayerWorker.ts', import.meta.url), { type: 'module' })

    this.worker.postMessage({ canvas: offscreen }, [offscreen]) // Transfer the OffscreenCanvas to the worker
  }

  getCanvas() {
    return this.canvas
  }

  addComponent(id: string, index: number) {
    // TODO need to also set type of UI element
    this.worker.postMessage({
      command: 'addComponent',
      payload: {
        id,
        index,
      },
    })
  }

  draw() {
    this.worker.postMessage({
      command: 'draw',
    })
  }

  setScale(zoomFactor: number, offsetX: number, offsetY: number) {
    this.worker.postMessage({
      command: 'setScale',
      payload: {
        zoomFactor,
        offsetX,
        offsetY,
      },
    })
  }

  setComponentPosition(id: string, x: number, y: number) {
    this.worker.postMessage({
      command: 'setComponentPosition',
      payload: {
        id,
        x,
        y,
      },
    })
  }

  setComponentData(id: string, data: number) {
    this.worker.postMessage({
      command: 'setComponentData',
      payload: {
        id,
        data,
      },
    })
  }
}

export default Layer
