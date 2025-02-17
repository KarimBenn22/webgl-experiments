import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
// use TextureLoader to load the texture
const texture = new THREE.TextureLoader().load('textures/flag.png');
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.PlaneGeometry(5,3);
const material = new THREE.ShaderMaterial(
    {
        uniforms: {
            uTexture: { value: texture }
        },
        vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `,
        fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uTexture;
        void main() {
            gl_FragColor = texture2D(uTexture, vUv);
        }
        `
    }
);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.z = 5;

function animate(){
    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);
