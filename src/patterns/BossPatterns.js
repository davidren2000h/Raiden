/**
 * Boss-specific movement and attack patterns.
 */
import { CANVAS_WIDTH } from '../utils/constants.js';
import { clamp } from '../utils/math.js';
import { fireRadial, fireSpread3 } from './BulletPatterns.js';

/**
 * Default boss pattern:
 *  1. Enter from top and stop at y=100
 *  2. Oscillate horizontally
 *  Boss firing is handled inside the pattern via elapsed-time gating.
 */
export function bossPattern1(boss, dt) {
    // Phase 1: descend to y=100
    if (boss.y < 100) {
        boss.y += boss.speed * dt;
        return;
    }

    // Phase 2: sway left-right
    boss.x = CANVAS_WIDTH / 2 + Math.sin(boss.elapsed * 0.8) * (CANVAS_WIDTH / 2 - boss.width / 2 - 20);
    boss.x = clamp(boss.x, boss.width / 2, CANVAS_WIDTH - boss.width / 2);
}
