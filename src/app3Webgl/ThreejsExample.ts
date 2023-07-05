import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';


const _matrix1 = new THREE.Matrix4();
const _matrix2 = new THREE.Matrix4();
const _color = new THREE.Color();
const _vector1 = new THREE.Vector3();
const _vector2 = new THREE.Vector3();

class Params {
  componentsCount: number
  segmentsCount: number
  movePct: number
  scale: boolean
  move: boolean
  mode: string
  fxaa: boolean
  setPixelRatio: boolean
  constructor() {
    this.componentsCount = 10_000
    this.segmentsCount = 32
    this.movePct = 100
    this.scale = true;
    this.move = true;
    this.mode = 'single geometry'
    this.fxaa = false
    this.setPixelRatio = false;
  }
}

/**
 * Example of drawwing circles on 2D via Three js
 */
class ThreejsExample {
  appElement: HTMLElement
  scene: THREE.Scene
  camera: THREE.OrthographicCamera
  renderer: THREE.WebGLRenderer
  circles: THREE.Mesh[]
  stats: Stats
  params: Params
  clock: THREE.Clock
  composer: EffectComposer
  renderPass: RenderPass
  fxaaPass: ShaderPass
  defaultPixelRatio: number
  constructor(appElement: HTMLElement) {
    this.appElement = appElement
    this.circles = []
    this.params = new Params();

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
    this.defaultPixelRatio = this.renderer.getPixelRatio();
    this.appElement.appendChild(this.renderer.domElement)

    this.renderer.useLegacyLights = false;
    this.renderer.autoClear = false;
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.renderPass.clearColor = new THREE.Color(0, 0, 0);
    this.renderPass.clearAlpha = 0;

    this.fxaaPass = new ShaderPass(FXAAShader);
    
    const outputPass = new OutputPass();

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.fxaaPass);
    this.composer.addPass(outputPass);

    this.updatePixelRatio();
    //


    this.stats = new Stats();
    this.stats.dom.style.transform = 'scale(2.0)';
    this.stats.dom.style.transformOrigin = 'top left';
    this.stats.dom.style.top = '30%';
    this.appElement.appendChild(this.stats.dom);

    const gui = new GUI();
    gui.add(this.params, 'componentsCount');
    gui.add(this.params, 'segmentsCount');
    gui.add(this, 'rebuildScene');
    gui.add(this.params, 'mode').options(['single geometry', 'single material', 'single mesh']).onChange(this.rebuildScene.bind(this));
    const animationGui = gui.addFolder('Animation');
    animationGui.add(this.params, 'movePct', 0, 100);
    animationGui.add(this.params, 'move');
    animationGui.add(this.params, 'scale');
    const renderGui = gui.addFolder('Antialiasing');
    renderGui.add(this.params, 'fxaa');
    renderGui.add(this.params, 'setPixelRatio').onChange(this.updatePixelRatio.bind(this));

