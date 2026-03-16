/**
 * Pause screen overlay.
 */
import { CANVAS_WIDTH, CANVAS_HEIGHT, COLOR_HUD_TEXT } from '../utils/constants.js';

export class PauseScreen {
    draw(ctx) {
        // Dim overlay
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.fillStyle = COLOR_HUD_TEXT;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 36px monospace';
        ctx.fillText('PAUSED', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);

        ctx.font = '16px monospace';
        ctx.fillStyle = '#AAA';
        ctx.fillText('Press P to resume', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 25);

        ctx.restore();
    }
}
