const bullets = [];
let fireCooldown = 0;

function updateWeapons(jet, keys) {

    fireCooldown--;

    if (keys[" "]) {

        if (fireCooldown <= 0) {

            bullets.push({
                x: jet.x + Math.cos(jet.angle) * 28 - Math.sin(jet.angle) * 4,
                y: jet.y + Math.sin(jet.angle) * 28 + Math.cos(jet.angle) * 4,

                vx: Math.cos(jet.angle) * 14,
                vy: Math.sin(jet.angle) * 14,

                life: 60
            });

            fireCooldown = 6;
        }
    }

    for (let i = bullets.length - 1; i >= 0; i--) {

        const b = bullets[i];

        b.x += b.vx;
        b.y += b.vy;

        b.life--;

        if (b.life <= 0) bullets.splice(i, 1);
    }
}

function drawWeapons(ctx) {

    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;

    for (const b of bullets) {

        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(
            b.x - b.vx * 0.2,
            b.y - b.vy * 0.2
        );
        ctx.stroke();
    }
}
