/**
 * Explosion visual effect entity.
 * Grows and fades over its lifetime, then deactivates.
 */
import { Entity } from './Entity.js';
import { EXPLOSION_DURATION, EXPLOSION_MAX_RADIUS, COLOR_EXPLOSION } from '../utils/constants.js';

export class Explosion extends Entity {
    constructor(x, y) {
        super(x, y, 0, 0);
        this.elapsed = 0;
        this.duration = EXPLOSION_DURATION;
        this.maxRadius = EXPLOSION_MAX_RADIUS;
    }

    update(dt) {
        this.elapsed += dt;
        if (this.elapsed >= this.duration) {
            this.active = false;
        }
    }

    draw(ctx) {
        const t = this.elapsed / this.duration; // 0 → 1
        const radius = this.maxRadius * t;
        const alpha = 1 - t;

        ctx.save();
        ctx.globalAlpha = alpha;

        // Outer ring
        ctx.strokeStyle = COLOR_EXPLOSION;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner fill
        ctx.fillStyle = '#FFEB3B';
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius * 0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}
