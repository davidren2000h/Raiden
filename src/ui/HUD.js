/**
 * HUD — heads-up display drawn during gameplay.
 * Shows score, lives, and power level.
 */
import { CANVAS_WIDTH, COLOR_HUD_TEXT } from '../utils/constants.js';

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
        const livesStr = '♥'.repeat(Math.max(0, this.state.lives));
        ctx.fillStyle = '#F44336';
        ctx.fillText(livesStr, CANVAS_WIDTH - 12, 10);

        // Power level
        if (this.state.player && this.state.player.powerLevel > 0) {
            ctx.fillStyle = '#4CAF50';
            ctx.textAlign = 'left';
            ctx.fillText(`PWR ${'▮'.repeat(this.state.player.powerLevel)}`, 12, 30);
        }

        ctx.restore();
    }
}
