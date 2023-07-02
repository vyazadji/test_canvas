/**
 * Get number value from <input> by id
 */
export const getInputNumber = (elementId: string): number => {
  const element = document.getElementById(elementId) as HTMLInputElement
  const number = Number(element.value)

  return number
}

export const addClick = (elementId: string, callback: () => void) => {
  const element = document.getElementById(elementId) as HTMLElement
  element.addEventListener('click', callback)
}

/**
 * Get not null dom element.
 * Generic function
 * @param {string} id - id of element
 *
 * @example
 * const canvasElement = getElementById<HTMLCanvasElement>('canvasId');
 */
export const getElementById = <T extends HTMLElement = HTMLElement>(id: string): T => {
  const element = document.getElementById(id) as T
  return element
}
