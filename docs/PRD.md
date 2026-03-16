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

## Improvements

