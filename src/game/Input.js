/**
 * Keyboard input manager.
 * Tracks which keys are currently held down.
 */
export class Input {
    constructor() {
        /** @type {Set<string>} */
        this._held = new Set();
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);
        window.addEventListener('keydown', this._onKeyDown);
        window.addEventListener('keyup', this._onKeyUp);
    }

    _onKeyDown(e) {
        this._held.add(e.key);
        // Prevent page scrolling for game keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
            e.preventDefault();
        }
    }

    _onKeyUp(e) {
        this._held.delete(e.key);
    }

    /** Return true while the key is held. */
    isDown(key) {
        return this._held.has(key);
    }

    /** Check movement intent (supports arrows + WASD). */
    get up()    { return this.isDown('ArrowUp')    || this.isDown('w') || this.isDown('W'); }
    get down()  { return this.isDown('ArrowDown')  || this.isDown('s') || this.isDown('S'); }
    get left()  { return this.isDown('ArrowLeft')  || this.isDown('a') || this.isDown('A'); }
    get right() { return this.isDown('ArrowRight') || this.isDown('d') || this.isDown('D'); }
    get pause() { return this.isDown('p') || this.isDown('P'); }
    get enter() { return this.isDown('Enter'); }

    destroy() {
        window.removeEventListener('keydown', this._onKeyDown);
        window.removeEventListener('keyup', this._onKeyUp);
    }
}
