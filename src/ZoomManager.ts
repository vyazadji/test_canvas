import { addClick } from './utils/helpers'

const MAX = 200
const MIN = 0
/**
 *
 */
class ZoomManager {
  value: number
  inputEl: HTMLInputElement

  constructor() {
    this.value = 100
    this.inputEl = document.getElementById('zoom') as HTMLInputElement

    this.initButtonBindings()
    this.updateValue(this.value)
  }

  onChange(value: number) {
    console.warn('Need to subscribe to this event to use it', value)
  }

  initButtonBindings() {
    // +
    addClick('zoomAdd', () => {
      this.updateValue(this.value + 1)
    })

    // -
    addClick('zoomReduce', () => {
      this.updateValue(this.value - 1)
    })

    this.inputEl.addEventListener('change', () => {
      this.updateValue(Number(this.inputEl.value))
    })
  }

  updateValue(newValue: number): void {
    if (newValue > MAX) {
      console.warn(`Stop zooming: new value ${newValue} > MAX value: ${MAX}`)
      return
    } else if (newValue < MIN) {
      console.warn(`Stop zooming: new value ${newValue} < MIN value: ${MIN}`)
      return
    }
    this.value = newValue
    this.inputEl.value = newValue.toString()

    if (this.onChange) {
      this.onChange(this.value)
    }
  }
}

export default ZoomManager
