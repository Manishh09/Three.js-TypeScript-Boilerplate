import * as THREE from 'three'


export function createScene(bg: string = '') {
    const scene = new THREE.Scene()
    if (bg === 'color') {
        scene.background = new THREE.Color(0x123456)
    }
    if (bg === 'texture') {
        scene.background = new THREE.TextureLoader().load('https://sbcode.net/img/grid.png')
    }
    if (bg === 'cubictexture') {
        scene.background = new THREE.CubeTextureLoader().setPath('https://sbcode.net/img/').load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])
    }
    return scene
}
