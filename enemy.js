const enemies = [];

function spawnEnemy(ai = false) {

    enemies.push({
        x: Math.random() * window.innerWidth,
        y: -50,
        vx: 0,
        vy: 0,
        hp: 10,
        ai: ai,
        shootTimer: 0,
        dead: false,
        hitFlash: 0,
        rot: 0,
        fall: 0
    });
}

function updateEnemies(jet, particles, mode) {

    for (const e of enemies) {

        if (e.dead) {
            e.fall += 0.1;
            e.y += e.fall;
            e.rot += 0.05;
            continue;
        }

        if (!e.ai) continue;

        const dx = jet.x - e.x;
        const dy = jet.y - e.y;

        const dist = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);

        if (dist > 220) {
            e.vx += Math.cos(angle) * 0.06;
            e.vy += Math.sin(angle) * 0.06;
        } else {
            e.vx -= Math.cos(angle) * 0.03;
            e.vy -= Math.sin(angle) * 0.03;
        }

        e.x += e.vx;
        e.y += e.vy;

        e.vx *= 0.97;
        e.vy *= 0.97;

        e.shootTimer--;

        if (e.shootTimer <= 0 && dist < 400) {

            e.shootTimer = 60;

            particles.push({
                x: e.x,
                y: e.y,
                vx: Math.cos(angle) * 5,
                vy: Math.sin(angle) * 5,
                life: 1,
                type: "enemyBullet"
            });
        }
    }

    if (mode === "play" && enemies.filter(e => !e.dead).length === 0) {
        spawnEnemy(true);
    }
}

function drawEnemies(ctx) {

    for (const e of enemies) {

        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.rotate(e.rot);

        ctx.fillStyle = e.dead ? "#111" : "#cfd6df";

        ctx.beginPath();
        ctx.moveTo(35, 0);
        ctx.lineTo(10, -6);
        ctx.lineTo(-25, -5);
        ctx.lineTo(-40, 0);
        ctx.lineTo(-25, 5);
        ctx.lineTo(10, 6);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#ff3b3b";
        ctx.beginPath();
        ctx.ellipse(10, 0, 6, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        if (!e.dead && e.hitFlash > 0) {

            ctx.strokeStyle = "rgba(255,0,0,0.7)";
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(e.x + 35, e.y);
            ctx.lineTo(e.x + 10, e.y - 6);
            ctx.lineTo(e.x - 25, e.y - 5);
            ctx.lineTo(e.x - 40, e.y);
            ctx.lineTo(e.x - 25, e.y + 5);
            ctx.lineTo(e.x + 10, e.y + 6);
            ctx.closePath();
            ctx.stroke();
        }
    }
}
