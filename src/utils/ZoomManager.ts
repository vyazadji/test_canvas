import { addClick } from './helpers'

const MAX = 3000
const MIN = 0
const SCALE_STEP = 15
/**
 *
 */
class ZoomManager {
  value: number
  inputEl: HTMLInputElement
  key: string

  constructor(key = 'transform') {
    this.value = 100
    this.key = key

    this.inputEl = document.getElementById(`zoom-${this.key}`) as HTMLInputElement

    this.initButtonBindings()
    this.updateValue(this.value)
  }

  onChange(value: number) {
    console.warn('Need to subscribe to this event to use it', value)
  }

  initButtonBindings() {
    // +
    addClick(`zoomIn-${this.key}`, () => {
      this.updateValue(this.value + SCALE_STEP)
    })

    // -
    addClick(`zoomOut-${this.key}`, () => {
      this.updateValue(this.value - SCALE_STEP)
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
      this.onChange(this.value / 100) // 1 = 100%. -zoom < 1 ; +zoom > 1
    }
  }
}

export default ZoomManager
