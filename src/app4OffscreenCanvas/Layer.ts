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

    console.log('init layer', { width, height })
  }

  getCanvas() {
    return this.canvas
  }

  addComponent(id: string) {
    // TODO need to also set type of UI element
    this.worker.postMessage({
      command: 'addComponent',
      payload: {
        id,
      },
    })
  }

  draw(id: string, x: number, y: number, data: number) {
    this.worker.postMessage({
      command: 'draw',
      payload: {
        id,
        x,
        y,
        data,
      },
    })
  }

  clear() {
    this.worker.postMessage({
      command: 'clear',
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

  contextRestore() {
    this.worker.postMessage({
      command: 'contextRestore',
    })
  }
}

export default Layer
