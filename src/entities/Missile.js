/**
 * Missile entity — homing projectile fired by the player.
 * Automatically tracks the nearest active enemy.
 */
import { Entity } from './Entity.js';
import {
    MISSILE_WIDTH, MISSILE_HEIGHT, MISSILE_SPEED,
    MISSILE_TURN_RATE, MISSILE_BASE_DAMAGE, COLOR_MISSILE,
    CANVAS_WIDTH, CANVAS_HEIGHT,
} from '../utils/constants.js';
import { angleTo, normalizeAngle } from '../utils/math.js';

export class Missile extends Entity {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} angle   heading in radians
     * @param {number} [damage]  tier-based damage (default MISSILE_BASE_DAMAGE)
     * @param {string} [color]   tier-based color (default COLOR_MISSILE)
     */
    constructor(x, y, angle, damage, color) {
        super(x, y, MISSILE_WIDTH, MISSILE_HEIGHT);
        this.angle = angle;
        this.speed = MISSILE_SPEED;
        this.turnRate = MISSILE_TURN_RATE;
        this.damage = damage || MISSILE_BASE_DAMAGE;
        this.color = color || COLOR_MISSILE;
        this.elapsed = 0;
    }

    /**
     * Find nearest active enemy from the list.
     * @param {Entity[]} enemies
     * @returns {Entity|null}
     */
    _findTarget(enemies) {
        let closest = null;
        let closestDist = Infinity;
        for (const e of enemies) {
            if (!e.active) continue;
            const dx = e.x - this.x;
            const dy = e.y - this.y;
            const dist = dx * dx + dy * dy;
            if (dist < closestDist) {
                closestDist = dist;
                closest = e;
            }
        }
        return closest;
    }

    /**
     * @param {number} dt
     * @param {Entity[]} enemies  — passed in by BulletManager
     */
    updateWithEnemies(dt, enemies) {
        this.elapsed += dt;

        // Home towards nearest enemy
        const target = this._findTarget(enemies);
        if (target) {
            const desired = angleTo(this.x, this.y, target.x, target.y);
            let diff = desired - this.angle;
            // normalise to [-PI, PI]
            while (diff > Math.PI)  diff -= Math.PI * 2;
            while (diff < -Math.PI) diff += Math.PI * 2;

            const maxTurn = this.turnRate * dt;
            if (Math.abs(diff) < maxTurn) {
                this.angle = desired;
            } else {
                this.angle += Math.sign(diff) * maxTurn;
            }
        }

        this.x += Math.cos(this.angle) * this.speed * dt;
        this.y += Math.sin(this.angle) * this.speed * dt;

        // Off-screen removal
        const margin = 60;
        if (
            this.x < -margin || this.x > CANVAS_WIDTH + margin ||
            this.y < -margin || this.y > CANVAS_HEIGHT + margin
        ) {
            this.active = false;
        }
    }

    update(dt) {
        // Fallback — straight flight if called without enemies
        this.updateWithEnemies(dt, []);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle + Math.PI / 2); // sprite points up

        // Missile body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, -this.height / 2);
        ctx.lineTo(-this.width / 2, this.height / 2);
        ctx.lineTo(0, this.height / 2 - 3);
        ctx.lineTo(this.width / 2, this.height / 2);
        ctx.closePath();
        ctx.fill();

        // Exhaust flame
        const flicker = 2 + Math.sin(this.elapsed * 30) * 2;
        ctx.fillStyle = '#FF6D00';
        ctx.beginPath();
        ctx.moveTo(-2, this.height / 2);
        ctx.lineTo(0, this.height / 2 + flicker + 4);
        ctx.lineTo(2, this.height / 2);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}
