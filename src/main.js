import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { Player } from './controls';
import { World } from './world';

let scene, world, renderer, controls;
let prevTime = performance.now();

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

//Instanciação de controle do jogador
controls = new Player();

//Instanciação do mundo
world = new World(scene);

//Contador de FPS
const stats = new Stats();
document.body.append(stats.dom);

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

  stats.update();

  prevTime = time;
}

setLights();
animate();