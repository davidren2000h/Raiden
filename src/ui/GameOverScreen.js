/**
 * Game Over screen overlay.
 */
import { CANVAS_WIDTH, CANVAS_HEIGHT, COLOR_HUD_TEXT } from '../utils/constants.js';

export class GameOverScreen {
    constructor(state) {
        this.state = state;
        this._blink = 0;
    }

    draw(ctx) {
        this._blink += 0.03;

        ctx.save();
        // Dim overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Title
        ctx.fillStyle = '#F44336';
        ctx.font = 'bold 42px monospace';
        ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 60);

        // Score
        ctx.fillStyle = COLOR_HUD_TEXT;
        ctx.font = '20px monospace';
        ctx.fillText(`SCORE  ${String(this.state.score).padStart(8, '0')}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

        // High score
        ctx.font = '16px monospace';
        ctx.fillStyle = '#FFEB3B';
        ctx.fillText(`HIGH SCORE  ${String(this.state.highScore).padStart(8, '0')}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 35);

        // Blinking restart prompt
        if (Math.sin(this._blink * 4) > 0) {
            ctx.fillStyle = COLOR_HUD_TEXT;
            ctx.font = '18px monospace';
            ctx.fillText('PRESS ENTER TO RESTART', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 90);
        }

        ctx.restore();
    }
}
