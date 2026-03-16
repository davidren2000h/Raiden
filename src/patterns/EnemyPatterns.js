/**
 * Enemy movement patterns.
 * Each pattern is a function (enemy, dt) => void that mutates the enemy position.
 * Patterns are decoupled from Enemy so new behaviours can be added without touching entities.
 */
import { CANVAS_WIDTH } from '../utils/constants.js';
import { clamp } from '../utils/math.js';

/** Straight downward movement. */
export function straightDown(enemy, dt) {
    enemy.y += enemy.speed * dt;
}

/** Sine-wave horizontal oscillation while descending. */
export function sineWave(enemy, dt) {
    enemy.y += enemy.speed * dt;
    enemy.x = enemy.startX + Math.sin(enemy.elapsed * 2.5) * 60;
}

/** Diagonal left-to-right drift. */
export function diagonalRight(enemy, dt) {
    enemy.y += enemy.speed * dt;
    enemy.x += enemy.speed * 0.5 * dt;
}

/** Diagonal right-to-left drift. */
export function diagonalLeft(enemy, dt) {
    enemy.y += enemy.speed * dt;
    enemy.x -= enemy.speed * 0.5 * dt;
}

/** Zigzag — changes direction periodically. */
export function zigzag(enemy, dt) {
    enemy.y += enemy.speed * dt;
    const period = 1.2;
    const dir = Math.floor(enemy.elapsed / period) % 2 === 0 ? 1 : -1;
    enemy.x += dir * enemy.speed * 0.8 * dt;
    enemy.x = clamp(enemy.x, enemy.width / 2, CANVAS_WIDTH - enemy.width / 2);
}
