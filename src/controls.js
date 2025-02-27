import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/Addons.js';

export class Player {

    //Definição de velocidade do jogador
    moveSpd = 75;
    input = new THREE.Vector3();
    velocity = new THREE.Vector3();

    //Inicialização de camera, controle e raycaster
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);
    controls = new PointerLockControls(this.camera, document.body);
    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
    
    constructor(scene) {
        this.camera.position.set(0, 10, 0);

        document.addEventListener('keydown', this.onKeyDown.bind(this) );
        document.addEventListener('keyup', this.onKeyUp.bind(this) );
    }

    applyInputs(dt) {
        if ( this.controls.isLocked === true ) {
            this.velocity.x = this.input.x * this.moveSpd * dt;
            this.velocity.z = this.input.z * this.moveSpd * dt;

            this.controls.moveRight( this.velocity.x * dt );
            this.controls.moveForward( this.velocity.z * dt );
        }    
    }

    onKeyDown = function ( event ) {
      switch ( event.code ) {
        case 'ArrowUp':
        case 'KeyW':
            this.input.z = this.moveSpd;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            this.input.x = -this.moveSpd;
            break;
        case 'ArrowDown':
        case 'KeyS':
            this.input.z = -this.moveSpd;
            break;
        case 'ArrowRight':
        case 'KeyD':
            this.input.x = this.moveSpd;
            break;
        case 'Space':
            this.velocity.y += 30;
      }
    };
    
    onKeyUp = function ( event ) {
      switch ( event.code ) {
        case 'ArrowUp':
        case 'KeyW':
            this.input.z = 0;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            this.input.x = 0;
            break;
        case 'ArrowDown':
        case 'KeyS':
            this.input.z = 0;
            break;
        case 'ArrowRight':
        case 'KeyD':
            this.input.x = 0;
            break;
        }
    };
}

/* CÓDIGO DE MOVIMENTAÇÃO ANTIGO
                    raycaster.ray.origin.copy( controls.object.position );
					raycaster.ray.origin.y -= 10;

					const intersections = raycaster.intersectObjects( objects, false );

					const onObject = intersections.length > 0;

					const delta = ( time - prevTime ) / 1000;

                    velocity.x -= velocity.x * 10.0 * delta;
					velocity.z -= velocity.z * 10.0 * delta;

					velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

					direction.z = Number( moveForward ) - Number( moveBackward );
					direction.x = Number( moveRight ) - Number( moveLeft );
					direction.normalize(); // this ensures consistent movements in all directions

					if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
					if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

					if ( onObject === true ) {

						velocity.y = Math.max( 0, velocity.y );
						canJump = true;

					}

					controls.moveRight( - velocity.x * delta );
					controls.moveForward( - velocity.z * delta );

					controls.object.position.y += ( velocity.y * delta ); // new behavior

					if ( controls.object.position.y < 10 ) {

						velocity.y = 0;
						controls.object.position.y = 10;

						canJump = true;

					}
*/