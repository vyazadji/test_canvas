import EventEmitter from './utils/EventEmmiter'
import type { Callback, ComponentCoordinates } from './types'
/**
 * @class
 * This is a service layer
 * It handle mouse events
 */
class ServiceLayer {
  canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  zoomFactor: number
  offsetX: number
  offsetY: number
  isPanning: boolean
  lastPosition: { x: number; y: number }

  components: ComponentCoordinates[]
  draggingComponent: ComponentCoordinates | null

  private eventEmitter: EventEmitter

  constructor(width: number, height: number) {
    this.eventEmitter = new EventEmitter()

    this.zoomFactor = 1
    this.offsetX = 0
    this.offsetY = 0
    this.isPanning = false
    this.lastPosition = { x: 0, y: 0 }

    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
    this.canvas.style.position = 'absolute'

    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D

    // Add listeners on the main canvas
    this.canvas.addEventListener('mousedown', this.handleMouseDown)
    this.canvas.addEventListener('mousemove', this.handleMouseMove)
    this.canvas.addEventListener('mouseup', this.handleMouseUp)
    this.canvas.addEventListener('mouseout', this.handleMouseUp) // Stop panning when mouse leaves canvas.
    this.canvas.addEventListener('wheel', this.handleWheel)

    this.components = []
    this.draggingComponent = null
  }

  /**
   * Add listeners for this layers events
   */
  addListener(eventName: string, fn: Callback): EventEmitter {
    return this.eventEmitter.addListener(eventName, fn)
  }

  getElement() {
    return this.canvas
  }

  /**
   * Add component
   * // TODO I'm not not sure that this is a good practice to store also
   * components in this level
   */
  addComponent(component: ComponentCoordinates) {
    this.components.push(component)
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    //
    // draw components service borders if need
    //
    if (this.draggingComponent) {
      const x = this.draggingComponent.x * this.zoomFactor + this.offsetX
      const y = this.draggingComponent.y * this.zoomFactor + this.offsetY
      const width = this.draggingComponent.width * this.zoomFactor
      const height = this.draggingComponent.height * this.zoomFactor

      this.context.beginPath()
      this.context.rect(x, y, width, height)
      this.context.lineWidth = 3
      this.context.strokeStyle = 'blue'
      this.context.stroke()
    }
  }

  //
  //
  // Zoom and dragging layer handlers
  //
  //
  handleMouseDown = (event: MouseEvent) => {
    //
    // Drag full layout
    //
    if (event.metaKey) {
      // handle panning when metaKey is press
      this.isPanning = true
      this.lastPosition = { x: event.clientX, y: event.clientY }
      return
    }

    //
    // Drag one component
    //
    // Calculate mouse position in canvas
    const rect = this.canvas.getBoundingClientRect()
    let mouseX = event.clientX - rect.left
    let mouseY = event.clientY - rect.top

    // Adjust the position based on the current translation amounts
    mouseX -= this.offsetX
    mouseY -= this.offsetY

    // Adjust the position based on the current zoom factor
    mouseX /= this.zoomFactor
    mouseY /= this.zoomFactor

    // Identify which component was clicked
    for (const component of this.components) {
      if (
        mouseX >= component.x &&
        mouseX <= component.x + component.width &&
        mouseY >= component.y &&
        mouseY <= component.y + component.height
      ) {
        console.log('click on component', component)
        this.draggingComponent = component
        return
      }
    }
  }

  handleMouseMove = (event: MouseEvent) => {
    //
    //    Handle panning
    //
    if (this.isPanning && event.metaKey) {
      // Calculate the difference between the current mouse position and the last mouse position.
      const dx = event.clientX - this.lastPosition.x
      const dy = event.clientY - this.lastPosition.y

      // Update the offsets.
      this.offsetX += dx
      this.offsetY += dy

      // Update the last position.
      this.lastPosition = { x: event.clientX, y: event.clientY }

      this.eventEmitter.emit('dragPanno', { zoomFactor: this.zoomFactor, offsetX: this.offsetX, offsetY: this.offsetY })
      return
    }

    //
    // Handle one component dragging
    //
    if (this.draggingComponent) {
      const rect = this.canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      // Update the position of the dragging component
      const x = (mouseX - this.offsetX) / this.zoomFactor
      const y = (mouseY - this.offsetY) / this.zoomFactor
      this.draggingComponent.setPosition(x, y)
    }
  }

  handleMouseUp = (_event: MouseEvent) => {
    this.isPanning = false
    this.draggingComponent = null
  }

  handleWheel = (event: WheelEvent) => {
    event.preventDefault()

    const scaleAmount = 1.1
    const mouseX = event.clientX - this.canvas.getBoundingClientRect().left
    const mouseY = event.clientY - this.canvas.getBoundingClientRect().top

    if (event.deltaY < 0) {
      // zoom in
      this.zoomFactor *= scaleAmount
      this.offsetX -= ((scaleAmount - 1) * (mouseX - this.offsetX)) / this.zoomFactor
      this.offsetY -= ((scaleAmount - 1) * (mouseY - this.offsetY)) / this.zoomFactor
    } else {
      // zoom out
      this.zoomFactor /= scaleAmount
      this.offsetX += ((1 - 1 / scaleAmount) * (mouseX - this.offsetX)) / this.zoomFactor
      this.offsetY += ((1 - 1 / scaleAmount) * (mouseY - this.offsetY)) / this.zoomFactor
    }

    this.eventEmitter.emit('zoom', { zoomFactor: this.zoomFactor, offsetX: this.offsetX, offsetY: this.offsetY })
  }
}

export default ServiceLayer
