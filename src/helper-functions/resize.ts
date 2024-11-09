import THREE from 'three'

export function resize(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
    window.addEventListener('resize', () => {
        if(camera){
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix() // should be updated in order to see the updated scene
        }
            
        renderer.setSize(window.innerWidth, window.innerHeight)
    })
}