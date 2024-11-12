
import * as THREE from 'three'
import { createCamera } from '../helper-functions/camera';
import { createScene } from '../helper-functions/scene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function onDemandRenderingDemo() {
    // create a scene
    const scene = createScene()
    scene.add(new THREE.GridHelper())

    // setup camera
    const camera = createCamera('perspective') as THREE.PerspectiveCamera;
    camera.position.z = 1.5;

    // setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true }) // { antialias: true }: avoids flickering of scene
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement) // creates HTMLCanvasElement dynamically

    // resize scene
    window.addEventListener('resize', () => {
        if(camera){
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix() // should be updated in order to see the updated scene
        }
            
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera);
    })

    // orbit controls 
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', function() {
        renderer.render(scene, camera);
    })
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshNormalMaterial({ wireframe: true })
    // create a mesh
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // stats panel to see FPS
    const stats = new Stats()
    document.body.appendChild(stats.dom)

    // trigger animation
    // function animate() {
    //     requestAnimationFrame(animate)

    //     cube.rotation.x += 0.01
    //     cube.rotation.y += 0.01

    //     renderer.render(scene, camera)
    //     if (stats)
    //         stats.update()
    // }
    // animate()


}