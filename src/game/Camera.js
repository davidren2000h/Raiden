/**
 * Camera provides the background scroll offset.
 * In this vertical shooter the camera moves downward at a constant speed,
 * creating the illusion that the world scrolls upward.
 */
import { BG_SCROLL_SPEED, CANVAS_HEIGHT } from '../utils/constants.js';

export class Camera {
    constructor() {
        this.y = 0;         // cumulative scroll offset
        this.speed = BG_SCROLL_SPEED;
    }

    update(dt) {
        this.y += this.speed * dt;
    }

    reset() {
        this.y = 0;
    }
}
