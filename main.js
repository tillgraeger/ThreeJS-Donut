import './style.css'

import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.render(scene, camera);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(0);

renderer.render(scene, camera);



// const geometry = new THREE.SphereGeometry(15, 128, 128);
// const material = new THREE.MeshStandardMaterial({ color: 0xF9F6EE });
// const sphere = new THREE.Mesh(geometry, material);
var donut, icing;

// scene.add(sphere);

const loader = new GLTFLoader();

loader.load( '/donut.glb', function ( gltf ) {

  donut = gltf.scene.children[0];
  icing = gltf.scene.children[1];
  donut.add(PointLight);
  donut.scale.set(200, 200, 200);
  icing.scale.set(200, 200, 200);
	scene.add( donut );
  scene.add( icing );
}, undefined, function ( error ) {

	console.error( error );

} );



const PointLight = new THREE.PointLight(0xF9F6EE);
PointLight.position.set(0, 10, -10);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}
animate();

const tl1 = gsap.timeline( { defaults: { duration: 2.5 } } );
const tl2 = gsap.timeline( { defaults: { duration: 2.5 } });

// tl1.fromTo(sphere.position, {z:-100}, {z: 0});
// tl2.fromTo(sphere.rotation, {y: 0}, {y: 5.5});
tl1.fromTo('#title', {opacity: 0}, {opacity: 1});