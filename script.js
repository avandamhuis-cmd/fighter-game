const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const keys = {};
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

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
    drag: 0.992
};

function update() {

    // Face mouse
    jet.angle = Math.atan2(
        mouse.y - jet.y,
        mouse.x - jet.x
    );

    // Thrust
    if (keys["w"]) {
        jet.vx += Math.cos(jet.angle) * jet.thrust;
        jet.vy += Math.sin(jet.angle) * jet.thrust;
    }

    // Move
    jet.x += jet.vx;
    jet.y += jet.vy;

    // Drift
    jet.vx *= jet.drag;
    jet.vy *= jet.drag;

    // Screen wrapping
    if (jet.x < 0) jet.x = canvas.width;
    if (jet.x > canvas.width) jet.x = 0;
    if (jet.y < 0) jet.y = canvas.height;
    if (jet.y > canvas.height) jet.y = 0;
}

function drawJet() {

    ctx.save();

    ctx.translate(jet.x, jet.y);
    ctx.rotate(jet.angle);

    ctx.fillStyle = "#c0c0c0";

    // F-16 style shape
    ctx.beginPath();
    ctx.moveTo(40, 0);
    ctx.lineTo(10, -8);
    ctx.lineTo(-5, -20);
    ctx.lineTo(-30, -12);
    ctx.lineTo(-40, 0);
    ctx.lineTo(-30, 12);
    ctx.lineTo(-5, 20);
    ctx.lineTo(10, 8);
    ctx.closePath();
    ctx.fill();

    // Cockpit
    ctx.fillStyle = "#66ccff";
    ctx.beginPath();
    ctx.ellipse(15, 0, 8, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Engine flame
    if (keys["w"]) {
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.moveTo(-40, 0);
        ctx.lineTo(-55, -5);
        ctx.lineTo(-55, 5);
        ctx.closePath();
        ctx.fill();
    }

    ctx.restore();
}

function draw() {
    ctx.fillStyle = "#4da6ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
