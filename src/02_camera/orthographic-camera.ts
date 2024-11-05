import * as THREE from 'three';
import { createCamera } from '../helper-functions/camera';
import { GUI } from 'dat.gui';
import { triggerAnimation } from '../helper-functions/animate';
import Stats from 'three/addons/libs/stats.module.js';

export function orthographicCameraDemo() {
    const scene = new THREE.Scene()
    scene.add(new THREE.GridHelper())

    // camera 
    const camera = createCamera('orthographic') as THREE.OrthographicCamera

    // renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // resize scene
    window.addEventListener('resize', () => {
        // there is aspect for ortho cam
        
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    })

    // add geometry
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshNormalMaterial({ wireframe: true })

    // cube 
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = 1;

    // add cube to scene
    scene.add(cube)

    // stats
    const stats = new Stats()
    document.body.appendChild(stats.dom)

    // create cam gui
    const gui = new GUI()
    const cameraFolder = gui.addFolder('Camera')
    if(camera) {
        // left, right, top, bottom, near, far
        cameraFolder.add(camera, 'left', -10, 0).onChange(() => {
            camera.updateProjectionMatrix()
        })

        cameraFolder.add(camera, 'right', 0, 10).onChange(() => {
            camera.updateProjectionMatrix()
        })

        cameraFolder.add(camera, 'top', 0, 10).onChange(() => {
            camera.updateProjectionMatrix()
        })

        cameraFolder.add(camera, 'bottom', -10, 0).onChange(() => {
            camera.updateProjectionMatrix()
        })

        // near, far clipping points
        cameraFolder.add(camera, 'near', -5, 5).onChange(() => {
            camera.updateProjectionMatrix()
        })

        cameraFolder.add(camera, 'far', 0, 10).onChange(() => {
            camera.updateProjectionMatrix()
        })

        cameraFolder.open()
    }

    // animate
    triggerAnimation(renderer, scene, camera, stats);
    

}
