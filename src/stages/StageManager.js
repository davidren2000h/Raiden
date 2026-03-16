/**
 * StageManager — reads wave data from the current stage definition
 * and tells SpawnSystem when to create enemies.
 * After the last wave, it loops the stage to keep the game going.
 */
import { getStage1Waves } from './Stage1.js';

export class StageManager {
    constructor(state, spawnSystem) {
        this.state = state;
        this.spawnSystem = spawnSystem;
        this.reset();
    }

    reset() {
        this.waves = getStage1Waves();
        this.waveIndex = 0;
        this.loopOffset = 0;
    }

    update(dt) {
        const t = this.state.stageTime;

        while (
            this.waveIndex < this.waves.length &&
            t >= this.waves[this.waveIndex].time + this.loopOffset
        ) {
            const wave = this.waves[this.waveIndex];
            for (const sp of wave.spawns) {
                if (wave.boss) {
                    this.spawnSystem.spawnBoss(sp.x, sp.y, sp.pattern);
                } else {
                    this.spawnSystem.spawnEnemy(sp.x, sp.y, sp.config, sp.pattern);
                }
            }
            this.waveIndex++;
        }

        // Loop the stage after all waves have been dispatched
        if (this.waveIndex >= this.waves.length) {
            const lastWaveTime = this.waves[this.waves.length - 1].time;
            this.loopOffset += lastWaveTime + 8; // 8s gap before loop
            this.waveIndex = 0;
        }
    }
}
