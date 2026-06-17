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

    // turning inertia
    jet.angle += diff * 0.08;

    if (keys["w"]) {

        jet.vx += Math.cos(jet.angle) * jet.thrust;
        jet.vy += Math.sin(jet.angle) * jet.thrust;

        // exhaust particles
        for (let i = 0; i < 2; i++) {

            particles.push({
                x: jet.x - Math.cos(jet.angle) * 40,
                y: jet.y - Math.sin(jet.angle) * 40,

                vx:
                    -Math.cos(jet.angle) * (4 + Math.random() * 2) +
                    (Math.random() - 0.5) * 0.8,

                vy:
                    -Math.sin(jet.angle) * (4 + Math.random() * 2) +
                    (Math.random() - 0.5) * 0.8,

                size: 3 + Math.random() * 3,
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

        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }

    if (jet.x < -50) jet.x = canvas.width + 50;
    if (jet.x > canvas.width + 50) jet.x = -50;

    if (jet.y < -50) jet.y = canvas.height + 50;
    if (jet.y > canvas.height + 50) jet.y = -50;
}

function drawParticles() {

    for (const p of particles) {

        if (Math.random() > 0.5) {
            ctx.fillStyle = `rgba(255,220,0,${p.life})`;
        } else {
            ctx.fillStyle = `rgba(255,120,0,${p.life})`;
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

    // ---------- MAIN FUSELAGE ----------

    ctx.fillStyle = "#c7ccd4";

    ctx.beginPath();

    ctx.moveTo(38, 0);      // nose

    ctx.lineTo(16, -5);
    ctx.lineTo(-22, -5);
    ctx.lineTo(-36, -3);
    ctx.lineTo(-42, 0);
    ctx.lineTo(-36, 3);
    ctx.lineTo(-22, 5);
    ctx.lineTo(16, 5);

    ctx.closePath();
    ctx.fill();

    // ---------- MAIN WINGS ----------

    ctx.fillStyle = "#b8bec8";

    ctx.beginPath();

    ctx.moveTo(6, -6);
    ctx.lineTo(-8, -20);
    ctx.lineTo(-28, -24);
    ctx.lineTo(-12, -4);

    ctx.closePath();
    ctx.fill();

    ctx.beginPath();

    ctx.moveTo(6, 6);
    ctx.lineTo(-8, 20);
    ctx.lineTo(-28, 24);
    ctx.lineTo(-12, 4);

    ctx.closePath();
    ctx.fill();

    // ---------- HORIZONTAL STABILIZERS ----------

    ctx.fillStyle = "#adb5c0";

    ctx.beginPath();

    ctx.moveTo(-24, -5);
    ctx.lineTo(-36, -13);
    ctx.lineTo(-30, -4);

    ctx.closePath();
    ctx.fill();

    ctx.beginPath();

    ctx.moveTo(-24, 5);
    ctx.lineTo(-36, 13);
    ctx.lineTo(-30, 4);

    ctx.closePath();
    ctx.fill();

    // ---------- VERTICAL STABILIZER ----------

    ctx.fillStyle = "#969faa";

    ctx.beginPath();

    ctx.moveTo(-22, -2);
    ctx.lineTo(-12, -18);
    ctx.lineTo(-4, -2);

    ctx.closePath();
    ctx.fill();

    // ---------- COCKPIT ----------

    ctx.fillStyle = "#6fd9ff";

    ctx.beginPath();

    ctx.ellipse(
        12,
        0,
        7,
        3.5,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // ---------- NOZZLE ----------

    ctx.fillStyle = "#444";

    ctx.fillRect(
        -44,
        -2,
        4,
        4
    );

    // ---------- AFTERBURNER ----------

    if (keys["w"]) {

        ctx.fillStyle =
            `rgba(255,180,0,${0.6 + Math.random() * 0.3})`;

        ctx.fillRect(
            -48,
            -2,
            5,
            4
        );
    }

    ctx.restore();
}

function drawVelocityLine() {

    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(jet.x, jet.y);

    ctx.lineTo(
        jet.x + jet.vx * 10,
        jet.y + jet.vy * 10
    );

    ctx.stroke();
}

function draw() {

    ctx.fillStyle = "#4da6ff";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

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
