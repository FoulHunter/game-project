import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/Addons.js';

export class Player {

    //Definição de velocidade e input do jogador
    input = new THREE.Vector3();
    velocity = new THREE.Vector3();

    //Booleanos para uso em evento
    moveForward = false;
	moveBackward = false;
	moveLeft = false;
	moveRight = false;
    isSprnt = false;

    //Inicialização de camera, controle e raycaster
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 500 );
    controls = new PointerLockControls( this.camera, document.body );
    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, -1, 0 ), 0, 10 );
    
    constructor() {
        this.camera.position.set( 0, 10, 0 );

        document.addEventListener( 'keydown', this.onKeyDown.bind(this) );
        document.addEventListener( 'keyup', this.onKeyUp.bind(this) );
    }

    //Atualiza a posição do jogador a cada segundo
    applyInputs( dt ) {
        if ( this.controls.isLocked === true ) {
            
            if ( this.isSprnt === true ) {
                this.moveSpd = 7;
            } else {
                this.moveSpd = 15;
            }

            this.velocity.x -= this.velocity.x * this.moveSpd * dt;
            this.velocity.z -= this.velocity.z * this.moveSpd * dt;

            this.input.z -= Number( this.moveForward ) - Number( this.moveBackward );
            this.input.x -= Number( this.moveRight ) - Number( this.moveLeft );
            this.input.normalize();

            if ( this.moveForward || this.moveBackward ) this.velocity.z -= this.input.z * 400.0 * dt;
            if ( this.moveLeft || this.moveRight ) this.velocity.x -= this.input.x * 400.0 * dt;

            this.controls.moveRight( this.velocity.x * dt );
            this.controls.moveForward( this.velocity.z * dt );
        }    
    }

    //Verifica se a tecla foi pressionada
    onKeyDown = function ( event ) {
      switch ( event.code ) {
        case 'ArrowUp':
        case 'KeyW':
            this.moveForward = true;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            this.moveLeft = true;
            break;
        case 'ArrowDown':
        case 'KeyS':
            this.moveBackward = true;
            break;
        case 'ArrowRight':
        case 'KeyD':
            this.moveRight = true;
            break;
        case 'ShiftLeft':
            this.isSprnt = true;
      }
    };
    
    //Verifica se a tecla foi solta
    onKeyUp = function ( event ) {
      switch ( event.code ) {
        case 'ArrowUp':
        case 'KeyW':
            this.moveForward = false;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            this.moveLeft = false;
            break;
        case 'ArrowDown':
        case 'KeyS':
            this.moveBackward = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            this.moveRight = false;
            break;
        case 'ShiftLeft':
            this.isSprnt = false;
            break;
        }
    };
}