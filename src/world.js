import * as THREE from 'three'

export class World {

    //Chão
    floorGeometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
    floorMaterial = new THREE.MeshStandardMaterial( { color: 0x777788 } );
    floor = new THREE.Mesh( this.floorGeometry, this.floorMaterial );

    //Paredes
    wallGeometry = new THREE.BoxGeometry( 200, 110, 1 );
    wallYGeometry = new THREE.BoxGeometry( 200, 110, 1 );
    wallMaterial = new THREE.MeshStandardMaterial( {color: 0x777788} );
    wall1 = new THREE.Mesh( this.wallGeometry, this.wallMaterial );
    wall2 = new THREE.Mesh( this.wallGeometry, this.wallMaterial );
    wallY1 = new THREE.Mesh( this.wallYGeometry, this.wallMaterial );
    wallY2 = new THREE.Mesh( this.wallYGeometry, this.wallMaterial );

    //Teto
    cellingGeometry = new THREE.BoxGeometry(200, 200, 1);
    cellingMaterial = new THREE.MeshStandardMaterial( {color: 0x777788} );
    celling = new THREE.Mesh( this.cellingGeometry, this.cellingMaterial );

    constructor( scene ) {
        this.rotX( this.floorGeometry );
        this.rotX( this.cellingGeometry );
        this.rotY( this.wallYGeometry );

        this.posX( this.wall1, this.wall2 );
        this.posY( this.wallY1, this.wallY2 );
        this.posC( this.celling );

        scene.add( this.floor, this.wall1, this.wall2, this.wallY1, this.wallY2, this.celling );
    }

    rotX( geo ) {
        geo.rotateX( - Math.PI / 2 );
    }

    rotY( geo ) {
        geo.rotateY( - Math.PI / 2 );
    }

    posX( w1, w2 ) {
        w1.position.set( 0, 55, 100 );
        w2.position.set( 0, 55, -100 );
    }

    posY( w1, w2 ) {
        w1.position.set( 100, 55, 0 );
        w2.position.set( -100, 55, 0 );
    }

    posC( c ) {
        c.position.set( 0, 110, 0 );
    }
}