const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const keys = {};
const particles = [];
const mouse = { x: 0, y: 0 };

let mode = "menu";
let screenShake = 0;
window.screenShake = 0;

const jet = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: 0,
    vy: 0,
    angle: 0,
    thrust: 0.16,
    drag: 0.993,
    maxSpeed: 10
};

document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

canvas.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.startGame = function(type) {

    mode = type;
    document.getElementById("menu").style.display = "none";

    enemies.length = 0;

    if (type === "play") {
        spawnEnemy(true);
    } else {
        spawnEnemy(false);
    }
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

    if (window.updateEnemies) updateEnemies(jet, particles, mode);
    if (window.updateWeapons) updateWeapons(jet, keys, particles);

    screenShake *= 0.85;
}

function drawParticles() {

    for (const p of particles) {

        if (p.type === "explosion") {

            ctx.fillStyle = `rgba(255, ${120 + Math.random()*120}, 0, ${p.life})`;
            ctx.shadowBlur = 15;
            ctx.shadowColor = "orange";
            ctx.fillRect(p.x, p.y, p.size, p.size);
            ctx.shadowBlur = 0;

        } else {

            ctx.fillStyle = `rgba(255, ${120 + Math.random()*120}, 0, ${p.life})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "yellow";
            ctx.fillRect(p.x, p.y, p.size, p.size);
            ctx.shadowBlur = 0;
        }
    }
}

function draw() {

    const shakeX = (Math.random() - 0.5) * window.screenShake;
    const shakeY = (Math.random() - 0.5) * window.screenShake;

    ctx.save();
    ctx.translate(shakeX, shakeY);

    ctx.fillStyle = "#4da6ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawParticles();

    if (window.drawEnemies) drawEnemies(ctx);
    if (window.drawWeapons) drawWeapons(ctx);

    drawJet(ctx, jet, keys);

    ctx.restore();
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
