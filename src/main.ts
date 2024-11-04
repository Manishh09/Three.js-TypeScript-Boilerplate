 
import './style.css'
import * as THREE from 'three'
// import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

import { OrbitControls} from 'three/addons/controls/OrbitControls.js'
import StatsPanel from 'three/examples/jsm/libs/stats.module.js'

import { GUI } from 'dat.gui'

// Scene
const sceneA = new THREE.Scene()
sceneA.background = new THREE.Color(0x123456)

const sceneB = new THREE.Scene()
sceneB.background = new THREE.TextureLoader().load('https://sbcode.net/img/grid.png');

const sceneC = new THREE.Scene()
sceneC.background = new THREE.CubeTextureLoader().setPath('https://sbcode.net/img/').load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])
//sceneC.backgroundBlurriness = 0.5 - for gradient look

// Camera
 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

camera.position.z = 1.5

// Renderer

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// OrbitControls
 new OrbitControls(camera, renderer.domElement)
  

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })

const cube = new THREE.Mesh(geometry, material)

// StatsPanel

const stats = new StatsPanel()
document.body.appendChild(stats.dom)

// GUI

const gui = new GUI()
const guiFolder = gui.addFolder("Cube")
guiFolder.add(cube.rotation, 'x',0, Math.PI * 2)
guiFolder.add(cube.rotation, 'y',0, Math.PI * 2)
guiFolder.add(cube.rotation, 'z',0, Math.PI * 2)
guiFolder.open()

const camFolder = gui.addFolder("Camera")
camFolder.add(camera.position, 'z',0, 20)
camFolder.open()

// scene gui

let activeScene = sceneA
const setScene = {
  sceneA: () => {
    activeScene = sceneA
   
  },
  sceneB: () => {
    activeScene = sceneB
  },
  sceneC: () => {
    activeScene = sceneC
  },
}

// scene gui

const sceneGui = new GUI()
sceneGui.add(setScene, 'sceneA').name('Scene A');
sceneGui.add(setScene, 'sceneB').name('Scene B');
sceneGui.add(setScene, 'sceneC').name('Scene C');
sceneGui.open()

function animate() {
  requestAnimationFrame(animate)
  // comment below to see the effect of Orbit controls
  //stats.begin()
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
  //stats.end()
  activeScene.add(cube)
  renderer.render(activeScene, camera)

  stats.update()
}

animate()