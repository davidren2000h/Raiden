/**
 * Abstract base class for all game entities.
 * Every entity has a position, dimensions, active flag, and must
 * implement update(dt) and draw(ctx).
 */
export class Entity {
    constructor(x, y, width, height) {
        this.x = x;        // centre x
        this.y = y;        // centre y
        this.width = width;
        this.height = height;
        this.active = true;
    }

    /** Return an AABB for collision checks. */
    getRect() {
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
            width: this.width,
            height: this.height,
        };
    }

    update(dt) {
        throw new Error('Entity subclass must implement update(dt)');
    }

    draw(ctx) {
        throw new Error('Entity subclass must implement draw(ctx)');
    }
}
