/**
 * High-resolution delta-time provider using requestAnimationFrame.
 */
export class Timer {
    constructor() {
        this._last = 0;
        this._dt = 0;
    }

    /** Call once at the start of each frame with the rAF timestamp. */
    tick(timestamp) {
        if (this._last === 0) {
            this._last = timestamp;
        }
        this._dt = (timestamp - this._last) / 1000; // convert ms → seconds
        // Cap dt to avoid spiral of death on tab-switch
        if (this._dt > 0.1) {
            this._dt = 0.016;
        }
        this._last = timestamp;
    }

    /** Delta time in seconds since last frame. */
    get dt() {
        return this._dt;
    }

    reset() {
        this._last = 0;
        this._dt = 0;
    }
}
