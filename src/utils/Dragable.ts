class Draggable {
  private container: HTMLElement
  private draggables: HTMLElement[]
  private selected: HTMLElement | null
  private x_pos: number
  private y_pos: number
  private x_elem: number
  private y_elem: number

  constructor(containerElement: HTMLElement) {
    this.container = containerElement
    this.draggables = Array.from(this.container.children) as HTMLElement[]
    this.selected = null
    this.x_pos = 0
    this.y_pos = 0
    this.x_elem = 0
    this.y_elem = 0

    // Bind this to the class methods
    this._drag_init = this._drag_init.bind(this)
    this._move_elem = this._move_elem.bind(this)
    this._destroy = this._destroy.bind(this)

    this.container.onmousemove = this._move_elem
    this.container.onmouseup = this._destroy

    for (const draggable of this.draggables) {
      draggable.onmousedown = () => {
        this._drag_init(draggable)
        return false
      }
    }
  }

  private _drag_init(elem: HTMLElement) {
    this.selected = elem
    this.x_elem = this.x_pos - this.selected.offsetLeft
    this.y_elem = this.y_pos - this.selected.offsetTop
  }

  private _move_elem(e: MouseEvent) {
    this.x_pos = e.clientX
    this.y_pos = e.clientY
    if (this.selected !== null) {
      this.selected.style.left = this.x_pos - this.x_elem + 'px'
      this.selected.style.top = this.y_pos - this.y_elem + 'px'
    }
  }

  private _destroy() {
    this.selected = null
  }
}

export default Draggable
