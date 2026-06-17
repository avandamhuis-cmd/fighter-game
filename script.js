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

document.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
});

canvas.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

const jet = {
    x: canvas.width / 2,
    y: canvas.height / 2,

    vx: 0,
    vy: 0,

    angle: 0,

    thrust: 0.18,
    drag: 0.992,
    maxSpeed: 12
};

function update() {

    const targetAngle = Math.atan2(
        mouse.y - jet.y,
        mouse.x - jet.x
    );

    let diff = targetAngle - jet.angle;

    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;

    jet.angle += diff * 0.05;

    if (keys["w"]) {

        jet.vx += Math.cos(jet.angle) * jet.thrust;
        jet.vy += Math.sin(jet.angle) * jet.thrust;

        particles.push({
            x: jet.x - Math.cos(jet.angle) * 50,
            y: jet.y - Math.sin(jet.angle) * 50,

            vx: -Math.cos(jet.angle) * 5 +
                (Math.random() - 0.5) * 2,

            vy: -Math.sin(jet.angle) * 5 +
                (Math.random() - 0.5) * 2,

            size: 8 + Math.random() * 8,
            life: 1
        });
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

        p.life -= 0.03;
        p.size *= 0.98;

        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }

    if (jet.x < 0) jet.x = canvas.width;
    if (jet.x > canvas.width) jet.x = 0;
    if (jet.y < 0) jet.y = canvas.height;
    if (jet.y > canvas.height) jet.y = 0;
}

function drawParticles() {

    for (const p of particles) {

        const color =
            Math.random() > 0.5
                ? `rgba(255,220,50,${p.life})`
                : `rgba(255,120,0,${p.life})`;

        ctx.fillStyle = color;

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

    ctx.fillStyle = "#bfc4cc";

    ctx.beginPath();

    ctx.moveTo(50, 0);
    ctx.lineTo(20, -7);
    ctx.lineTo(5, -10);
    ctx.lineTo(-5, -28);
    ctx.lineTo(-28, -18);
    ctx.lineTo(-45, -8);
    ctx.lineTo(-55, 0);
    ctx.lineTo(-45, 8);
    ctx.lineTo(-28, 18);
    ctx.lineTo(-5, 28);
    ctx.lineTo(5, 10);
    ctx.lineTo(20, 7);

    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#9da4ad";

    ctx.beginPath();
    ctx.moveTo(-30, -3);
    ctx.lineTo(-18, -20);
    ctx.lineTo(-10, -5);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#7fd7ff";

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

    if (keys["w"]) {

        ctx.fillStyle =
            `rgba(255,180,0,${0.5 + Math.random() * 0.3})`;

        ctx.beginPath();
        ctx.arc(
            -50,
            0,
            8 + Math.random() * 3,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    ctx.restore();
}

function drawVelocityIndicator() {

    ctx.strokeStyle = "white";
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
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawParticles();
    drawVelocityIndicator();
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
