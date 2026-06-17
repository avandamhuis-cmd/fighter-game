const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const keys = {};
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

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
    thrust: 0.25,
    drag: 0.993,
    maxSpeed: 15
};

function update() {

    // Smooth turning inertia
    const targetAngle = Math.atan2(
        mouse.y - jet.y,
        mouse.x - jet.x
    );

    let diff = targetAngle - jet.angle;

    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;

    jet.angle += diff * 0.08;

    // Thrust
    if (keys["w"]) {

        jet.vx += Math.cos(jet.angle) * jet.thrust;
        jet.vy += Math.sin(jet.angle) * jet.thrust;

        // Exhaust particles
        for (let i = 0; i < 4; i++) {

            particles.push({
                x: jet.x - Math.cos(jet.angle) * 70,
                y: jet.y - Math.sin(jet.angle) * 70,

                vx:
                    -Math.cos(jet.angle) * (5 + Math.random() * 3) +
                    (Math.random() - 0.5) * 2,

                vy:
                    -Math.sin(jet.angle) * (5 + Math.random() * 3) +
                    (Math.random() - 0.5) * 2,

                size: 12 + Math.random() * 12,
                life: 1
            });
        }
    }

    // Speed limit
    const speed = Math.hypot(jet.vx, jet.vy);

    if (speed > jet.maxSpeed) {
        jet.vx *= jet.maxSpeed / speed;
        jet.vy *= jet.maxSpeed / speed;
    }

    // Move
    jet.x += jet.vx;
    jet.y += jet.vy;

    // Drift
    jet.vx *= jet.drag;
    jet.vy *= jet.drag;

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {

        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        p.life -= 0.02;
        p.size *= 0.985;

        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }

    // Screen wrap
    if (jet.x < -100) jet.x = canvas.width + 100;
    if (jet.x > canvas.width + 100) jet.x = -100;

    if (jet.y < -100) jet.y = canvas.height + 100;
    if (jet.y > canvas.height + 100) jet.y = -100;
}

function drawParticles() {

    for (const p of particles) {

        const alpha = p.life;

        if (Math.random() > 0.5) {
            ctx.fillStyle = `rgba(255,220,0,${alpha})`;
        } else {
            ctx.fillStyle = `rgba(255,120,0,${alpha})`;
        }

        ctx.fillRect(
            p.x - p.size / 2,
            p.y - p.size / 2,
            p.size,
            p.size
        );
    }
}

function drawJet() {

    ctx.save();

    ctx.translate(jet.x, jet.y);
    ctx.rotate(jet.angle);

    // BIGGER jet
    ctx.scale(2.2, 2.2);

    // Main body
    ctx.fillStyle = "#c9ced6";

    ctx.beginPath();

    ctx.moveTo(55, 0);     // nose
    ctx.lineTo(20, -8);

    ctx.lineTo(0, -10);

    ctx.lineTo(-10, -30);  // wing

    ctx.lineTo(-35, -20);

    ctx.lineTo(-50, -8);

    ctx.lineTo(-60, 0);    // engine

    ctx.lineTo(-50, 8);

    ctx.lineTo(-35, 20);

    ctx.lineTo(-10, 30);

    ctx.lineTo(0, 10);

    ctx.lineTo(20, 8);

    ctx.closePath();
    ctx.fill();

    // Tail fin
    ctx.fillStyle = "#9da5ae";

    ctx.beginPath();

    ctx.moveTo(-35, -5);
    ctx.lineTo(-18, -24);
    ctx.lineTo(-10, -5);

    ctx.closePath();
    ctx.fill();

    // Cockpit
    ctx.fillStyle = "#6fd9ff";

    ctx.beginPath();

    ctx.ellipse(
        18,
        0,
        10,
        5,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // Engine glow
    if (keys["w"]) {

        ctx.fillStyle =
            `rgba(255,180,0,${0.5 + Math.random() * 0.4})`;

        ctx.beginPath();

        ctx.arc(
            -58,
            0,
            7 + Math.random() * 4,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    ctx.restore();
}

function drawVelocityLine() {

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(jet.x, jet.y);

    ctx.lineTo(
        jet.x + jet.vx * 12,
        jet.y + jet.vy * 12
    );

    ctx.stroke();
}

function draw() {

    // Sky
    ctx.fillStyle = "#4da6ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Simple clouds
    ctx.fillStyle = "rgba(255,255,255,0.25)";

    for (let i = 0; i < 15; i++) {

        ctx.fillRect(
            (i * 220) % canvas.width,
            (i * 140) % canvas.height,
            120,
            25
        );
    }

    drawParticles();
    drawVelocityLine();
    drawJet();
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
