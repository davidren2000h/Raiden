/**
 * Axis-Aligned Bounding Box helpers.
 */

/** Create a rect object from centre position and dimensions. */
export function createRect(cx, cy, w, h) {
    return {
        x: cx - w / 2,
        y: cy - h / 2,
        width: w,
        height: h,
    };
}

/** Test overlap between two rects (each has x, y, width, height). */
export function rectsOverlap(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}
