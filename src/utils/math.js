/**
 * General-purpose math helpers.
 */

/** Clamp value between min and max. */
export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

/** Linear interpolation between a and b by factor t (0–1). */
export function lerp(a, b, t) {
    return a + (b - a) * t;
}

/** Distance between two points. */
export function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

/** Angle (radians) from (x1,y1) towards (x2,y2). */
export function angleTo(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
}

/** Convert degrees to radians. */
export function degToRad(deg) {
    return (deg * Math.PI) / 180;
}

/** Normalise an angle to [0, 2π). */
export function normalizeAngle(rad) {
    return ((rad % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
}
