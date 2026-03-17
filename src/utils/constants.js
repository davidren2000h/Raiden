/**
 * Central constants for the entire game.
 * All magic numbers live here.
 */

// ── Canvas ──────────────────────────────────────────────
export const CANVAS_WIDTH = 480;
export const CANVAS_HEIGHT = 720;

// ── Player ──────────────────────────────────────────────
export const PLAYER_WIDTH = 32;
export const PLAYER_HEIGHT = 36;
export const PLAYER_SPEED = 280;           // pixels per second
export const PLAYER_MAX_LIVES = 3;
export const PLAYER_MAX_HP = 5;             // hit points per life
export const PLAYER_INVINCIBLE_DURATION = 2; // seconds after respawn
export const PLAYER_FIRE_RATE = 0.12;      // seconds between shots
export const PLAYER_HP_RESTORE = 2;        // HP restored by health pick-up

// ── Player bullet ───────────────────────────────────────
export const PLAYER_BULLET_WIDTH = 6;
export const PLAYER_BULLET_HEIGHT = 14;
export const PLAYER_BULLET_SPEED = 600;    // pixels per second
export const PLAYER_BULLET_BASE_DAMAGE = 1;

// Gun tiers: damage multiplier = 2^(tier-1)  →  1, 2, 4
export const GUN_TIER_MAX = 3;
export const GUN_TIER_COLORS = ['#FFFFFF', '#42A5F5', '#EF5350']; // white, blue, red
export const GUN_TIER_DAMAGE = [1, 2, 4];

// ── Player missile ──────────────────────────────────────
export const MISSILE_WIDTH = 8;
export const MISSILE_HEIGHT = 16;
export const MISSILE_SPEED = 350;          // pixels per second
export const MISSILE_TURN_RATE = 5;        // radians per second
export const MISSILE_BASE_DAMAGE = 3;
export const MISSILE_FIRE_RATE = 0.5;      // seconds between salvos
export const PLAYER_MAX_POWER_LEVEL = 6;   // levels 0-6

// Missile tiers: damage multiplier = 2^(tier-1)  →  1×, 2×, 4×; color = white, blue, red
export const MISSILE_TIER_MAX = 3;
export const MISSILE_TIER_DAMAGE = [3, 6, 12];
export const MISSILE_TIER_COLORS = ['#FFFFFF', '#42A5F5', '#EF5350'];

// ── Enemies ─────────────────────────────────────────────
export const ENEMY_BASIC_WIDTH = 28;
export const ENEMY_BASIC_HEIGHT = 28;
export const ENEMY_BASIC_SPEED = 120;
export const ENEMY_BASIC_HP = 2;
export const ENEMY_BASIC_SCORE = 100;
export const ENEMY_BASIC_FIRE_RATE = 1.5;  // seconds between shots

export const ENEMY_FAST_WIDTH = 22;
export const ENEMY_FAST_HEIGHT = 22;
export const ENEMY_FAST_SPEED = 220;
export const ENEMY_FAST_HP = 1;
export const ENEMY_FAST_SCORE = 150;
export const ENEMY_FAST_FIRE_RATE = 2.0;

export const ENEMY_HEAVY_WIDTH = 38;
export const ENEMY_HEAVY_HEIGHT = 38;
export const ENEMY_HEAVY_SPEED = 70;
export const ENEMY_HEAVY_HP = 5;
export const ENEMY_HEAVY_SCORE = 300;
export const ENEMY_HEAVY_FIRE_RATE = 1.0;

// ── Enemy bullet ────────────────────────────────────────
export const ENEMY_BULLET_WIDTH = 6;
export const ENEMY_BULLET_HEIGHT = 6;
export const ENEMY_BULLET_SPEED = 240;

// ── Boss ────────────────────────────────────────────────
export const BOSS_WIDTH = 80;
export const BOSS_HEIGHT = 60;
export const BOSS_SPEED = 60;
export const BOSS_BASE_HP = 60000;
export const BOSS_SCORE = 5000;
export const BOSS_FIRE_RATE = 0.6;
export const BOSS_MAX_LEVEL = 5;
export const BOSS_LEVEL_HP_MULTIPLIER = [1, 4, 8, 16, 32];  // level 1-5
export const BOSS_LEVEL_SCORE = [5000, 12000, 20000, 30000, 50000];
export const BOSS_LEVEL_COLORS = ['#E91E63', '#9C27B0', '#FF6D00', '#00BFA5', '#D50000'];

// ── Explosions ──────────────────────────────────────────
export const EXPLOSION_DURATION = 0.45;    // seconds
export const EXPLOSION_MAX_RADIUS = 24;

// ── Power-ups ───────────────────────────────────────────
export const POWERUP_WIDTH = 20;
export const POWERUP_HEIGHT = 20;
export const POWERUP_SPEED = 80;
export const POWERUP_DROP_CHANCE = 0.25;   // 25 % per enemy killed

// ── Background scroll ───────────────────────────────────
export const BG_SCROLL_SPEED = 60;         // pixels per second

// ── Colours (placeholder palette) ───────────────────────
export const COLOR_PLAYER = '#2196F3';
export const COLOR_PLAYER_BULLET = '#FFEB3B';
export const COLOR_ENEMY_BASIC = '#F44336';
export const COLOR_ENEMY_FAST = '#FF9800';
export const COLOR_ENEMY_HEAVY = '#9C27B0';
export const COLOR_ENEMY_BULLET = '#FF5252';
export const COLOR_BOSS = '#E91E63';
export const COLOR_EXPLOSION = '#FF9800';
export const COLOR_POWERUP = '#4CAF50';
export const COLOR_POWERUP_HEALTH = '#FF5722';
export const COLOR_POWERUP_LIFE = '#FFEB3B';
export const COLOR_MISSILE = '#00E5FF';
export const COLOR_POWERUP_GUN_TIER = '#42A5F5';
export const COLOR_POWERUP_MSL_TIER = '#CE93D8';
export const COLOR_HUD_TEXT = '#FFFFFF';
export const COLOR_BG_STAR = '#AAAAAA';
