const bullets = [];
let fireCooldown = 0;

function updateWeapons(jet, keys, particles) {

    fireCooldown--;

    if (keys[" "]) {

        if (fireCooldown <= 0) {

            bullets.push({
                x: jet.x + Math.cos(jet.angle) * 26,
                y: jet.y + Math.sin(jet.angle) * 26,
                vx: Math.cos(jet.angle) * 16,
                vy: Math.sin(jet.angle) * 16,
                life: 60
            });

            fireCooldown = 9;
        }
    }

    for (let i = bullets.length - 1; i >= 0; i--) {

        const b = bullets[i];

        b.x += b.vx;
        b.y += b.vy;
        b.life--;

        if (b.life <= 0) {
            bullets.splice(i, 1);
            continue;
        }

        for (const e of enemies) {

            if (e.dead) continue;

            const dx = b.x - e.x;
            const dy = b.y - e.y;

            if (Math.hypot(dx, dy) < 30) {

                e.hp--;
                e.hitFlash = 10;

                bullets.splice(i, 1);
                i--;

                if (e.hp <= 0 && !e.dead) {

                    e.dead = true;

                    for (let j = 0; j < 35; j++) {

                        particles.push({
                            x: e.x,
                            y: e.y,
                            vx: (Math.random() - 0.5) * 6,
                            vy: (Math.random() - 0.5) * 6,
                            size: 2 + Math.random() * 3,
                            life: 1,
                            type: "explosion"
                        });
                    }

                    window.screenShake = 20;
                }

                break;
            }
        }
    }
}

function drawWeapons(ctx) {

    for (const b of bullets) {

        const tailX = b.x - b.vx * 0.6;
        const tailY = b.y - b.vy * 0.6;

        ctx.shadowBlur = 18;
        ctx.shadowColor = "rgba(255,255,0,0.9)";

        ctx.strokeStyle = "rgba(255,255,0,0.2)";
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

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
