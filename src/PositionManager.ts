import { COMPONENT_HEIGHT, COMPONENT_WIDTH } from './consts'

type Position = {
  directionX: number
  directionY: number
  x: number
  y: number
}

/**
 * This class store and manage positions of components
 * during movement
 */

class PositionManager {
  positions: Position[]
  viewWidth: number
  viewHeight: number
  componentWidth: number
  componentHeight: number

  constructor({ viewWidth, viewHeight }: { viewWidth: number; viewHeight: number }) {
    this.positions = []
    this.viewWidth = viewWidth
    this.viewHeight = viewHeight
    this.componentWidth = COMPONENT_WIDTH
    this.componentHeight = COMPONENT_HEIGHT
  }

  /**
   * Store new position of component
   */
  addPosition(x: number, y: number) {
    // randomly choose moving directions
    // 0 - not move
    // -1 move left or top
    // 1 move right or bottom
    const directionX = Math.random() < 0.5 ? -1 : 1
    const directionY = Math.random() < 0.5 ? -1 : 1

    this.positions.push({
      directionX,
      directionY,
      x,
      y,
    })
  }

  calculateNextPosition(i: number) {
    const position = this.positions[i]

    // X direction
    if (position.x > this.viewWidth - this.componentHeight) {
      // right border -> move element to the left
      position.directionX = -1
    } else if (position.x < 1) {
      // left border -> move element to the right
      position.directionX = 1
    }

    // Y direction
    if (position.y > this.viewHeight - this.componentHeight) {
      // bottom border -> move element to the top
      position.directionY = -1
    } else if (position.y < 1) {
      // top border -> move element to the bottom
      position.directionY = 1
    }

    position.x = position.x + 1 * position.directionX
    position.y = position.y + 1 * position.directionY
  }
}

export default PositionManager
