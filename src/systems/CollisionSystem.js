/**
 * CollisionSystem — all collision detection and response in one place.
 */
import { rectsOverlap } from '../utils/rect.js';
import { Explosion } from '../entities/Explosion.js';
import { POWERUP_TYPE } from '../entities/PowerUp.js';

export class CollisionSystem {
    constructor(state) {
        this.state = state;
    }

    /**
     * Run all collision checks for the current frame.
     * @param {ScoreSystem} scoreSystem
     * @param {SpawnSystem} spawnSystem
     */
    update(scoreSystem, spawnSystem) {
        this._playerBulletsVsEnemies(scoreSystem, spawnSystem);
        this._enemyBulletsVsPlayer();
        this._enemiesVsPlayer();
        this._playerVsPowerUps();
    }

    // ── player bullets → enemies ────────────────────────
    _playerBulletsVsEnemies(scoreSystem, spawnSystem) {
        const bullets = this.state.playerBullets;
        const enemies = this.state.enemies;

        for (let bi = bullets.length - 1; bi >= 0; bi--) {
            const bullet = bullets[bi];
            if (!bullet.active) continue;

            for (let ei = enemies.length - 1; ei >= 0; ei--) {
                const enemy = enemies[ei];
                if (!enemy.active) continue;

                if (rectsOverlap(bullet.getRect(), enemy.getRect())) {
                    bullet.active = false;
                    const destroyed = enemy.takeDamage(bullet.damage);
                    if (destroyed) {
                        this.state.explosions.push(new Explosion(enemy.x, enemy.y));
                        scoreSystem.addScore(enemy.score);
                        spawnSystem.trySpawnPowerUp(enemy.x, enemy.y);
                        enemies.splice(ei, 1);
                    }
                    break; // bullet consumed
                }
            }
        }
    }

    // ── enemy bullets → player ──────────────────────────
    _enemyBulletsVsPlayer() {
        const player = this.state.player;
        if (!player || !player.active) return;

        const bullets = this.state.enemyBullets;
        for (let i = bullets.length - 1; i >= 0; i--) {
            const bullet = bullets[i];
            if (!bullet.active) continue;

            if (rectsOverlap(bullet.getRect(), player.getRect())) {
                bullet.active = false;
                const wasHit = player.hit();
                if (wasHit) {
                    this.state.explosions.push(new Explosion(player.x, player.y));
                    this._handlePlayerDeath();
                }
            }
        }
    }

    // ── enemy bodies → player (kamikaze) ────────────────
    _enemiesVsPlayer() {
        const player = this.state.player;
        if (!player || !player.active) return;

        for (let i = this.state.enemies.length - 1; i >= 0; i--) {
            const enemy = this.state.enemies[i];
            if (!enemy.active) continue;

            if (rectsOverlap(player.getRect(), enemy.getRect())) {
                // Destroy the enemy
                enemy.active = false;
                this.state.explosions.push(new Explosion(enemy.x, enemy.y));
                this.state.enemies.splice(i, 1);

                // Damage the player
                const wasHit = player.hit();
                if (wasHit) {
                    this.state.explosions.push(new Explosion(player.x, player.y));
                    this._handlePlayerDeath();
                }
                break;
            }
        }
    }

    // ── player ↔ power-ups ──────────────────────────────
    _playerVsPowerUps() {
        const player = this.state.player;
        if (!player || !player.active) return;

        for (let i = this.state.powerUps.length - 1; i >= 0; i--) {
            const pu = this.state.powerUps[i];
            if (!pu.active) continue;

            if (rectsOverlap(player.getRect(), pu.getRect())) {
                pu.active = false;
                this.state.powerUps.splice(i, 1);
                this._applyPowerUp(player, pu);
            }
        }
    }

    _applyPowerUp(player, powerUp) {
        if (powerUp.type === POWERUP_TYPE.WEAPON) {
            if (player.powerLevel < 2) {
                player.powerLevel++;
            }
        }
    }

    _handlePlayerDeath() {
        this.state.lives--;
        if (this.state.lives > 0) {
            // Respawn after a brief moment (handled immediately for simplicity)
            this.state.player.respawn();
        }
    }
}
