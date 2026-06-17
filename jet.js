function drawJet(ctx, jet, keys) {

    ctx.save();

    ctx.translate(jet.x, jet.y);
    ctx.rotate(jet.angle);

    // ================= WINGS (UNDER BODY) =================
    ctx.fillStyle = "#b8bec8";

    ctx.beginPath();
    ctx.moveTo(10, -3);
    ctx.lineTo(-8, -18);
    ctx.lineTo(-30, -24);
    ctx.lineTo(-12, -2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(10, 3);
    ctx.lineTo(-8, 18);
    ctx.lineTo(-30, 24);
    ctx.lineTo(-12, 2);
    ctx.closePath();
    ctx.fill();

    // ================= BODY =================
    ctx.fillStyle = "#c7ccd4";

    ctx.beginPath();
    ctx.moveTo(38, 0);
    ctx.lineTo(16, -5);
    ctx.lineTo(-22, -5);
    ctx.lineTo(-42, 0);
    ctx.lineTo(-22, 5);
    ctx.lineTo(16, 5);
    ctx.closePath();
    ctx.fill();

    // ================= TAIL =================
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

    // ================= COCKPIT =================
    ctx.fillStyle = "#6fd9ff";

    ctx.beginPath();
    ctx.ellipse(12, 0, 7, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // ================= NOSE CANNON =================
    ctx.fillStyle = "#333";
    ctx.fillRect(30, 4, 6, 2);
    ctx.fillRect(30, -6, 6, 2);

    // ================= ENGINE =================
    ctx.fillStyle = "#444";
    ctx.fillRect(-44, -2, 4, 4);

    if (keys["w"]) {
        ctx.fillStyle = "rgba(255,180,0,0.5)";
        ctx.beginPath();
        ctx.arc(-48, 0, 6 + Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}
