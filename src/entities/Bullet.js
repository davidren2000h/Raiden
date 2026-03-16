/**
 * Bullet entity — used for both player and enemy projectiles.
 */
import { Entity } from './Entity.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../utils/constants.js';

export class Bullet extends Entity {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} vx  velocity x (px/s)
     * @param {number} vy  velocity y (px/s)
     * @param {number} width
     * @param {number} height
     * @param {number} damage
     * @param {string} color
     */
    constructor(x, y, vx, vy, width, height, damage, color) {
        super(x, y, width, height);
        this.vx = vx;
        this.vy = vy;
        this.damage = damage;
        this.color = color;
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;

        // Off-screen removal (generous margin)
        const margin = 40;
        if (
            this.x < -margin ||
            this.x > CANVAS_WIDTH + margin ||
            this.y < -margin ||
            this.y > CANVAS_HEIGHT + margin
        ) {
            this.active = false;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height,
        );
    }
}
