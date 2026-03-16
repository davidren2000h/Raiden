/**
 * Power-up entity.
 * Drifts downward and is picked up on collision with the player.
 * Type determines the effect applied.
 */
import { Entity } from './Entity.js';
import { POWERUP_WIDTH, POWERUP_HEIGHT, POWERUP_SPEED, COLOR_POWERUP, COLOR_POWERUP_HEALTH, COLOR_POWERUP_LIFE, COLOR_POWERUP_GUN_TIER, COLOR_POWERUP_MSL_TIER, CANVAS_HEIGHT } from '../utils/constants.js';

export const POWERUP_TYPE = {
    WEAPON: 'weapon',
    HEALTH: 'health',
    LIFE: 'life',
    GUN_TIER: 'gunTier',
    MISSILE_TIER: 'missileTier',
};

const POWERUP_COLORS = {
    [POWERUP_TYPE.WEAPON]: COLOR_POWERUP,
    [POWERUP_TYPE.HEALTH]: COLOR_POWERUP_HEALTH,
    [POWERUP_TYPE.LIFE]: COLOR_POWERUP_LIFE,
    [POWERUP_TYPE.GUN_TIER]: COLOR_POWERUP_GUN_TIER,
    [POWERUP_TYPE.MISSILE_TIER]: COLOR_POWERUP_MSL_TIER,
};

const POWERUP_LABELS = {
    [POWERUP_TYPE.WEAPON]: 'P',
    [POWERUP_TYPE.HEALTH]: 'H',
    [POWERUP_TYPE.LIFE]: '1UP',
    [POWERUP_TYPE.GUN_TIER]: 'G+',
    [POWERUP_TYPE.MISSILE_TIER]: 'M+',
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
        ctx.fillStyle = POWERUP_COLORS[this.type] || COLOR_POWERUP;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        // Letter
        ctx.fillStyle = '#FFF';
        const label = POWERUP_LABELS[this.type] || 'P';
        ctx.font = label.length > 1 ? 'bold 9px monospace' : 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, 0, 1);

        ctx.restore();
    }
}
