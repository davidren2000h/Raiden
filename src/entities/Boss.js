/**
 * Boss entity.
 * Extended enemy with multiple attack phases.
 * Phase behaviour is injected via BossPatterns.
 */
import { Entity } from './Entity.js';
import {
    BOSS_WIDTH, BOSS_HEIGHT, BOSS_HP, BOSS_SPEED, BOSS_SCORE,
    BOSS_FIRE_RATE, COLOR_BOSS, CANVAS_WIDTH,
} from '../utils/constants.js';

export class Boss extends Entity {
    /**
     * @param {number} x
     * @param {number} y
     * @param {function} movementPattern (boss, dt) => void
     */
    constructor(x, y, movementPattern) {
        super(x, y, BOSS_WIDTH, BOSS_HEIGHT);
        this.speed = BOSS_SPEED;
        this.hp = BOSS_HP;
        this.maxHp = BOSS_HP;
        this.score = BOSS_SCORE;
        this.fireRate = BOSS_FIRE_RATE;
        this.fireTimer = 1; // small delay before first shot
        this.color = COLOR_BOSS;
        this.movementPattern = movementPattern;
        this.elapsed = 0;
        this.startX = x;
        this.startY = y;
        this.isBoss = true;
    }

    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.active = false;
            return true;
        }
        return false;
    }

    update(dt) {
        this.elapsed += dt;
        this.movementPattern(this, dt);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Main body — hexagonal shape
        ctx.fillStyle = this.color;
        ctx.beginPath();
        const hw = this.width / 2;
        const hh = this.height / 2;
        ctx.moveTo(0, -hh);
        ctx.lineTo(hw, -hh * 0.4);
        ctx.lineTo(hw, hh * 0.4);
        ctx.lineTo(0, hh);
        ctx.lineTo(-hw, hh * 0.4);
        ctx.lineTo(-hw, -hh * 0.4);
        ctx.closePath();
        ctx.fill();

        // Inner glow
        ctx.fillStyle = '#FF80AB';
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill();

        // HP bar
        const barW = this.width + 20;
        const barH = 5;
        const ratio = this.hp / this.maxHp;
        ctx.fillStyle = '#333';
        ctx.fillRect(-barW / 2, -hh - 12, barW, barH);
        ctx.fillStyle = ratio > 0.3 ? '#F44336' : '#FF1744';
        ctx.fillRect(-barW / 2, -hh - 12, barW * ratio, barH);

        ctx.restore();
    }
}
