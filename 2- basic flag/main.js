import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.PlaneGeometry( 4.5, 2 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: false} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );

camera.position.z = 5;

function animate() {
	renderer.render( scene, camera );
}