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
    ctx.moveTo(40, 0);      // nose
    ctx.lineTo(18, -5);
    ctx.lineTo(-22, -5);
    ctx.lineTo(-42, 0);
    ctx.lineTo(-22, 5);
    ctx.lineTo(18, 5);
    ctx.closePath();
    ctx.fill();

    // ================= TAIL STABILIZERS =================
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

    // ================= ENGINE (NEON GLOW) =================
    ctx.fillStyle = "#222";
    ctx.fillRect(-44, -2, 4, 4);

    if (keys["w"]) {

        const flicker = 6 + Math.random() * 3;

        // outer glow (orange)
        ctx.fillStyle = "rgba(255,160,0,0.25)";
        ctx.beginPath();
        ctx.arc(-48, 0, flicker * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // inner glow (neon yellow)
        ctx.fillStyle = "rgba(255,255,0,0.7)";
        ctx.beginPath();
        ctx.arc(-48, 0, flicker, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}
