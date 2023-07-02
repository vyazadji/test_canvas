import { random } from 'lodash'
import * as THREE from 'three'

const COMPONENTS_COUNT = 10_000

/**
 * Example of drawwing circles on 2D via Three js
 */
class ThreejsExample {
  appElement: HTMLElement
  scene: THREE.Scene
  camera: THREE.OrthographicCamera
  renderer: THREE.WebGLRenderer
  circles: THREE.Mesh[]

  constructor(appElement: HTMLElement) {
    this.appElement = appElement
    this.circles = []

    // Create scene, camera and renderer
    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      1,
      1000
    )
    this.camera.position.z = 1

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.appElement.appendChild(this.renderer.domElement)
  }

  start() {
    const CIRCLE_SEGMENTS_COUNT = 32 // 32 is default value
    // Create 10,000 circles

    // The same type for all circles
    const geometry = new THREE.CircleGeometry(random(3, 10), CIRCLE_SEGMENTS_COUNT)
    const material = new THREE.MeshBasicMaterial({ color: generateRandomColor() })

    this.circles = []

    for (let i = 0; i < COMPONENTS_COUNT; i++) {
      // Different type for each circles
      // const geometry = new THREE.CircleGeometry(random(3, 10), CIRCLE_SEGMENTS_COUNT)
      // const material = new THREE.MeshBasicMaterial({ color: generateRandomColor() })

      const circle = new THREE.Mesh(geometry, material)
      circle.position.x = Math.random() * window.innerWidth - window.innerWidth / 2 // Random x position
      circle.position.y = Math.random() * window.innerHeight - window.innerHeight / 2 // Random y position
      circle.userData = { direction: 1 } // Set direction (1 for right, -1 for left)
      this.scene.add(circle)
      this.circles.push(circle)
    }

    this.animateThreeJS()
  }

  animateThreeJS() {
    requestAnimationFrame(this.animateThreeJS.bind(this))

    // Move circles and change direction when touching border
    this.circles.forEach(function (circle) {
      circle.position.x += circle.userData.direction
      if (circle.position.x > window.innerWidth / 2 || circle.position.x < window.innerWidth / -2) {
        circle.userData.direction *= -1
      }
    })

    this.renderer.render(this.scene, this.camera)
  }
}

const generateRandomColor = (): number => {
  return Math.floor(Math.random() * 0xffffff)
}

export default ThreejsExample
