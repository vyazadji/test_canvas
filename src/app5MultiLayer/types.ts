export interface Layer {
  getElement(): HTMLElement
  draw(): void
}

export interface ComponentUI {
  draw(x: number, y: number, data: number, index?: number): void
}
