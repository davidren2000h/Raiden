/**
 * HUD — heads-up display drawn during gameplay.
 * Shows score, lives, and power level.
 */
import { CANVAS_WIDTH, CANVAS_HEIGHT, COLOR_HUD_TEXT, GUN_TIER_COLORS } from '../utils/constants.js';

export class HUD {
    constructor(state) {
        this.state = state;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = COLOR_HUD_TEXT;
        ctx.font = '16px monospace';
        ctx.textBaseline = 'top';

        // Score
        ctx.textAlign = 'left';
        ctx.fillText(`SCORE  ${String(this.state.score).padStart(8, '0')}`, 12, 10);

        // High score
        ctx.textAlign = 'center';
        ctx.fillText(`HI ${String(this.state.highScore).padStart(8, '0')}`, CANVAS_WIDTH / 2, 10);

        // Lives
        ctx.textAlign = 'right';
        ctx.fillStyle = '#F44336';
        ctx.font = '16px monospace';
        const livesLabel = `LIVES  ${'♥'.repeat(Math.max(0, this.state.lives))}`;
        ctx.fillText(livesLabel, CANVAS_WIDTH - 12, 10);

        // Health bar
        const player = this.state.player;
        if (player) {
            const barW = 100;
            const barH = 8;
            const barX = CANVAS_WIDTH - 12 - barW;
            const barY = 30;
            const hpRatio = Math.max(0, player.hp / player.maxHp);

            // Background
            ctx.fillStyle = '#333';
            ctx.fillRect(barX, barY, barW, barH);

            // Fill
            ctx.fillStyle = hpRatio > 0.5 ? '#4CAF50' : hpRatio > 0.25 ? '#FF9800' : '#F44336';
            ctx.fillRect(barX, barY, barW * hpRatio, barH);

            // Border
            ctx.strokeStyle = '#888';
            ctx.lineWidth = 1;
            ctx.strokeRect(barX, barY, barW, barH);

            // Label
            ctx.fillStyle = COLOR_HUD_TEXT;
            ctx.font = '12px monospace';
            ctx.textAlign = 'right';
            ctx.fillText('HP', barX - 6, barY + 1);
        }

        // Weapon level
        if (player) {
            ctx.textAlign = 'left';
            ctx.font = '12px monospace';

            const bulletLines = Math.min(player.powerLevel + 1, 3);
            const missileCount = Math.max(0, player.powerLevel - 2);
            const tierLabels = ['I', 'II', 'III'];

            // Gun display: color matches gun tier
            ctx.fillStyle = GUN_TIER_COLORS[player.gunTier] || '#FFFFFF';
            ctx.fillText(`GUN ${tierLabels[player.gunTier]} ${'▮'.repeat(bulletLines)}`, 12, 30);

            if (missileCount > 0) {
                ctx.fillStyle = '#00E5FF';
                ctx.fillText(`MSL ${tierLabels[player.missileTier]} ${'◆'.repeat(missileCount)}`, 12, 46);
            }
        }

        ctx.restore();
    }
}
