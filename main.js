import './style.css'

import * as THREE from 'three'
import gsap from 'gsap'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.render(scene, camera);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(40);
camera.position.setX(0);

renderer.render(scene, camera);



const geometry = new THREE.SphereGeometry(15, 128, 128);
const material = new THREE.MeshStandardMaterial({ color: 0xF9F6EE });
const sphere = new THREE.Mesh(geometry, material);

scene.add(sphere);

const PointLight = new THREE.PointLight(0xF9F6EE);
PointLight.position.set(30, 45, 30);

sphere.add(PointLight);

function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.y += 0.03; 

    renderer.render(scene, camera);
}
animate();

const tl = gsap.timeline( { defaults: { duration: 2.5 } } );
tl.fromTo(sphere.position, {z:-100}, {z: 0});
tl.fromTo('#title', {opacity: 0}, {opacity: 1});