    this.clock = new THREE.Clock();
  }

  updatePixelRatio() {
    this.renderer.setPixelRatio(this.params.setPixelRatio?window.devicePixelRatio:this.defaultPixelRatio);
    const pixelRatio = this.renderer.getPixelRatio();
    this.composer.setPixelRatio(pixelRatio);
    this.fxaaPass.material.uniforms['resolution'].value.x = 1 / (this.appElement.offsetWidth * pixelRatio);
    this.fxaaPass.material.uniforms['resolution'].value.y = 1 / (this.appElement.offsetHeight * pixelRatio);
    this.fxaaPass.material.needsUpdate = true;
    console.log('Pixel ratio is set to: ', pixelRatio);
  }

  clearScene() {
    if (this?.circles?.length) {
      this.circles.forEach(c => {
        c.removeFromParent();
        c.geometry.dispose();
        if (Array.isArray(c.material)) {
          c.material.forEach(m => m.dispose());
        } else {
          c.material.dispose();
        }
      });
    }
    this.circles = [];
  }

  rebuildScene() {
    // Create 10,000 circles

    const baseMaterial = new THREE.MeshBasicMaterial({
      color: 'white', // main color is white
    })
    let baseGeometry;
    if (this.params.segmentsCount > 0) {
      baseGeometry = new THREE.CircleGeometry(10.0, this.params.segmentsCount)
    } else {
      baseGeometry = new THREE.PlaneGeometry(10.0, 10.0, 1, 1);
      baseGeometry.applyMatrix4(_matrix1.makeRotationZ(Math.PI / 2.0))
    }

    this.clearScene();

    if (this.params.mode === 'single mesh') {
      const allCirclesMesh = this.createInstancedMesh(baseGeometry, baseMaterial, this.params.componentsCount);
      this.circles.push(allCirclesMesh);
      this.scene.add(allCirclesMesh);

    } else {
      for (let i = 0; i < this.params.componentsCount; i++) {
        _color.set(generateRandomColor())
        let material;
        let geometry;
        if (this.params.mode === 'single geometry') { // individual material with color per each object
          material = baseMaterial.clone();
          material.color.copy(_color);
          geometry = baseGeometry;

        } else if (this.params.mode === 'single material') { // color of each object is set by geometry attribute (same material is used in all objects)
          material = baseMaterial;
          material.vertexColors = true;
          geometry = baseGeometry.clone();

          const vertexColors = new THREE.BufferAttribute(new Float32Array(geometry.attributes.position.array.length), 3)
          geometry.setAttribute('color', vertexColors)
          for (let v = 0, vc = vertexColors.count; v < vc; v++) {
            vertexColors.setXYZ(v, _color.r, _color.g, _color.b)
          }
        }

        const circle = new THREE.Mesh(geometry, material)
        circle.position.x = Math.random() * window.innerWidth - window.innerWidth / 2 // Random x position
        circle.position.y = Math.random() * window.innerHeight - window.innerHeight / 2 // Random y position
        circle.scale.set(1, 1.0 + Math.random() * 9.0, 1);
        circle.userData = {
          direction: 0.5 + Math.random(),
          scale: 10.0,
        }
        this.scene.add(circle)
        this.circles.push(circle)
      }
    }
  }

  createInstancedMesh(geometry: THREE.BufferGeometry, material: THREE.Material, count: number) {
    const color = new THREE.Color();
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.userData.direction = [];
    mesh.userData.scale = [];
    for (let i = 0; i < this.params.componentsCount; i++) {
      _matrix1.makeScale(1, 1.0 + Math.random() * 9.0, 1);
      _matrix1.setPosition(
        Math.random() * window.innerWidth - window.innerWidth / 2, // Random x position
        Math.random() * window.innerHeight - window.innerHeight / 2, // Random y position
        0)
      mesh.setMatrixAt(i, _matrix1);
      color.set(generateRandomColor());
      mesh.setColorAt(i, color);
      mesh.userData.direction.push(0.5 + Math.random());
      mesh.userData.scale.push(10.0);
    }
    return mesh;
  }

  start() {
    this.rebuildScene();
    this.animateThreeJS()
  }

  animateThreeJS() {
    this.stats.begin();
    requestAnimationFrame(this.animateThreeJS.bind(this))

    const left = window.innerWidth / -2,
      right = window.innerWidth / 2;

    const delta = this.clock.getDelta(); // time (sec) left since last frame
    // Move circles and change direction when touching border
    if (this.params.mode === 'single mesh') {
      const mesh = this.circles[0] as THREE.InstancedMesh;
      if (this.params.scale || this.params.move) {
        for (let i = mesh.count * (1.0 - this.params.movePct / 100), ic = mesh.count; i < ic; i++) {
          mesh.getMatrixAt(i, _matrix1);

          // scale
          if (this.params.scale) {
            let scaleY = _matrix1.elements[5];
            scaleY = Math.min(Math.max(scaleY + mesh.userData.scale[i] * delta, 1.0), 10.0);
            if (scaleY >= 10.0 || scaleY <= 1.0) {
              mesh.userData.scale[i] *= -1
            }
            _matrix1.elements[5] = scaleY;
          }

          // position
          if (this.params.move) {
            let posX = _matrix1.elements[12];
            posX += mesh.userData.direction[i];
            if (posX > right || posX < left) {
              mesh.userData.direction[i] *= -1
            }
            _matrix1.elements[12] = posX;
          }

          // update matrix
          mesh.setMatrixAt(i, _matrix1);
        }
        mesh.instanceMatrix.needsUpdate = (this.params.movePct > 0);
      }
    } else {
      for (let i = this.circles.length * (1.0 - this.params.movePct / 100), ic = this.circles.length; i < ic; i++) {
        const circle = this.circles[i];
        if (this.params.move) {
          circle.position.x += circle.userData.direction
          if (circle.position.x > right || circle.position.x < left) {
            circle.userData.direction *= -1
          }
        }
        if (this.params.scale) {
          circle.scale.y = Math.min(Math.max(circle.scale.y + circle.userData.scale * delta, 1.0), 10.0)
          if (circle.scale.y >= 10.0 || circle.scale.y <= 1.0) {
            circle.userData.scale *= -1
          }
        }
      }
    }
    if (this.params.fxaa) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera)
    }
    this.stats.end();
  }
}

const generateRandomColor = (): number => {
  return Math.floor(Math.random() * 0xffffff)
}

export default ThreejsExample
