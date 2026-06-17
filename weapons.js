window.bullets = window.bullets || [];

window.fireCooldown = 0;

window.updateWeapons = function (jet, keys) {

    window.fireCooldown--;

    if (keys[" "]) {

        if (window.fireCooldown <= 0) {

            window.bullets.push({
                x: jet.x + Math.cos(jet.angle) * 26,
                y: jet.y + Math.sin(jet.angle) * 26,
                vx: Math.cos(jet.angle) * 16,
                vy: Math.sin(jet.angle) * 16,
                life: 50
            });

            window.fireCooldown = 5;
        }
    }

    for (let i = window.bullets.length - 1; i >= 0; i--) {

        const b = window.bullets[i];

        b.x += b.vx;
        b.y += b.vy;

        b.life--;

        if (b.life <= 0) {
            window.bullets.splice(i, 1);
        }
    }
};

window.drawWeapons = function (ctx) {

    for (const b of window.bullets) {

        ctx.shadowBlur = 12;
        ctx.shadowColor = "yellow";

        ctx.strokeStyle = "rgba(255,255,0,1)";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x - b.vx * 0.2, b.y - b.vy * 0.2);
        ctx.stroke();

        ctx.shadowBlur = 0;
    }
};
