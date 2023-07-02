const COMPONENTS_COUNT = 10_000

/**
 * Generates a random number in the range of [-1, 1]
 */
const random = (): number => {
  return Math.random() * 2 - 1
}

interface WebGLConfig {
  gl: WebGLRenderingContext
  program: WebGLProgram
}

type Position = {
  x: number
  y: number
  r: number
  direction: number
  color: number[]
}

class WebglExample {
  appElement: HTMLElement
  // eslint-disable-next-line
  // @ts-ignore
  webGLConfig: WebGLConfig
  positions: Position[]

  // eslint-disable-next-line
  // @ts-ignore
  vertexBuffer: WebGLBuffer

  constructor(appElement: HTMLElement) {
    this.positions = []
    this.appElement = appElement
  }

  start() {
    this.webGLConfig = this.setupWebGL()

    // Generate random positions and dimensions for circles
    this.positions = []
    for (let index = 0; index < COMPONENTS_COUNT; index++) {
      this.positions.push({
        x: random(),
        y: random(),
        r: Math.random() / 5,
        direction: Math.random() > 0.5 ? -1 : 1,
        color: [Math.random(), Math.random(), Math.random(), 1.0], // RGB and Alpha
      })
    }

    this.vertexBuffer = this.setupCircle(0.1, 100)
    this.animate()
  }

  setupWebGL(): WebGLConfig {
    const canvas = document.createElement('canvas')
    canvas.width = 800
    canvas.height = 800
    this.appElement.appendChild(canvas)
    const gl = canvas.getContext('webgl')
    if (!gl) {
      throw new Error('Failed to get WebGL context.')
    }

    const vertShaderSrc = `
        attribute vec2 a_position;
        uniform vec2 u_position;
        uniform float u_radius;
        void main(void) {
        gl_Position = vec4(a_position * u_radius + u_position, 0.0, 1.0);
        }
        `
    const fragShaderSrc = `
        precision mediump float;
        uniform vec4 u_color;
        void main(void) {
            gl_FragColor = u_color;
        }
    `

    const vertShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader
    gl.shaderSource(vertShader, vertShaderSrc)
    gl.compileShader(vertShader)

    const fragShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader
    gl.shaderSource(fragShader, fragShaderSrc)
    gl.compileShader(fragShader)

    const program = gl.createProgram() as WebGLProgram
    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    return { gl, program }
  }

  setupCircle(radius: number, numSegments: number): WebGLBuffer {
    const { gl, program: _ } = this.webGLConfig
    const vertices = []
    for (let i = 0; i <= numSegments; ++i) {
      const angle = (i * 2 * Math.PI) / numSegments
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      vertices.push(x, y)
    }

    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)

    return vertexBuffer as WebGLBuffer
  }

  drawCircles() {
    // this.drawCircle(webGLConfig, , 0, 0.5, 100)
    for (let i = 0; i < COMPONENTS_COUNT; i++) {
      this.drawCircle(
        this.webGLConfig,
        this.positions[i].x,
        this.positions[i].y,
        this.positions[i].r,
        100,
        this.positions[i].color
      )
    }
  }

  drawCircle(
    config: WebGLConfig,
    centerX: number,
    centerY: number,
    radius: number,
    numSegments: number,
    color: number[]
  ): void {
    const { gl, program } = config

    // Generate a random color
    // const color = [Math.random(), Math.random(), Math.random(), 1.0] // RGB and Alpha
    const colorLocation = gl.getUniformLocation(program, 'u_color')
    gl.uniform4fv(colorLocation, color)

    const vertices = []
    for (let i = 0; i <= numSegments; ++i) {
      const angle = (i * 2 * Math.PI) / numSegments
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      vertices.push(x, y)
    }

    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

    const coord = gl.getAttribLocation(program, 'a_position')
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(coord)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, numSegments + 1)
    gl.disableVertexAttribArray(coord)
  }

  animate() {
    const { gl, program } = this.webGLConfig

    // Clear the canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Bind vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
    const coord = gl.getAttribLocation(program, 'a_position')
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(coord)

    for (let index = 0; index < COMPONENTS_COUNT; index++) {
      let centerX = this.positions[index].x
      let direction = this.positions[index].direction
      const color = this.positions[index].color

      // Move the center of the circle
      centerX += 0.001 * direction

      // If the circle has moved off the right edge of the canvas, reverse the direction
      if (centerX > 1) {
        direction = -1
      }

      // If the circle has moved off the left edge of the canvas, reverse the direction
      if (centerX < -1) {
        direction = 1
      }

      this.positions[index].x = centerX
      this.positions[index].direction = direction

      // Set color
      const colorLocation = gl.getUniformLocation(program, 'u_color')
      gl.uniform4fv(colorLocation, color)

      // Set position
      const position = [centerX, this.positions[index].y]
      const positionLocation = gl.getUniformLocation(program, 'u_position')
      gl.uniform2fv(positionLocation, position)

      // Set radius
      const radius = this.positions[index].r
      const radiusLocation = gl.getUniformLocation(program, 'u_radius')
      gl.uniform1f(radiusLocation, radius)

      // Draw the circle
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 101)
    }

    gl.disableVertexAttribArray(coord)

    // Request the next frame
    requestAnimationFrame(this.animate.bind(this))
  }
}

export default WebglExample
