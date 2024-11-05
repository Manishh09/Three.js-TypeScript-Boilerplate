
import * as THREE from 'three'
// import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import StatsPanel from 'three/examples/jsm/libs/stats.module.js'

import { GUI } from 'dat.gui'
import { createScene } from '../helper-functions/scene'
import { createCamera } from '../helper-functions/camera'

export function sceneDemo() {


  // Scene
  const sceneA = createScene('color')

  const sceneB = createScene('texture')

  const sceneC = createScene('cubictexture')
  //sceneC.backgroundBlurriness = 0.5 - for gradient look

  // Camera
  const camera = createCamera('perspective') as THREE.PerspectiveCamera

  // Renderer

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  window.addEventListener('resize', () => {
    if (camera) {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  // OrbitControls
  if (camera)
    new OrbitControls(camera, renderer.domElement)


  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshNormalMaterial({ wireframe: true })

  const cube = new THREE.Mesh(geometry, material)

  // StatsPanel

  const stats = new StatsPanel()
  document.body.appendChild(stats.dom)

  // GUI

  // const gui = new GUI()
  // const guiFolder = gui.addFolder("Cube")
  // guiFolder.add(cube.rotation, 'x',0, Math.PI * 2)
  // guiFolder.add(cube.rotation, 'y',0, Math.PI * 2)
  // guiFolder.add(cube.rotation, 'z',0, Math.PI * 2)
  // guiFolder.open()

  // const camFolder = gui.addFolder("Camera")
  // if (camera) 
  //     camFolder.add(camera.position, 'z',0, 20)
  // camFolder.open()

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

  function animate() {
    requestAnimationFrame(animate)
    // comment below to see the effect of Orbit controls
    //stats.begin()
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    //stats.end()


    activeScene.add(cube)
    if (camera)
      renderer.render(activeScene, camera)

    stats.update()
  }

  animate()

}