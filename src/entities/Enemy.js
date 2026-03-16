/**
 * Enemy entity.
 * Behaviour is driven externally by a movement pattern function and
 * bullet pattern (via EnemyManager and patterns modules).
 */
import { Entity } from './Entity.js';
import { CANVAS_HEIGHT } from '../utils/constants.js';

export class Enemy extends Entity {
    /**
     * @param {number} x
     * @param {number} y
     * @param {object} config  { width, height, speed, hp, score, fireRate, color }
     * @param {function} movementPattern  (enemy, dt) => void
     */
    constructor(x, y, config, movementPattern) {
        super(x, y, config.width, config.height);
        this.speed = config.speed;
        this.hp = config.hp;
        this.maxHp = config.hp;
        this.score = config.score;
        this.fireRate = config.fireRate;
        this.fireTimer = Math.random() * config.fireRate; // stagger initial shots
        this.color = config.color;
        this.movementPattern = movementPattern;
        this.elapsed = 0;       // time alive (used by patterns)
        this.startX = x;
        this.startY = y;
    }

    /** Take damage. Returns true if destroyed. */
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

        // Deactivate if off-screen below
        if (this.y - this.height / 2 > CANVAS_HEIGHT + 40) {
            this.active = false;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Body — a diamond / rotated square
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, -this.height / 2);
        ctx.lineTo(this.width / 2, 0);
        ctx.lineTo(0, this.height / 2);
        ctx.lineTo(-this.width / 2, 0);
        ctx.closePath();
        ctx.fill();

        // Centre dot
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();

        // HP bar (only for enemies with > 1 maxHp)
        if (this.maxHp > 1) {
            const barW = this.width;
            const barH = 3;
            const ratio = this.hp / this.maxHp;
            ctx.fillStyle = '#333';
            ctx.fillRect(-barW / 2, -this.height / 2 - 6, barW, barH);
            ctx.fillStyle = ratio > 0.5 ? '#4CAF50' : '#F44336';
            ctx.fillRect(-barW / 2, -this.height / 2 - 6, barW * ratio, barH);
        }

        ctx.restore();
    }
}
