# Raiden Clone

A classic arcade-style 2D vertical scrolling shooter built with native HTML5 Canvas and ES6 modules.

## How to Play

- **Arrow Keys / WASD** — Move the player aircraft
- **Auto-fire** — The player automatically fires continuously
- **P** — Pause / Resume
- **Enter** — Start game / Restart after Game Over

## Running

Serve the project root with any static file server:

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Then open `http://localhost:8080` in a modern browser.

## Project Structure

```
raiden-clone/
├─ index.html
├─ style.css
├─ README.md
├─ assets/
│  ├─ images/
│  ├─ sounds/
│  └─ data/
├─ src/
│  ├─ main.js
│  ├─ game/        — Core game loop, state, input, timing, camera, asset loading
│  ├─ entities/    — Entity base class and all game objects
│  ├─ systems/     — Bullet, enemy, collision, spawn, score, and audio management
│  ├─ patterns/    — Enemy movement and bullet firing patterns
│  ├─ stages/      — Stage definitions and stage manager
│  ├─ ui/          — HUD and screen overlays
│  └─ utils/       — Math helpers, collision rects, RNG, constants
```

## Asset Note

All visuals currently use Canvas-drawn geometric shapes as placeholders. Replace with sprite images by updating `AssetLoader.js` and the individual entity `draw()` methods.
