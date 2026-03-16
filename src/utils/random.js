/**
 * Random number helpers.
 */

/** Random float in [min, max). */
export function randomRange(min, max) {
    return min + Math.random() * (max - min);
}

/** Random integer in [min, max] (inclusive). */
export function randomInt(min, max) {
    return Math.floor(randomRange(min, max + 1));
}

/** Return true with the given probability (0–1). */
export function chance(probability) {
    return Math.random() < probability;
}

/** Pick a random element from an array. */
export function pick(arr) {
    return arr[randomInt(0, arr.length - 1)];
}
