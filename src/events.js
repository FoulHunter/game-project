import { Player } from "./controls";

const pl = new Player();

const blocker = document.getElementById( 'blocker' );
const instructions = document.getElementById( 'instructions' );
const btnClick = document.getElementById( 'startBtn' );

const openBtn = document.getElementById( 'openModal' );
const closeBtn = document.getElementById( 'closeBtn' );
const modal = document.getElementById( 'modal' );

openBtn.addEventListener( 'click', () => {
    modal.classList.add('open');
} );

closeBtn.addEventListener( 'click', () => {
    modal.classList.remove('open');
} );

btnClick.addEventListener( 'click' , () => {
  pl.controls.lock();
} );

pl.controls.addEventListener( 'lock', () => {
  instructions.style.display = 'none';
  blocker.style.display = 'none';
} );

pl.controls.addEventListener( 'unlock', () => {
  blocker.style.display = 'block';
  instructions.style.display = '';
} );

