# Raiden Clone — Product Requirements Document

## Overview

A classic arcade-style Raiden-like 2D vertical scrolling shooter prototype.

## Technical Requirements

- Use native HTML5 Canvas
- Use JavaScript ES6 modules
- Do not use any third-party frameworks, engines, or build tools
- The project must run directly on a local static server
- Code should be clear, modular, and easy to extend

## MVP Features

1. The player aircraft can move using arrow keys or WASD
2. The player aircraft automatically fires continuously
3. At least one basic enemy type that flies downward from the top of the screen
4. Player bullets can destroy enemy aircraft
5. Enemies can shoot bullets at the player
6. Player loses health or a life when hit by enemy bullets
7. Include basic explosion effects
8. Include a score display
9. Support Game Over and restart
10. Include a scrolling background

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
│  ├─ game/
│  │  ├─ Game.js
│  │  ├─ GameState.js
│  │  ├─ Input.js
│  │  ├─ Timer.js
│  │  ├─ Camera.js
│  │  └─ AssetLoader.js
│  ├─ entities/
│  │  ├─ Entity.js
│  │  ├─ Player.js
│  │  ├─ Enemy.js
│  │  ├─ Boss.js
│  │  ├─ Bullet.js
│  │  ├─ Explosion.js
│  │  └─ PowerUp.js
│  ├─ systems/
│  │  ├─ BulletManager.js
│  │  ├─ EnemyManager.js
│  │  ├─ CollisionSystem.js
│  │  ├─ SpawnSystem.js
│  │  ├─ ScoreSystem.js
│  │  └─ AudioSystem.js
│  ├─ patterns/
│  │  ├─ EnemyPatterns.js
│  │  ├─ BulletPatterns.js
│  │  └─ BossPatterns.js
│  ├─ stages/
│  │  ├─ StageManager.js
│  │  └─ Stage1.js
│  ├─ ui/
│  │  ├─ HUD.js
│  │  ├─ StartScreen.js
│  │  ├─ PauseScreen.js
│  │  └─ GameOverScreen.js
│  └─ utils/
│     ├─ math.js
│     ├─ rect.js
│     ├─ random.js
│     └─ constants.js
```

## Engineering Constraints

1. Each module must have a single responsibility
2. All entities must inherit from the Entity base class
3. Every entity must implement `update(dt)` and `draw(ctx)`
4. All collision logic must be centralized in CollisionSystem
5. Enemy behaviors and bullet patterns must be implemented in the patterns directory
6. All constants must be stored in `utils/constants.js`
7. Do not include pseudo-code, TODO comments, or unfinished functions
8. Do not implement overly complex bosses, multiple stages, or advanced bullet patterns in the first version
9. Focus on building a minimal playable version first
10. Use native HTML5 Canvas + ES6 modules only, no third-party frameworks
11. Keep the existing directory structure unchanged
12. Do not merge files or introduce build tools
13. Each module must remain focused and well scoped
14. Do not distribute collision logic across multiple entities
15. Enemy behavior and bullet patterns must not be hardcoded inside Enemy or Boss
16. Avoid magic numbers; all constants must be defined in `utils/constants.js`
17. When adding new features, extend existing modules instead of rewriting the architecture
18. When outputting code updates, only output modified files
19. All code must be directly runnable
20. Image assets can use free online resources such as:
    - https://kenney.nl/
    - https://opengameart.org/
21. Sound effects can use free resources such as:
    - https://freesound.org/

## Output Requirements

1. First describe the implementation approach and module interaction
2. Then output the complete code file by file
3. Clearly label the file path before each file
4. Ensure all code is consistent and can run directly
5. If image assets are temporarily unavailable, use simple geometric shapes drawn with Canvas as placeholders, and mention this in the explanation

## Improvements After Ver.1.0

1. **Life counter display** — Show the player's remaining lives on screen. The default starting lives is 3.
2. **Health indicator display** — Show the player's current health on screen (e.g., a health bar or numeric value) so the player can see how much damage they can still take before losing a life.
3. **Health and life pick-up items** — Add collectible items that the player aircraft can pick up during gameplay to restore health or gain an extra life.
4. **Weapons upgrade system** — The weapon system has two independent dimensions: **count** (how many guns/missiles) and **tier** (damage and appearance). Both upgrade via power-up pickups.

   **Gun system:**
   - Count progression (weapon power-up): 1 gun → 2 guns → 3 guns.
   - Tier progression (gun-tier power-up):
     - **Tier 1 (White)** — Damage 1 per bullet (default).
     - **Tier 2 (Blue)** — Damage 2 per bullet (double Tier 1).
     - **Tier 3 (Red)** — Damage 4 per bullet (double Tier 2).

   **Missile system:**
   - Count progression (weapon power-up, after reaching 3 guns): 1 missile → 2 missiles → 3 missiles → 4 missiles (max).
   - Tier progression (missile-tier power-up):
     - **Tier 1 (White)** — Base damage (default).
     - **Tier 2 (Blue)** — Double the damage of Tier 1.
     - **Tier 3 (Red)** — Double the damage of Tier 2.
   - All tiers share the same display size; tier is indicated by missile color.
   - Homing missiles automatically track and chase the nearest enemy on screen.

   **Overall power-up sequence (count):**
   Level 1 → 1 gun | Level 2 → 2 guns | Level 3 → 3 guns | Level 4 → 3 guns + 1 missile | Level 5 → +2 missiles | Level 6 → +3 missiles | Level 7 (max) → +4 missiles.
   Gun tier and missile tier upgrade independently on top of this progression.
5. **Boss levels** — There are 5 boss levels, each with increasing difficulty and a distinct visual appearance:
   - **Boss Level 1** — Base HP (current boss). Small hexagonal shape.
   - **Boss Level 2** — 2× the HP of Boss Level 1. Larger body with wing extensions.
   - **Boss Level 3** — 3× the HP of Boss Level 1. Armored hull with dual cannons.
   - **Boss Level 4** — 4× the HP of Boss Level 1. Heavy battleship with shield plating.
   - **Boss Level 5** — 5× the HP of Boss Level 1. Final form with multi-segment body.
   - Each boss level uses a different visual design (drawn with Canvas shapes) to clearly distinguish them from one another.

   | Level | HP  | Score  | Color    | Visual                                |
   |-------|-----|--------|----------|---------------------------------------|
   | 1     | 60  | 5,000  | Pink     | Simple hexagon                        |
   | 2     | 120 | 12,000 | Purple   | Hexagon with wing extensions          |
   | 3     | 180 | 20,000 | Orange   | Armored hull with dual cannons        |
   | 4     | 240 | 30,000 | Teal     | Heavy battleship with shield plating  |
   | 5     | 300 | 50,000 | Deep Red | Multi-segment final form              |
