/**
 * Stage 1 definition.
 * Returns an array of wave descriptors sorted by spawnTime.
 * Each wave: { time, spawns: [{ x, y, config, pattern }] }
 */
import {
    CANVAS_WIDTH,
    ENEMY_BASIC_WIDTH, ENEMY_BASIC_HEIGHT, ENEMY_BASIC_SPEED,
    ENEMY_BASIC_HP, ENEMY_BASIC_SCORE, ENEMY_BASIC_FIRE_RATE,
    ENEMY_FAST_WIDTH, ENEMY_FAST_HEIGHT, ENEMY_FAST_SPEED,
    ENEMY_FAST_HP, ENEMY_FAST_SCORE, ENEMY_FAST_FIRE_RATE,
    ENEMY_HEAVY_WIDTH, ENEMY_HEAVY_HEIGHT, ENEMY_HEAVY_SPEED,
    ENEMY_HEAVY_HP, ENEMY_HEAVY_SCORE, ENEMY_HEAVY_FIRE_RATE,
    COLOR_ENEMY_BASIC, COLOR_ENEMY_FAST, COLOR_ENEMY_HEAVY,
} from '../utils/constants.js';
import { straightDown, sineWave, diagonalRight, diagonalLeft, zigzag } from '../patterns/EnemyPatterns.js';
import { bossPattern1 } from '../patterns/BossPatterns.js';

const BASIC = {
    width: ENEMY_BASIC_WIDTH, height: ENEMY_BASIC_HEIGHT,
    speed: ENEMY_BASIC_SPEED, hp: ENEMY_BASIC_HP,
    score: ENEMY_BASIC_SCORE, fireRate: ENEMY_BASIC_FIRE_RATE,
    color: COLOR_ENEMY_BASIC,
};

const FAST = {
    width: ENEMY_FAST_WIDTH, height: ENEMY_FAST_HEIGHT,
    speed: ENEMY_FAST_SPEED, hp: ENEMY_FAST_HP,
    score: ENEMY_FAST_SCORE, fireRate: ENEMY_FAST_FIRE_RATE,
    color: COLOR_ENEMY_FAST,
};

const HEAVY = {
    width: ENEMY_HEAVY_WIDTH, height: ENEMY_HEAVY_HEIGHT,
    speed: ENEMY_HEAVY_SPEED, hp: ENEMY_HEAVY_HP,
    score: ENEMY_HEAVY_SCORE, fireRate: ENEMY_HEAVY_FIRE_RATE,
    color: COLOR_ENEMY_HEAVY,
};

export function getStage1Waves() {
    const W = CANVAS_WIDTH;
    const waves = [];

    // ── Wave 1 — basic straight ─────────────────────────
    waves.push({
        time: 1,
        spawns: [
            { x: W * 0.25, y: -30, config: BASIC, pattern: straightDown },
            { x: W * 0.50, y: -30, config: BASIC, pattern: straightDown },
            { x: W * 0.75, y: -30, config: BASIC, pattern: straightDown },
        ],
    });

    // ── Wave 2 — sine wave ──────────────────────────────
    waves.push({
        time: 4,
        spawns: [
            { x: W * 0.3, y: -30, config: BASIC, pattern: sineWave },
            { x: W * 0.7, y: -30, config: BASIC, pattern: sineWave },
        ],
    });

    // ── Wave 3 — fast diagonal pair ─────────────────────
    waves.push({
        time: 7,
        spawns: [
            { x: 40, y: -30, config: FAST, pattern: diagonalRight },
            { x: W - 40, y: -30, config: FAST, pattern: diagonalLeft },
        ],
    });

    // ── Wave 4 — mixed ──────────────────────────────────
    waves.push({
        time: 10,
        spawns: [
            { x: W * 0.2, y: -30, config: BASIC, pattern: straightDown },
            { x: W * 0.5, y: -30, config: HEAVY, pattern: straightDown },
            { x: W * 0.8, y: -30, config: BASIC, pattern: straightDown },
        ],
    });

    // ── Wave 5 — zigzag ─────────────────────────────────
    waves.push({
        time: 14,
        spawns: [
            { x: W * 0.3, y: -30, config: FAST, pattern: zigzag },
            { x: W * 0.5, y: -50, config: FAST, pattern: zigzag },
            { x: W * 0.7, y: -30, config: FAST, pattern: zigzag },
        ],
    });

    // ── Wave 6 — heavy + escorts ────────────────────────
    waves.push({
        time: 18,
        spawns: [
            { x: W * 0.25, y: -30, config: BASIC, pattern: sineWave },
            { x: W * 0.50, y: -30, config: HEAVY, pattern: straightDown },
            { x: W * 0.75, y: -30, config: BASIC, pattern: sineWave },
        ],
    });

    // ── Wave 7 — diagonal swarm ─────────────────────────
    waves.push({
        time: 22,
        spawns: [
            { x: 30,      y: -30, config: FAST, pattern: diagonalRight },
            { x: 60,      y: -60, config: FAST, pattern: diagonalRight },
            { x: W - 30,  y: -30, config: FAST, pattern: diagonalLeft },
            { x: W - 60,  y: -60, config: FAST, pattern: diagonalLeft },
        ],
    });

    // ── Wave 8 — heavy pair ─────────────────────────────
    waves.push({
        time: 26,
        spawns: [
            { x: W * 0.35, y: -30, config: HEAVY, pattern: sineWave },
            { x: W * 0.65, y: -30, config: HEAVY, pattern: sineWave },
        ],
    });

    // ── Boss wave ───────────────────────────────────────
    waves.push({
        time: 32,
        boss: true,
        spawns: [
            { x: W / 2, y: -60, pattern: bossPattern1 },
        ],
    });

    return waves;
}
