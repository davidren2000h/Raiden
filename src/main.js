/**
 * Entry point — initialise and start the game.
 */
import { Game } from './game/Game.js';

const canvas = document.getElementById('gameCanvas');
const game = new Game(canvas);
game.init();
