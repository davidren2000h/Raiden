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
     */
    spawnBoss(x, y, movementPattern) {
        this.state.enemies.push(new Boss(x, y, movementPattern));
    }

    /** Roll for power-up drop at the given position. */
    trySpawnPowerUp(x, y) {
        if (chance(POWERUP_DROP_CHANCE)) {
            this.state.powerUps.push(new PowerUp(x, y, POWERUP_TYPE.WEAPON));
        }
    }
}
