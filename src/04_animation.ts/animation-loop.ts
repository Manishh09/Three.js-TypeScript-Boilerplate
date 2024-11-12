import * as THREE from 'three'
import { createCamera } from '../helper-functions/camera';
import { createScene } from '../helper-functions/scene';
import { triggerAnimation } from '../helper-functions/animate';
import { resize } from '../helper-functions/resize';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function animationLoopDemo() {
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
    resize(camera, renderer)

    // orbit controls 
    new OrbitControls(camera, renderer.domElement)

    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshNormalMaterial({ wireframe: true })
    // create a mesh
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // stats panel to see FPS
    const stats = new Stats()
    document.body.appendChild(stats.dom)

    // trigger animation
    // using delta
    const clock = new THREE.Clock();
    const delta = clock.getDelta()
    function animate() {
        requestAnimationFrame(animate)

        cube.rotation.x += delta
        cube.rotation.y += delta

        renderer.render(scene, camera)
        if (stats)
            stats.update()
    }
    animate()


}