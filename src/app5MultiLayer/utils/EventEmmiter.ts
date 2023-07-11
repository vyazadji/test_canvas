import type { Callback } from './../types'
type EventMap = Record<string, Callback[]>

class EventEmitter {
  private listeners: EventMap = {}

  addListener(eventName: string, fn: Callback): EventEmitter {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(fn)
    return this
  }

  emit(eventName: string, ...args: any[]): boolean {
    const eventListeners = this.listeners[eventName]
    if (eventListeners) {
      eventListeners.forEach((fn) => {
        fn(...args)
      })
      return true
    }
    return false
  }
}

export default EventEmitter
