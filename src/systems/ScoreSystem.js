/**
 * ScoreSystem — tracks and exposes score changes.
 */
export class ScoreSystem {
    constructor(state) {
        this.state = state;
    }

    addScore(points) {
        this.state.score += points;
    }
}
