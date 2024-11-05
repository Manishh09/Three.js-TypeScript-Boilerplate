 
import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'dat.gui'
import { createCamera } from '../helper-functions/camera'
import { triggerAnimation } from '../helper-functions/animate'

export function perspectiveCameraDemo() {
    const scene = new THREE.Scene()
    scene.add(new THREE.GridHelper())

    const camera = createCamera('perspective') as THREE.PerspectiveCamera;
    //camera.position.set(0, 2, 3)
    //camera.lookAt(0, 0.5, 0)
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    window.addEventListener('resize', () => {
        if(camera){
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix() // should be updated in order to see the updated scene
        }
            
        renderer.setSize(window.innerWidth, window.innerHeight)
    })

    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshNormalMaterial({ wireframe: true })

    const cube = new THREE.Mesh(geometry, material)
    cube.position.y = 0.5
    scene.add(cube)

    const stats = new Stats()
    document.body.appendChild(stats.dom)

    const gui = new GUI()

    const cameraFolder = gui.addFolder('Camera')
    if(camera){
        cameraFolder.add(camera.position, 'x', -10, 10)
        cameraFolder.add(camera.position, 'y', -10, 10)
        cameraFolder.add(camera.position, 'z', -10, 10)
        cameraFolder.add(camera, 'fov', 0, 180, 0.01).onChange(() => {
            camera.updateProjectionMatrix()
        })
        cameraFolder.add(camera, 'aspect', 0.00001, 10).onChange(() => {
            camera.updateProjectionMatrix()
        })
        cameraFolder.add(camera, 'near', 0.01, 10).onChange(() => {
            camera.updateProjectionMatrix()
        })
        cameraFolder.add(camera, 'far', 0.01, 10).onChange(() => {
            camera.updateProjectionMatrix()
        })
    }
   
    cameraFolder.open()

    triggerAnimation(renderer, scene, camera, stats);

     
}
