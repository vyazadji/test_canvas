import ComponentUIBarWorker from './ComponentUIBarWorker'
/**
 * This is a part of Layer that works inside Worker
 */

let ctx: OffscreenCanvasRenderingContext2D | null = null
const componentsUI: Record<string, ComponentUIBarWorker> = {}

let zoomFactor = 1
let offsetX = 0
let offsetY = 0

onmessage = function (e: MessageEvent) {
  if (e.data.canvas) {
    const offscreen: OffscreenCanvas = <OffscreenCanvas>e.data.canvas
    ctx = <OffscreenCanvasRenderingContext2D>offscreen.getContext('2d')
  } else if (e.data.command === 'addComponent') {
    const { id, index }: { id: string; index: number } = e.data.payload
    addComponent(id, index)
  } else if (e.data.command === 'draw') {
    draw()
  } else if (e.data.command === 'setScale') {
    zoomFactor = e.data.payload.zoomFactor
    offsetX = e.data.payload.offsetX
    offsetY = e.data.payload.offsetY
  } else if (e.data.command === 'setComponentPosition') {
    const { id, x, y }: { id: string; x: number; y: number } = e.data.payload
    setComponentPosition(id, x, y)
  } else if (e.data.command === 'setComponentData') {
    const { id, data }: { id: string; data: number } = e.data.payload
    setComponentData(id, data)
  } else {
    console.warn('LayoutWorker: Unknown command', { data: e.data })
  }
}

const addComponent = (id: string, index: number) => {
  if (ctx) {
    const newComponentUI = new ComponentUIBarWorker(ctx, index)
    componentsUI[id] = newComponentUI
  } else {
    console.warn('LayoutWorker addComponent(): context is not defined')
  }
}

const setComponentPosition = (id: string, x: number, y: number) => {
  const componentUI = componentsUI[id]
  componentUI.position(x, y)
}

const setComponentData = (id: string, data: number) => {
  const componentUI = componentsUI[id]
  componentUI.setData(data)
}

const draw = () => {
  if (ctx) {
    // TODO get real dimensions
    const width = 1500
    const height = 1000

    // clear all
    ctx.clearRect(0, 0, width, height)

    // set zoom and scale
    ctx.save()
    ctx.translate(offsetX, offsetY)
    ctx.scale(zoomFactor, zoomFactor)

    // redraw all components
    for (const id in componentsUI) {
      const componentUI = componentsUI[id]
      componentUI.draw()
    }

    // restore ctx
    ctx.restore()
  }
}
