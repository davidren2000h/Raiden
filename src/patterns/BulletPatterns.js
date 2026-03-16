/**
 * Bullet patterns for enemies and bosses.
 * Each function creates bullets via the state's enemyBullets array.
 */
import { Bullet } from '../entities/Bullet.js';
import {
    ENEMY_BULLET_WIDTH, ENEMY_BULLET_HEIGHT,
    ENEMY_BULLET_SPEED, COLOR_ENEMY_BULLET,
} from '../utils/constants.js';
import { angleTo } from '../utils/math.js';

/**
 * Fire a single bullet aimed at the player.
 */
export function fireBulletAtPlayer(enemy, player, state) {
    const angle = angleTo(enemy.x, enemy.y, player.x, player.y);
    const vx = Math.cos(angle) * ENEMY_BULLET_SPEED;
    const vy = Math.sin(angle) * ENEMY_BULLET_SPEED;
    state.enemyBullets.push(
        new Bullet(enemy.x, enemy.y, vx, vy,
            ENEMY_BULLET_WIDTH, ENEMY_BULLET_HEIGHT, 1, COLOR_ENEMY_BULLET),
    );
}

/**
 * Fire a 3-way spread aimed roughly toward the player.
 */
export function fireSpread3(enemy, player, state) {
    const baseAngle = angleTo(enemy.x, enemy.y, player.x, player.y);
    const spreadAngle = 0.3; // ~17°
    for (let i = -1; i <= 1; i++) {
        const angle = baseAngle + i * spreadAngle;
        const vx = Math.cos(angle) * ENEMY_BULLET_SPEED;
        const vy = Math.sin(angle) * ENEMY_BULLET_SPEED;
        state.enemyBullets.push(
            new Bullet(enemy.x, enemy.y, vx, vy,
                ENEMY_BULLET_WIDTH, ENEMY_BULLET_HEIGHT, 1, COLOR_ENEMY_BULLET),
        );
    }
}

/**
 * Fire bullets in a radial burst (used by bosses).
 * @param {number} count  number of bullets in the ring
 */
export function fireRadial(enemy, state, count) {
    const step = (Math.PI * 2) / count;
    for (let i = 0; i < count; i++) {
        const angle = step * i + enemy.elapsed; // rotate over time
        const vx = Math.cos(angle) * ENEMY_BULLET_SPEED * 0.8;
        const vy = Math.sin(angle) * ENEMY_BULLET_SPEED * 0.8;
        state.enemyBullets.push(
            new Bullet(enemy.x, enemy.y, vx, vy,
                ENEMY_BULLET_WIDTH, ENEMY_BULLET_HEIGHT, 1, COLOR_ENEMY_BULLET),
        );
    }
}
