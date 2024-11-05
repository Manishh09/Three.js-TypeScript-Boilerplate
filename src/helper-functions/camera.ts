import * as THREE from 'three';

export function createCamera(type: string) {

    if (type === 'perspective') {
        // Create a perspective camera
        const camera = new THREE.PerspectiveCamera(
            75, // Field of view
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near clipping plane
            1000 // Far clipping plane
        );

        // Set camera position
        camera.position.set(0, 2, 4);
        //camera.position.z = 5;

        // Set camera target
        camera.lookAt(0, 0.5, 0);
        return camera;
    }

    if (type === "orthographic") {
        //parameters:  left , right, top, bottom, near, far
        const ocam = new THREE.OrthographicCamera(-4, 4, 4, -4, -5, 10)
        ocam.position.set(1, 1, 1)
        ocam.lookAt(0, 0.5, 0)

        return ocam
    }

}
