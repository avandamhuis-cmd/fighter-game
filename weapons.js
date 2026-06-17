const bullets = [];
let fireCooldown = 0;

function updateWeapons(jet, keys) {

    fireCooldown--;

    if (keys[" "]) {

        if (fireCooldown <= 0) {

            bullets.push({
                x: jet.x + Math.cos(jet.angle) * 26,
                y: jet.y + Math.sin(jet.angle) * 26,
                vx: Math.cos(jet.angle) * 16,
                vy: Math.sin(jet.angle) * 16,
                life: 50
            });

            fireCooldown = 9; // slower fire rate
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

        const tailX = b.x - b.vx * 0.6;
        const tailY = b.y - b.vy * 0.6;

        // glow trail
        ctx.shadowBlur = 18;
        ctx.shadowColor = "rgba(255,255,0,0.9)";

        ctx.strokeStyle = "rgba(255,255,0,0.2)";
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        // bright core tracer
        ctx.shadowBlur = 8;
        ctx.strokeStyle = "rgba(255,255,140,1)";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        ctx.shadowBlur = 0;
    }
}
