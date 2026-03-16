/**
 * Start screen overlay shown before the game begins.
 */
import { CANVAS_WIDTH, CANVAS_HEIGHT, COLOR_HUD_TEXT } from '../utils/constants.js';

export class StartScreen {
    constructor() {
        this._blink = 0;
    }

    draw(ctx) {
        this._blink += 0.03;

        ctx.save();
        ctx.fillStyle = COLOR_HUD_TEXT;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Title
        ctx.font = 'bold 48px monospace';
        ctx.fillText('RAIDEN', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 80);

        ctx.font = '18px monospace';
        ctx.fillText('CLONE', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);

        // Instructions
        ctx.font = '14px monospace';
        ctx.fillStyle = '#AAA';
        ctx.fillText('Arrow Keys / WASD  —  Move', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
        ctx.fillText('Auto-fire enabled', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 45);
        ctx.fillText('P  —  Pause', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 70);

        // Blinking prompt
        if (Math.sin(this._blink * 4) > 0) {
            ctx.fillStyle = '#FFEB3B';
            ctx.font = '20px monospace';
            ctx.fillText('PRESS ENTER TO START', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 130);
        }

        ctx.restore();
    }
}
