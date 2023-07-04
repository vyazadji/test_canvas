import ComponentUIBarWorker from './ComponentUIBarWorker'
/**
 * This is a part of Layer that works inside Worker
 */

let ctx: OffscreenCanvasRenderingContext2D | null = null
const componentsUI: Record<string, ComponentUIBarWorker> = {}

function draw(id: string, x: number, y: number, data: number) {
  if (ctx) {
    const componentUI = componentsUI[id]
    componentUI.draw(x, y, data, id)
  } else {
    console.warn('LayoutWorker draw(): context is not defined')
  }
}

const clear = () => {
  // TODO get real dimensions
  const width = 1500
  const height = 1000

  if (ctx) {
    ctx.clearRect(0, 0, width, height)
  }
}

const addComponent = (id: string) => {
  if (ctx) {
    const newComponentUI = new ComponentUIBarWorker(ctx)
    componentsUI[id] = newComponentUI
  } else {
    console.warn('LayoutWorker addComponent(): context is not defined')
  }
}

onmessage = function (e: MessageEvent) {
  if (e.data.canvas) {
    const offscreen: OffscreenCanvas = <OffscreenCanvas>e.data.canvas
    ctx = <OffscreenCanvasRenderingContext2D>offscreen.getContext('2d')
  } else if (e.data.command === 'addComponent') {
    addComponent(e.data.payload.id)
  } else if (e.data.command === 'draw') {
    const { id, x, y, data }: { id: string; x: number; y: number; data: number } = e.data.payload
    draw(id, x, y, data)
  } else if (e.data.command === 'clear') {
    clear()
  } else {
    console.warn('LayoutWorker: Unknown command', { data: e.data })
  }
}
