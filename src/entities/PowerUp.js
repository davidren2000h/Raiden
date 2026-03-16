/**
 * Power-up entity.
 * Drifts downward and is picked up on collision with the player.
 * Type determines the effect applied.
 */
import { Entity } from './Entity.js';
import { POWERUP_WIDTH, POWERUP_HEIGHT, POWERUP_SPEED, COLOR_POWERUP, CANVAS_HEIGHT } from '../utils/constants.js';

export const POWERUP_TYPE = {
    WEAPON: 'weapon',
};

export class PowerUp extends Entity {
    constructor(x, y, type) {
        super(x, y, POWERUP_WIDTH, POWERUP_HEIGHT);
        this.type = type;
        this.speed = POWERUP_SPEED;
        this.elapsed = 0;
    }

    update(dt) {
        this.y += this.speed * dt;
        this.elapsed += dt;
        if (this.y - this.height / 2 > CANVAS_HEIGHT + 20) {
            this.active = false;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Pulsing glow
        const pulse = 0.8 + 0.2 * Math.sin(this.elapsed * 6);
        ctx.globalAlpha = pulse;

        // Outer box
        ctx.fillStyle = COLOR_POWERUP;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        // Letter
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('P', 0, 1);

        ctx.restore();
    }
}
