import type { DataSource, DataSourceListener } from './type'

const UPDATE_INTERVAL = 1_000 // 1 sec

class DataSourceClass implements DataSource {
  data: number
  listeners: DataSourceListener[]
  intervalId: number | null
  private interval: number

  constructor() {
    this.data = 0
    this.listeners = []
    this.interval = UPDATE_INTERVAL
    this.intervalId = null
  }

  addListener(listener: DataSourceListener) {
    this.listeners.push(listener)
  }

  start() {
    this.intervalId = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 100) + 1
      this.data = randomNumber
      this.onChange()
    }, this.interval)
  }

  stop() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId)
    }
  }

  updateInterval(newInterval: number) {
    if (newInterval === 0) {
      this.stop()
    } else {
      this.stop()
      this.interval = newInterval
      this.start()
    }
  }

  onChange() {
    for (let index = 0; index < this.listeners.length; index++) {
      const listener = this.listeners[index]
      listener.onDataChange(this.data)
    }
  }
}

export default DataSourceClass
