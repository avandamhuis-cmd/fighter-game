const bullets = [];
let fireCooldown = 0;

function updateWeapons(jet, keys) {

    fireCooldown--;

    if (keys[" "]) {

        if (fireCooldown <= 0) {

            // SINGLE INVISIBLE CANNON UNDER NOSE
            const offset = 26;

            bullets.push({
                x: jet.x + Math.cos(jet.angle) * offset - Math.sin(jet.angle) * 2,
                y: jet.y + Math.sin(jet.angle) * offset + Math.cos(jet.angle) * 2,

                vx: Math.cos(jet.angle) * 16,
                vy: Math.sin(jet.angle) * 16,

                life: 50
            });

            fireCooldown = 5;
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

    for (const b of bullets) {

        // NEON YELLOW GLOW EFFECT
        ctx.strokeStyle = "rgba(255,255,0,1)";
        ctx.lineWidth = 1.5;

        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(255,255,0,1)";

        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(
            b.x - b.vx * 0.25,
            b.y - b.vy * 0.25
        );
        ctx.stroke();

        ctx.shadowBlur = 0;
    }
}
