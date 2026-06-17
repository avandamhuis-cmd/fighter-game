const enemies = [];

function spawnEnemy() {
    enemies.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        hp: 10,
        dead: false,
        hitFlash: 0,
        fallSpeed: 0,
        rotation: 0
    });
}

spawnEnemy();

function updateEnemies() {
    for (const e of enemies) {

        if (e.dead) {
            e.fallSpeed += 0.12;
            e.y += e.fallSpeed;
            e.rotation += 0.04;
            continue;
        }

        if (e.hitFlash > 0) e.hitFlash--;
    }
}

function drawEnemies(ctx) {

    for (const e of enemies) {

        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.rotate(e.rotation);

        // BODY
        ctx.fillStyle = e.dead ? "#111" : "#c7ccd4";

        ctx.beginPath();
        ctx.moveTo(35, 0);
        ctx.lineTo(15, -5);
        ctx.lineTo(-20, -5);
        ctx.lineTo(-40, 0);
        ctx.lineTo(-20, 5);
        ctx.lineTo(15, 5);
        ctx.closePath();
        ctx.fill();

        // WINGS
        ctx.fillStyle = e.dead ? "#000" : "#b8bec8";

        ctx.beginPath();
        ctx.moveTo(10, -3);
        ctx.lineTo(-10, -18);
        ctx.lineTo(-30, -22);
        ctx.lineTo(-10, -2);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(10, 3);
        ctx.lineTo(-10, 18);
        ctx.lineTo(-30, 22);
        ctx.lineTo(-10, 2);
        ctx.closePath();
        ctx.fill();

        // COCKPIT
        ctx.fillStyle = e.dead ? "#111" : "#ff3b3b";

        ctx.beginPath();
        ctx.ellipse(10, 0, 6, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // HIT FLASH
        if (!e.dead && e.hitFlash > 0) {
            ctx.strokeStyle = "rgba(255,0,0,0.6)";
            ctx.lineWidth = 2;
            ctx.strokeRect(e.x - 45, e.y - 20, 90, 40);
        }
    }
}
