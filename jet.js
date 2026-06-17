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
    ctx.moveTo(40, 0);
    ctx.lineTo(18, -5);
    ctx.lineTo(-22, -5);
    ctx.lineTo(-42, 0);
    ctx.lineTo(-22, 5);
    ctx.lineTo(18, 5);
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
    ctx.fillStyle = "#222";
    ctx.fillRect(-44, -2, 4, 4);

    if (keys["w"]) {

        const flicker = 4 + Math.random() * 2;

        // outer glow
        ctx.fillStyle = "rgba(255,160,0,0.25)";
        ctx.beginPath();
        ctx.arc(-48, 0, flicker * 2, 0, Math.PI * 2);
        ctx.fill();

        // inner neon glow
        ctx.fillStyle = "rgba(255,255,0,0.6)";
        ctx.beginPath();
        ctx.arc(-48, 0, flicker, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}
