const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const keys = {};
const particles = [];
const mouse = { x: 0, y: 0 };

let mode = "menu";
let screenShake = 0;

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
