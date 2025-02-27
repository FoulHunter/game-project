import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { Player } from './controls';
import { time } from 'three/tsl';

let scene, renderer, controls;

const objects = [];

let prevTime = performance.now();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

//Renderizador
renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Setup da cena
scene = new THREE.Scene();
scene.background = new THREE.Color( 0xeeeeff );
scene.fog = new THREE.Fog( 0xeeeeff, 0, 400 );

//Luzes
function setLights() {
  const dirLight = new THREE.DirectionalLight( 0xffffff, 1.75 );
  dirLight.position.set( 95, 105, 95 );

  const hemiLight = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 1.5 );
  
  scene.add(hemiLight, dirLight);

  addHelpers(dirLight);
}

controls = new Player(scene);

//Chão
let floorGeometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
floorGeometry.rotateX( - Math.PI / 2 );
const floorMaterial = new THREE.MeshStandardMaterial( { color: 0x777788 } );
const floor = new THREE.Mesh( floorGeometry, floorMaterial );

//Parades
let wallGeometry = new THREE.BoxGeometry(200, 110, 1);
let wallYGeometry = new THREE.BoxGeometry(200, 110, 1);
wallYGeometry.rotateY(-Math.PI / 2);
const wallMaterial = new THREE.MeshStandardMaterial({color: 0x777788});
const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
const wallY1 = new THREE.Mesh(wallYGeometry, wallMaterial);
const wallY2 = new THREE.Mesh(wallYGeometry, wallMaterial);
  
wall1.position.set(0, 55, 100);
wall2.position.set(0, 55, -100);
wallY1.position.set(100, 55, 0);
wallY2.position.set(-100, 55, 0);

//Teto
const tetoGeometry = new THREE.BoxGeometry(200, 200, 1);
const tetoMaterial = new THREE.MeshStandardMaterial({color: 0x777788});
tetoGeometry.rotateX(-Math.PI / 2);
const teto = new THREE.Mesh(tetoGeometry, tetoMaterial);
teto.position.set(0, 110, 0);

//Adicionar MESH
scene.add( floor, wall1, wall2, wallY1, wallY2, teto );

//Helpers
function addHelpers(lightOrigin) {
  scene.add( new THREE.AxesHelper(20) );
  scene.add( new THREE.GridHelper(1000, 100) );
  scene.add( new THREE.DirectionalLightHelper(lightOrigin) );
}

//Redimensionar tela
window.addEventListener( 'resize', () => {
  controls.camera.aspect = window.innerWidth / window.innerHeight;
  controls.camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
} );

//Renderizar Frame por Frame
function animate() {

  const time = performance.now();
  const delta = (time - prevTime) / 1000; 

  requestAnimationFrame(animate);
  controls.applyInputs(delta);
  renderer.render( scene, controls.camera );

  prevTime = time;
}

setLights();
animate();