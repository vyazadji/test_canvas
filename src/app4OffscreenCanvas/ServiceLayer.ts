/**
 * @class
 * This is a service layer
 * It handle mouse events
 */
class ServiceLayer {
  canvas: HTMLCanvasElement
  height: number
  width: number

  zoomFactor: number
  offsetX: number
  offsetY: number
  isPanning: boolean
  lastPosition: { x: number; y: number }
  needsRedraw: boolean

  constructor(width: number, height: number) {
    this.width = width
    this.height = height

    this.zoomFactor = 1
    this.offsetX = 0
    this.offsetY = 0
    this.isPanning = false
    this.lastPosition = { x: 0, y: 0 }
    this.needsRedraw = false

    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.style.position = 'absolute'

    this.canvas.addEventListener('mousedown', this.handleMouseDown)
    this.canvas.addEventListener('mousemove', this.handleMouseMove)
    this.canvas.addEventListener('mouseup', this.handleMouseUp)
    this.canvas.addEventListener('mouseout', this.handleMouseUp) // Stop panning when mouse leaves canvas.
    this.canvas.addEventListener('wheel', this.handleWheel)
  }

  getCanvas() {
    return this.canvas
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

    // TODO hardcoded components dimensions
    const COMPONENT_WIDTH = 10
    const COMPONENT_HEIGHT = 10
    // Identify which component was clicked
    for (const component of this.components) {
      if (
        mouseX >= component.x &&
        mouseX <= component.x + COMPONENT_WIDTH &&
        mouseY >= component.y &&
        mouseY <= component.y + COMPONENT_HEIGHT
      ) {
        console.log('click on component', component.index, component)
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
      // this.offsetX += dx / this.zoomFactor
      // this.offsetY += dy / this.zoomFactor
      this.offsetX += dx
      this.offsetY += dy

      // Update the last position.
      this.lastPosition = { x: event.clientX, y: event.clientY }

      // Redraw the scene.
      // this.draw()
      // Flag that a redraw is needed
      this.needsRedraw = true
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
      this.draggingComponent.position(x, y)
      this.needsRedraw = true
    }
  }

  handleMouseUp = (_event: MouseEvent) => {
    this.isPanning = false
    this.draggingComponent = null
  }

  handleWheel = (event: WheelEvent) => {
    console.log('!!!!!handleWheel!!!!!!')
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

    console.log('mouse wheel', { zoom: this.zoomFactor })

    this.needsRedraw = true
    // this.draw()
  }
}

export default ServiceLayer
