/**
 * Boss entity.
 * Extended enemy with multiple attack phases.
 * Phase behaviour is injected via BossPatterns.
 */
import { Entity } from './Entity.js';
import {
    BOSS_WIDTH, BOSS_HEIGHT, BOSS_BASE_HP, BOSS_SPEED,
    BOSS_FIRE_RATE, CANVAS_WIDTH,
    BOSS_LEVEL_HP_MULTIPLIER, BOSS_LEVEL_SCORE, BOSS_LEVEL_COLORS,
} from '../utils/constants.js';

export class Boss extends Entity {
    /**
     * @param {number} x
     * @param {number} y
     * @param {function} movementPattern (boss, dt) => void
     * @param {number} [bossLevel=0]  0-4 (boss levels 1-5)
     */
    constructor(x, y, movementPattern, bossLevel) {
        const lvl = bossLevel || 0;
        const w = BOSS_WIDTH + lvl * 10;
        const h = BOSS_HEIGHT + lvl * 8;
        super(x, y, w, h);
        this.bossLevel = lvl;
        this.speed = BOSS_SPEED;
        const hpMult = BOSS_LEVEL_HP_MULTIPLIER[lvl] || 1;
        this.hp = BOSS_BASE_HP * hpMult;
        this.maxHp = this.hp;
        this.score = BOSS_LEVEL_SCORE[lvl] || 5000;
        this.fireRate = Math.max(0.25, BOSS_FIRE_RATE - lvl * 0.08);
        this.fireTimer = 1;
        this.color = BOSS_LEVEL_COLORS[lvl] || '#E91E63';
        this.movementPattern = movementPattern;
        this.elapsed = 0;
        this.startX = x;
        this.startY = y;
        this.isBoss = true;
    }

    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.active = false;
            return true;
        }
        return false;
    }

    update(dt) {
        this.elapsed += dt;
        this.movementPattern(this, dt);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        const hw = this.width / 2;
        const hh = this.height / 2;

        if (this.bossLevel === 0) {
            // Level 1 — simple hexagon
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(0, -hh);
            ctx.lineTo(hw, -hh * 0.4);
            ctx.lineTo(hw, hh * 0.4);
            ctx.lineTo(0, hh);
            ctx.lineTo(-hw, hh * 0.4);
            ctx.lineTo(-hw, -hh * 0.4);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#FF80AB';
            ctx.beginPath();
            ctx.arc(0, 0, 10, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.bossLevel === 1) {
            // Level 2 — hexagon with wing extensions
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(0, -hh);
            ctx.lineTo(hw, -hh * 0.3);
            ctx.lineTo(hw + 12, 0);
            ctx.lineTo(hw, hh * 0.3);
            ctx.lineTo(0, hh);
            ctx.lineTo(-hw, hh * 0.3);
            ctx.lineTo(-hw - 12, 0);
            ctx.lineTo(-hw, -hh * 0.3);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#CE93D8';
            ctx.fillRect(-8, -8, 16, 16);
        } else if (this.bossLevel === 2) {
            // Level 3 — armored hull with dual cannons
            ctx.fillStyle = this.color;
            ctx.fillRect(-hw, -hh * 0.6, this.width, this.height * 0.6);
            ctx.beginPath();
            ctx.moveTo(-hw, hh * 0.0);
            ctx.lineTo(0, hh);
            ctx.lineTo(hw, hh * 0.0);
            ctx.closePath();
            ctx.fill();
            // Cannons
            ctx.fillStyle = '#FFA726';
            ctx.fillRect(-hw - 6, -hh * 0.4, 8, 20);
            ctx.fillRect(hw - 2, -hh * 0.4, 8, 20);
            ctx.fillStyle = '#FFF';
            ctx.beginPath();
            ctx.arc(0, -6, 7, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.bossLevel === 3) {
            // Level 4 — heavy battleship with shield plating
            ctx.fillStyle = this.color;
            ctx.fillRect(-hw, -hh, this.width, this.height);
            // Shield plates
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.fillRect(-hw + 4, -hh + 4, this.width - 8, this.height - 8);
            // Turrets
            ctx.fillStyle = '#B2FF59';
            ctx.beginPath();
            ctx.arc(-hw * 0.5, -hh * 0.3, 6, 0, Math.PI * 2);
            ctx.arc(hw * 0.5, -hh * 0.3, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#FFF';
            ctx.beginPath();
            ctx.arc(0, 0, 9, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Level 5 — multi-segment final form
            ctx.fillStyle = this.color;
            // Centre body
            ctx.beginPath();
            ctx.arc(0, 0, hh * 0.7, 0, Math.PI * 2);
            ctx.fill();
            // Left segment
            ctx.beginPath();
            ctx.ellipse(-hw * 0.6, 4, hw * 0.4, hh * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();
            // Right segment
            ctx.beginPath();
            ctx.ellipse(hw * 0.6, 4, hw * 0.4, hh * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();
            // Core glow
            ctx.fillStyle = '#FFEB3B';
            ctx.beginPath();
            ctx.arc(0, 0, 10, 0, Math.PI * 2);
            ctx.fill();
            // Accent dots
            ctx.fillStyle = '#FFF';
            ctx.beginPath();
            ctx.arc(-hw * 0.6, 4, 4, 0, Math.PI * 2);
            ctx.arc(hw * 0.6, 4, 4, 0, Math.PI * 2);
            ctx.fill();
        }

        // HP bar (all levels)
        const barW = this.width + 20;
        const barH = 5;
        const ratio = this.hp / this.maxHp;
        ctx.fillStyle = '#333';
        ctx.fillRect(-barW / 2, -hh - 12, barW, barH);
        ctx.fillStyle = ratio > 0.3 ? '#F44336' : '#FF1744';
        ctx.fillRect(-barW / 2, -hh - 12, barW * ratio, barH);

        // Boss level label
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(`Lv.${this.bossLevel + 1}`, 0, -hh - 22);

        ctx.restore();
    }
}
