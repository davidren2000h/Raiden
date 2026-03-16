/**
 * Player entity.
 * Handles movement via Input and auto-fire through BulletManager.
 */
import { Entity } from './Entity.js';
import {
    CANVAS_WIDTH, CANVAS_HEIGHT,
    PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_SPEED,
    PLAYER_FIRE_RATE, PLAYER_INVINCIBLE_DURATION,
    PLAYER_MAX_HP, PLAYER_MAX_POWER_LEVEL,
    MISSILE_FIRE_RATE,
    COLOR_PLAYER,
} from '../utils/constants.js';
import { clamp } from '../utils/math.js';

export class Player extends Entity {
    constructor(x, y, input, bulletManager) {
        super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT);
        this.input = input;
        this.bulletManager = bulletManager;
        this.speed = PLAYER_SPEED;
        this.fireTimer = 0;
        this.fireRate = PLAYER_FIRE_RATE;
        this.invincibleTimer = PLAYER_INVINCIBLE_DURATION;
        this.hp = PLAYER_MAX_HP;
        this.maxHp = PLAYER_MAX_HP;
        this.powerLevel = 0;  // 0-6, see PRD weapon upgrade table
        this.gunTier = 0;     // 0-2 (tiers 1-3)
        this.missileTier = 0; // 0-2 (tiers 1-3)
        this.missileTimer = 0;
    }

    get isInvincible() {
        return this.invincibleTimer > 0;
    }

    /** Called by CollisionSystem when the player is hit. Returns true if the player lost a life. */
    hit() {
        if (this.isInvincible) return false;
        this.hp--;
        if (this.hp <= 0) {
            this.active = false;
            return true;
        }
        // Brief invincibility flash on damage
        this.invincibleTimer = 0.5;
        return false;
    }

    /** Respawn in place with temporary invincibility. */
    respawn() {
        this.x = CANVAS_WIDTH / 2;
        this.y = CANVAS_HEIGHT - 80;
        this.active = true;
        this.invincibleTimer = PLAYER_INVINCIBLE_DURATION;
        this.hp = PLAYER_MAX_HP;
        this.powerLevel = 0;
        this.gunTier = 0;
        this.missileTier = 0;
    }

    update(dt) {
        // Movement
        let dx = 0;
        let dy = 0;
        if (this.input.left)  dx -= 1;
        if (this.input.right) dx += 1;
        if (this.input.up)    dy -= 1;
        if (this.input.down)  dy += 1;

        // Normalise diagonal
        if (dx !== 0 && dy !== 0) {
            const inv = 1 / Math.SQRT2;
            dx *= inv;
            dy *= inv;
        }

        this.x += dx * this.speed * dt;
        this.y += dy * this.speed * dt;

        // Clamp to canvas
        const halfW = this.width / 2;
        const halfH = this.height / 2;
        this.x = clamp(this.x, halfW, CANVAS_WIDTH - halfW);
        this.y = clamp(this.y, halfH, CANVAS_HEIGHT - halfH);

        // Invincibility countdown
        if (this.invincibleTimer > 0) {
            this.invincibleTimer -= dt;
        }

        // Auto-fire bullets
        this.fireTimer -= dt;
        if (this.fireTimer <= 0) {
            this.fireTimer = this.fireRate;
            this.bulletManager.firePlayerBullet(this.x, this.y, this.powerLevel, this.gunTier);
        }

        // Auto-fire missiles (power level 3+)
        if (this.powerLevel >= 3) {
            this.missileTimer -= dt;
            if (this.missileTimer <= 0) {
                this.missileTimer = MISSILE_FIRE_RATE;
                const missileCount = this.powerLevel - 2; // 1-4 missiles
                this.bulletManager.firePlayerMissiles(this.x, this.y, missileCount, this.missileTier);
            }
        }
    }

    draw(ctx) {
        // Blink while invincible
        if (this.isInvincible && Math.floor(this.invincibleTimer * 10) % 2 === 0) {
            return;
        }

        ctx.save();
        ctx.translate(this.x, this.y);

        // Body triangle
        ctx.fillStyle = COLOR_PLAYER;
        ctx.beginPath();
        ctx.moveTo(0, -this.height / 2);
        ctx.lineTo(-this.width / 2, this.height / 2);
        ctx.lineTo(this.width / 2, this.height / 2);
        ctx.closePath();
        ctx.fill();

        // Cockpit
        ctx.fillStyle = '#64B5F6';
        ctx.beginPath();
        ctx.arc(0, -2, 5, 0, Math.PI * 2);
        ctx.fill();

        // Wing accents
        ctx.fillStyle = '#1565C0';
        ctx.fillRect(-this.width / 2, this.height / 2 - 6, this.width, 4);

        ctx.restore();
    }
}
