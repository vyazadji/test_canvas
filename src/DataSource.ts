import type { DataSource, DataSourceListener } from './type'

class DataSourceClass implements DataSource {
  data: number
  listeners: DataSourceListener[]

  constructor() {
    this.data = 0
    this.listeners = []
  }

  addListener(listener: DataSourceListener) {
    this.listeners.push(listener)
  }

  start() {
    const UPDATE_INTERVAL = 1_000 // 1 sec
    setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 100) + 1
      this.data = randomNumber
      this.onChange()
    }, UPDATE_INTERVAL)
  }

  onChange() {
    for (let index = 0; index < this.listeners.length; index++) {
      const listener = this.listeners[index]
      listener.onDataChange(this.data)
    }
  }
}

export default DataSourceClass
