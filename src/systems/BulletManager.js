/**
 * BulletManager — creates and updates all bullets (player & enemy).
 */
import { Bullet } from '../entities/Bullet.js';
import {
    PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT,
    PLAYER_BULLET_SPEED, PLAYER_BULLET_DAMAGE,
    COLOR_PLAYER_BULLET,
    ENEMY_BULLET_WIDTH, ENEMY_BULLET_HEIGHT,
    ENEMY_BULLET_SPEED, COLOR_ENEMY_BULLET,
} from '../utils/constants.js';

export class BulletManager {
    constructor(state) {
        this.state = state;
    }

    /**
     * Fire player bullet(s) from the given position.
     * @param {number} x
     * @param {number} y
     * @param {number} powerLevel  0=single, 1=double, 2=triple
     */
    firePlayerBullet(x, y, powerLevel) {
        const list = this.state.playerBullets;
        const spd = -PLAYER_BULLET_SPEED; // upward

        if (powerLevel === 0) {
            list.push(new Bullet(x, y - 10, 0, spd,
                PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT,
                PLAYER_BULLET_DAMAGE, COLOR_PLAYER_BULLET));
        } else if (powerLevel === 1) {
            list.push(new Bullet(x - 6, y - 10, 0, spd,
                PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT,
                PLAYER_BULLET_DAMAGE, COLOR_PLAYER_BULLET));
            list.push(new Bullet(x + 6, y - 10, 0, spd,
                PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT,
                PLAYER_BULLET_DAMAGE, COLOR_PLAYER_BULLET));
        } else {
            list.push(new Bullet(x, y - 10, 0, spd,
                PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT,
                PLAYER_BULLET_DAMAGE, COLOR_PLAYER_BULLET));
            list.push(new Bullet(x - 10, y - 6, -40, spd,
                PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT,
                PLAYER_BULLET_DAMAGE, COLOR_PLAYER_BULLET));
            list.push(new Bullet(x + 10, y - 6, 40, spd,
                PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT,
                PLAYER_BULLET_DAMAGE, COLOR_PLAYER_BULLET));
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
