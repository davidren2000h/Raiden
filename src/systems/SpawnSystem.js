/**
 * SpawnSystem — spawns enemies via StageManager calls,
 * and handles power-up drops on enemy death.
 */
import { Enemy } from '../entities/Enemy.js';
import { Boss } from '../entities/Boss.js';
import { PowerUp, POWERUP_TYPE } from '../entities/PowerUp.js';
import { chance } from '../utils/random.js';
import { POWERUP_DROP_CHANCE } from '../utils/constants.js';

export class SpawnSystem {
    constructor(state) {
        this.state = state;
    }

    /**
     * Spawn a regular enemy.
     * @param {number} x
     * @param {number} y
     * @param {object} config
     * @param {function} movementPattern
     */
    spawnEnemy(x, y, config, movementPattern) {
        this.state.enemies.push(new Enemy(x, y, config, movementPattern));
    }

    /**
     * Spawn a boss.
     * @param {number} x
     * @param {number} y
     * @param {function} movementPattern
     * @param {number} [bossLevel=0]  0-4
     */
    spawnBoss(x, y, movementPattern, bossLevel) {
        this.state.enemies.push(new Boss(x, y, movementPattern, bossLevel || 0));
    }

    /** Roll for power-up drop at the given position. */
    trySpawnPowerUp(x, y) {
        if (chance(POWERUP_DROP_CHANCE)) {
            const roll = Math.random();
            let type;
            if (roll < 0.35) {
                type = POWERUP_TYPE.WEAPON;
            } else if (roll < 0.55) {
                type = POWERUP_TYPE.HEALTH;
            } else if (roll < 0.65) {
                type = POWERUP_TYPE.LIFE;
            } else if (roll < 0.82) {
                type = POWERUP_TYPE.GUN_TIER;
            } else {
                type = POWERUP_TYPE.MISSILE_TIER;
            }
            this.state.powerUps.push(new PowerUp(x, y, type));
        }
    }
}
