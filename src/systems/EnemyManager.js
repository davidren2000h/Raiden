/**
 * EnemyManager — updates enemies, manages their firing via bullet patterns.
 */
import { fireBulletAtPlayer } from '../patterns/BulletPatterns.js';

export class EnemyManager {
    constructor(state) {
        this.state = state;
    }

    update(dt, player) {
        for (let i = this.state.enemies.length - 1; i >= 0; i--) {
            const enemy = this.state.enemies[i];
            enemy.update(dt);

            if (!enemy.active) {
                this.state.enemies.splice(i, 1);
                continue;
            }

            // Enemy firing
            enemy.fireTimer -= dt;
            if (enemy.fireTimer <= 0 && player && player.active) {
                enemy.fireTimer = enemy.fireRate;
                fireBulletAtPlayer(enemy, player, this.state);
            }
        }
    }
}
