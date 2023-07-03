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
scene.background = new THREE.Color(0xff6e0c);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(0.25);
camera.position.setX(0);

renderer.render(scene, camera);

const loader = new GLTFLoader();
var donut = undefined;
var icing = undefined;

loader.load( '/donut.glb', function ( gltf ) {
  donut = gltf.scene.children[0];
  icing = gltf.scene.children[1];
  donut.position.set(0, 0, -3);
  icing.position.set(0, 0, -3);
  scene.add( gltf.scene );
}, function(xhr) {
  console.log( (xhr.loaded / xhr.total * 100) );
}, function ( error ) {

	console.error( error );

} );



const PointLight = new THREE.PointLight( 0xFFFFFF );
PointLight.position.set(0, 1, 1);
scene.add(PointLight);

const controls = new OrbitControls(camera, renderer.domElement);
const tl1 = gsap.timeline();
var animated = false;
var startRotation = false;
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    while (donut != undefined && !animated) {
      tl1.add(gsap.fromTo(donut.position, {x:0, y:0, z:-3}, {x:0, y:0, z: 0, duration: 1}));
      tl1.add(gsap.fromTo(icing.position, {x:0, y:0, z:-3}, {x:0, y:0, z: 0, duration: 1}), "<");
      tl1.add(gsap.fromTo('#title', {opacity: 0}, {opacity: 1, duration: 2}));
      animated = true;
      setTimeout(function() {
        startRotation = true;
      },1500);
    }
    if (startRotation) {
      donut.rotation.y += 0.01;
      icing.rotation.y += 0.01;
    }
}
animate();