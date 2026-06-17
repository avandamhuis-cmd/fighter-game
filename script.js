const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const keys = {};
const mouse = { x: 0, y: 0 };

const particles = [];

document.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

const jet = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: 0,
    vy: 0,
    angle: 0,
    thrust: 0.22,
    drag: 0.993,
    maxSpeed: 15
};

function update() {

    const targetAngle = Math.atan2(
        mouse.y - jet.y,
        mouse.x - jet.x
    );

    let diff = targetAngle - jet.angle;

    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;

    jet.angle += diff * 0.08;

    if (keys["w"]) {

        jet.vx += Math.cos(jet.angle) * jet.thrust;
        jet.vy += Math.sin(jet.angle) * jet.thrust;

        for (let i = 0; i < 2; i++) {
            particles.push({
                x: jet.x - Math.cos(jet.angle) * 40,
                y: jet.y - Math.sin(jet.angle) * 40,
                vx: -Math.cos(jet.angle) * 4,
                vy: -Math.sin(jet.angle) * 4,
                size: 3,
                life: 1
            });
        }
    }

    const speed = Math.hypot(jet.vx, jet.vy);

    if (speed > jet.maxSpeed) {
        jet.vx *= jet.maxSpeed / speed;
        jet.vy *= jet.maxSpeed / speed;
    }

    jet.x += jet.vx;
    jet.y += jet.vy;

    jet.vx *= jet.drag;
    jet.vy *= jet.drag;

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        p.life -= 0.04;

        if (p.life <= 0) particles.splice(i, 1);
    }

    if (jet.x < -50) jet.x = canvas.width + 50;
    if (jet.x > canvas.width + 50) jet.x = -50;
    if (jet.y < -50) jet.y = canvas.height + 50;
    if (jet.y > canvas.height + 50) jet.y = -50;

    updateWeapons(jet, keys);
}

function drawParticles() {

    for (const p of particles) {
        ctx.fillStyle = `rgba(255,140,0,${p.life})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
    }
}

function draw() {

    ctx.fillStyle = "#4da6ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawParticles();
    drawWeapons(ctx);
    drawJet(ctx, jet, keys);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
