/**
 * Main game orchestrator.
 * Owns the canvas, the game loop, and ties all systems together.
 */
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../utils/constants.js';
import { GameState, STATE } from './GameState.js';
import { Input } from './Input.js';
import { Timer } from './Timer.js';
import { Camera } from './Camera.js';
import { AssetLoader } from './AssetLoader.js';
import { Player } from '../entities/Player.js';
import { BulletManager } from '../systems/BulletManager.js';
import { EnemyManager } from '../systems/EnemyManager.js';
import { CollisionSystem } from '../systems/CollisionSystem.js';
import { SpawnSystem } from '../systems/SpawnSystem.js';
import { ScoreSystem } from '../systems/ScoreSystem.js';
import { AudioSystem } from '../systems/AudioSystem.js';
import { StageManager } from '../stages/StageManager.js';
import { HUD } from '../ui/HUD.js';
import { StartScreen } from '../ui/StartScreen.js';
import { PauseScreen } from '../ui/PauseScreen.js';
import { GameOverScreen } from '../ui/GameOverScreen.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        this.ctx = canvas.getContext('2d');

        this.input = new Input();
        this.timer = new Timer();
        this.camera = new Camera();
        this.assets = new AssetLoader();
        this.state = new GameState();

        // Systems
        this.bulletManager = new BulletManager(this.state);
        this.enemyManager = new EnemyManager(this.state);
        this.collisionSystem = new CollisionSystem(this.state);
        this.spawnSystem = new SpawnSystem(this.state);
        this.scoreSystem = new ScoreSystem(this.state);
        this.audioSystem = new AudioSystem();
        this.stageManager = new StageManager(this.state, this.spawnSystem);

        // UI
        this.hud = new HUD(this.state);
        this.startScreen = new StartScreen();
        this.pauseScreen = new PauseScreen();
        this.gameOverScreen = new GameOverScreen(this.state);

        // Pause key debounce
        this._pausePressed = false;
        this._enterPressed = false;

        this._boundLoop = this._loop.bind(this);
    }

    async init() {
        await this.assets.loadAll();
        this._generateStars();
        requestAnimationFrame(this._boundLoop);
    }

    // ── starfield for scrolling background ──────────────
    _generateStars() {
        this._stars = [];
        for (let i = 0; i < 120; i++) {
            this._stars.push({
                x: Math.random() * CANVAS_WIDTH,
                y: Math.random() * CANVAS_HEIGHT,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 40 + 20,
                brightness: Math.floor(Math.random() * 156) + 100,
            });
        }
    }

    // ── state transitions ───────────────────────────────
    _startNewGame() {
        this.state.reset();
        this.state.status = STATE.PLAYING;
        this.camera.reset();
        this.timer.reset();
        this.stageManager.reset();

        const player = new Player(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 80, this.input, this.bulletManager);
        this.state.player = player;
    }

    // ── main loop ───────────────────────────────────────
    _loop(timestamp) {
        this.timer.tick(timestamp);
        const dt = this.timer.dt;

        this._handleGlobalInput();

        switch (this.state.status) {
            case STATE.MENU:
                this._drawBackground(dt);
                this.startScreen.draw(this.ctx);
                break;
            case STATE.PLAYING:
                this._update(dt);
                this._draw(dt);
                break;
            case STATE.PAUSED:
                this._draw(0);
                this.pauseScreen.draw(this.ctx);
                break;
            case STATE.GAME_OVER:
                this._draw(0);
                this.gameOverScreen.draw(this.ctx);
                break;
        }

        requestAnimationFrame(this._boundLoop);
    }

    _handleGlobalInput() {
        // Enter to start / restart
        if (this.input.enter) {
            if (!this._enterPressed) {
                this._enterPressed = true;
                if (this.state.status === STATE.MENU || this.state.status === STATE.GAME_OVER) {
                    this._startNewGame();
                }
            }
        } else {
            this._enterPressed = false;
        }

        // Pause toggle
        if (this.input.pause) {
            if (!this._pausePressed) {
                this._pausePressed = true;
                if (this.state.status === STATE.PLAYING) {
                    this.state.status = STATE.PAUSED;
                } else if (this.state.status === STATE.PAUSED) {
                    this.state.status = STATE.PLAYING;
                }
            }
        } else {
            this._pausePressed = false;
        }
    }

    // ── update ──────────────────────────────────────────
    _update(dt) {
        this.state.stageTime += dt;
        this.camera.update(dt);

        // Player
        if (this.state.player && this.state.player.active) {
            this.state.player.update(dt);
        }

        // Stage waves
        this.stageManager.update(dt);

        // Systems
        this.bulletManager.update(dt);
        this.enemyManager.update(dt, this.state.player);
        this.collisionSystem.update(this.scoreSystem, this.spawnSystem);

        // Explosions
        for (let i = this.state.explosions.length - 1; i >= 0; i--) {
            this.state.explosions[i].update(dt);
            if (!this.state.explosions[i].active) {
                this.state.explosions.splice(i, 1);
            }
        }

        // Power-ups
        for (let i = this.state.powerUps.length - 1; i >= 0; i--) {
            this.state.powerUps[i].update(dt);
            if (!this.state.powerUps[i].active) {
                this.state.powerUps.splice(i, 1);
            }
        }

        // Check game over
        if (this.state.lives <= 0 && (!this.state.player || !this.state.player.active)) {
            this.state.status = STATE.GAME_OVER;
            if (this.state.score > this.state.highScore) {
                this.state.highScore = this.state.score;
            }
        }
    }

    // ── draw ────────────────────────────────────────────
    _draw(dt) {
        this._drawBackground(dt);

        // Power-ups
        for (const p of this.state.powerUps) {
            p.draw(this.ctx);
        }

        // Player bullets
        for (const b of this.state.playerBullets) {
            b.draw(this.ctx);
        }

        // Enemy bullets
        for (const b of this.state.enemyBullets) {
            b.draw(this.ctx);
        }

        // Enemies
        for (const e of this.state.enemies) {
            e.draw(this.ctx);
        }

        // Player
        if (this.state.player && this.state.player.active) {
            this.state.player.draw(this.ctx);
        }

        // Explosions (drawn on top)
        for (const ex of this.state.explosions) {
            ex.draw(this.ctx);
        }

        // HUD
        this.hud.draw(this.ctx);
    }

    _drawBackground(dt) {
        this.ctx.fillStyle = '#0a0a1a';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Scrolling starfield
        for (const star of this._stars) {
            star.y += star.speed * dt;
            if (star.y > CANVAS_HEIGHT) {
                star.y -= CANVAS_HEIGHT;
                star.x = Math.random() * CANVAS_WIDTH;
            }
            const hex = star.brightness.toString(16).padStart(2, '0');
            this.ctx.fillStyle = `#${hex}${hex}${hex}`;
            this.ctx.fillRect(star.x, star.y, star.size, star.size);
        }
    }
}
