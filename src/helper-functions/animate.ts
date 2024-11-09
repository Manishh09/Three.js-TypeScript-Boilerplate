import THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
export function triggerAnimation(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, stats?: Stats) {
    function animate() {
        requestAnimationFrame(animate)

        //camera.lookAt(0, 0.5, 0)

        renderer.render(scene, camera)
        if (stats)
            stats.update()
    }
    animate()
}





