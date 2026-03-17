/**
 * BulletManager — creates and updates all bullets and missiles (player & enemy).
 */
import { Bullet } from '../entities/Bullet.js';
import { Missile } from '../entities/Missile.js';
import {
    PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT,
    PLAYER_BULLET_SPEED,
    GUN_TIER_COLORS, GUN_TIER_DAMAGE,
    ENEMY_BULLET_WIDTH, ENEMY_BULLET_HEIGHT,
    ENEMY_BULLET_SPEED, COLOR_ENEMY_BULLET,
    MISSILE_TIER_DAMAGE, MISSILE_TIER_SCALE,
} from '../utils/constants.js';

export class BulletManager {
    constructor(state) {
        this.state = state;
    }

    /**
     * Fire player bullet(s) from the given position.
     * Power levels 0-2 control bullet lines; levels 3-6 always fire 3 lines.
     * Gun tier controls damage and color.
     * @param {number} x
     * @param {number} y
     * @param {number} powerLevel  0-6
     * @param {number} gunTier     0-2
     */
    firePlayerBullet(x, y, powerLevel, gunTier) {
        const list = this.state.playerBullets;
        const spd = -PLAYER_BULLET_SPEED; // upward
        const bulletLines = Math.min(powerLevel + 1, 3); // 1, 2, or 3
        const damage = GUN_TIER_DAMAGE[gunTier] || 1;
        const color = GUN_TIER_COLORS[gunTier] || '#FFFFFF';

        if (bulletLines === 1) {
            list.push(new Bullet(x, y - 10, 0, spd,
                PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT, damage, color));
        } else if (bulletLines === 2) {
            list.push(new Bullet(x - 6, y - 10, 0, spd,
                PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT, damage, color));
            list.push(new Bullet(x + 6, y - 10, 0, spd,
                PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT, damage, color));
        } else {
            list.push(new Bullet(x, y - 10, 0, spd,
                PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT, damage, color));
            list.push(new Bullet(x - 10, y - 6, -40, spd,
                PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT, damage, color));
            list.push(new Bullet(x + 10, y - 6, 40, spd,
                PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT, damage, color));
        }
    }

    /**
     * Fire homing missiles.
     * @param {number} x
     * @param {number} y
     * @param {number} count       1-4 missiles per salvo
     * @param {number} missileTier  0-2
     */
    firePlayerMissiles(x, y, count, missileTier) {
        const list = this.state.playerMissiles;
        const baseAngle = -Math.PI / 2; // upward
        const spread = 0.4; // radians between missiles
        const totalSpread = (count - 1) * spread;
        const startAngle = baseAngle - totalSpread / 2;
        const damage = MISSILE_TIER_DAMAGE[missileTier] || 3;
        const scale = MISSILE_TIER_SCALE[missileTier] || 1;

        for (let i = 0; i < count; i++) {
            const angle = startAngle + i * spread;
            list.push(new Missile(x, y - 10, angle, damage, scale));
        }
    }

    /**
     * Fire a single enemy bullet.
     * @param {number} x
     * @param {number} y
     * @param {number} vx  velocity x
     * @param {number} vy  velocity y
     */
    fireEnemyBullet(x, y, vx, vy) {
        this.state.enemyBullets.push(
            new Bullet(x, y, vx, vy,
                ENEMY_BULLET_WIDTH, ENEMY_BULLET_HEIGHT, 1, COLOR_ENEMY_BULLET),
        );
    }

    update(dt) {
        this._updateList(this.state.playerBullets, dt);
        this._updateList(this.state.enemyBullets, dt);
        this._updateMissiles(dt);
    }

    _updateMissiles(dt) {
        const list = this.state.playerMissiles;
        const enemies = this.state.enemies;
        for (let i = list.length - 1; i >= 0; i--) {
            list[i].updateWithEnemies(dt, enemies);
            if (!list[i].active) {
                list.splice(i, 1);
            }
        }
    }

    _updateList(list, dt) {
        for (let i = list.length - 1; i >= 0; i--) {
            list[i].update(dt);
            if (!list[i].active) {
                list.splice(i, 1);
            }
        }
    }
}
