import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth camera movement
controls.dampingFactor = 0.05;

// Plane with ShaderMaterial
const geometry = new THREE.PlaneGeometry(4.5, 2);
const material = new THREE.ShaderMaterial({
  vertexShader: `
    uniform float uTime;
    void main() {
      vec3 newPosition = position;
      newPosition.y += sin( uTime ) * 0.1;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
    }
  `,
  fragmentShader: `
    void main() {
      gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
  `,
  uniforms: {
    uTime: { value: 0.0 }
  }
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 5;

function animate(time) {
  material.uniforms.uTime.value = time * 0.001;
  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
