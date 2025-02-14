import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.PlaneGeometry(3,3);
const material = new THREE.ShaderMaterial(
    {
        uniforms: {
        },
        vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `,
        fragmentShader: `
        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
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