/**
 * Stub asset loader.
 * Currently the game uses Canvas-drawn placeholders so nothing is loaded.
 * When real images / sounds are added, load them here and resolve a promise.
 */
export class AssetLoader {
    constructor() {
        this.images = {};
        this.sounds = {};
    }

    /**
     * Load all assets. Returns a Promise that resolves when everything is ready.
     * Currently resolves immediately since we use placeholder drawings.
     */
    async loadAll() {
        // Future: load sprite sheets and audio files here.
        return Promise.resolve();
    }
}
