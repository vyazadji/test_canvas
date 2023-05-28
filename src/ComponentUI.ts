import { ComponentUI } from './type'

class ComponentUIClass implements ComponentUI {
  type: string
  constructor() {
    this.type = 'number'
  }

  // html implementation of component
  draw(data: number): string {
    return `<div style="border: 1px solid gren; height: 20px; width: 20px;">${data}</div>`
  }
}

export default ComponentUIClass
