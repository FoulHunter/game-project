import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

let camera, scene, renderer, controls;

const objects = [];

let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

//Renderizador
renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Setup da camera
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);
camera.position.y = 10;

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

controls = new PointerLockControls(camera, document.body);

const blocker = document.getElementById( 'blocker' );
const instructions = document.getElementById( 'instructions' );

instructions.addEventListener( 'click' , function() {
  controls.lock();
});

controls.addEventListener( 'lock', function() {
  instructions.style.display = 'none';
  blocker.style.display = 'none';
} );

controls.addEventListener( 'unlock', function() {
  blocker.style.display = 'block';
  instructions.style.display = '';
} );

scene.add(controls.object);

const onKeyDown = function ( event ) {
  switch ( event.code ) {
    case 'ArrowUp':
    case 'KeyW':
      moveForward = true;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = true;
      break;
    case 'ArrowDown':
    case 'KeyS':
      moveBackward = true;
      break;
    case 'ArrowRight':
    case 'KeyD':
      moveRight = true;
      break;
    case 'Space':
      if (canJump === true) velocity.y += 500;
      canJump = false;
      break;
  }
};

const onKeyUp = function ( event ) {
  switch ( event.code ) {
    case 'ArrowUp':
    case 'KeyW':
      moveForward = false;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = false;
      break;
    case 'ArrowDown':
    case 'KeyS':
      moveBackward = false;
      break;
    case 'ArrowRight':
    case 'KeyD':
      moveRight = false;
      break;
  }
};

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);

//Chão
let floorGeometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
floorGeometry.rotateX( - Math.PI / 2 );
const floorMaterial = new THREE.MeshStandardMaterial( { color: 0xffffee } );
const floor = new THREE.Mesh( floorGeometry, floorMaterial );

//Parades
let wallGeometry = new THREE.BoxGeometry(200, 200, 1);
let wallYGeometry = new THREE.BoxGeometry(200, 200, 1);
wallYGeometry.rotateY(-Math.PI / 2);
const wallMaterial = new THREE.MeshStandardMaterial({color: 0x777788});
const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
const wallY1 = new THREE.Mesh(wallYGeometry, wallMaterial);
const wallY2 = new THREE.Mesh(wallYGeometry, wallMaterial);
  
wall1.position.set(0, 10, 100);
wall2.position.set(0, 10, -100);
wallY1.position.set(100, 10, 0);
wallY2.position.set(-100, 10, 0);

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
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
} );

//Renderizar Frame por Frame
function animate() {
  requestAnimationFrame(animate);

  const time = performance.now();

  if ( controls.isLocked === true ) {

    raycaster.ray.origin.copy( controls.object.position );
    raycaster.ray.origin.y -= 10;

    const intersections = raycaster.intersectObjects( objects, false );

    const onObject = intersections.length > 0;

    const delta = ( time - prevTime ) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;
    velocity.y -= 9.8 * 100.0 * delta;

    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveRight ) - Number( moveLeft );
    direction.normalize();

    if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
    if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

    if ( onObject === true ) {
      velocity.y = Math.max( 0, velocity.y );
      canJump = true;
    }

    controls.moveRight( - velocity.x * delta );
    controls.moveForward( - velocity.z * delta );
    
    controls.object.position.y += ( velocity.y * delta );

    if ( controls.object.position.y < 10 ) {

      velocity.y = 0;
      controls.object.position.y = 10;

      canJump = true;

    }

  }
  prevTime = time;
  renderer.render( scene, camera );
}

setLights();
animate();