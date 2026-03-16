/**
 * Central mutable game-state container.
 * Holds all entity lists, score, lives, and status flags.
 */
import { PLAYER_MAX_LIVES } from '../utils/constants.js';

export const STATE = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'gameOver',
};

export class GameState {
    constructor() {
        this.reset();
    }

    reset() {
        this.status = STATE.MENU;
        this.score = 0;
        this.highScore = 0;
        this.lives = PLAYER_MAX_LIVES;
        this.player = null;
        this.playerBullets = [];
        this.enemyBullets = [];
        this.enemies = [];
        this.explosions = [];
        this.powerUps = [];
        this.stageTime = 0;      // elapsed time in current stage
    }
}
