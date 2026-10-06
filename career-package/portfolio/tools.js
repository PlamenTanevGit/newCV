// Tools: interactive layer for the neon panels (ported from Documents/Codex/2026-10-06/writ/outputs/tools-interactive-modern.html).
// Progressive enhancement: without this script the section is the static panels and every tool name is plain text.
// With it: the headline's accent letters lift on hover, each tool badge can be dragged inside its panel (or focused and
// moved with the arrow keys), panels tilt toward the mouse, the AI Stack panel gets a network canvas, and two buttons
// reset the badges or pause all the effects. Idle animation also pauses while the section is off screen.
(function () {
  "use strict";

  var root = document.getElementById("tools");
  if (!root || !window.ResizeObserver) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  var paused = false;
  var resetters = [];
  var panels = Array.prototype.slice.call(root.querySelectorAll(".te-panel"));

  var controls = root.querySelector(".te-controls");
  if (controls) controls.hidden = false;

  // Headline: split the accent words into letters, keeping the accessible name of the heading whole
  var accent = root.querySelector("h2 span");
  if (accent) {
    var text = accent.textContent;
    accent.setAttribute("aria-label", text);
    while (accent.firstChild) accent.removeChild(accent.firstChild);
    Array.prototype.forEach.call(text, function (letter) {
      var span = document.createElement("span");
      span.className = "te-letter";
      span.setAttribute("aria-hidden", "true");
      span.textContent = letter === " " ? " " : letter;
      accent.appendChild(span);
    });
  }

  // Badges: draggable inside their panel, and movable with the arrow keys
  Array.prototype.forEach.call(root.querySelectorAll("li"), function (badge) {
    var panel = badge.closest(".te-panel");
    var x = 0, y = 0, drag = null;
    badge.tabIndex = 0;
    badge.setAttribute("aria-label", badge.textContent + ", movable badge. Use arrow keys to move.");

    function move() {
      // Work out the unshifted position from layout coordinates, then keep the badge inside the panel
      var list = badge.parentElement;
      var baseX = list.offsetLeft + badge.offsetLeft;
      var baseY = list.offsetTop + badge.offsetTop;
      x = Math.max(12 - baseX, Math.min(panel.clientWidth - baseX - badge.offsetWidth - 12, x));
      y = Math.max(12 - baseY, Math.min(panel.clientHeight - baseY - badge.offsetHeight - 12, y));
      badge.style.setProperty("--x", x + "px");
      badge.style.setProperty("--y", y + "px");
    }

    badge.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      e.preventDefault();
      badge.focus({ preventScroll: true });
      panel.style.setProperty("--rx", "0deg");
      panel.style.setProperty("--ry", "0deg");
      drag = { px: e.clientX, py: e.clientY, x: x, y: y };
      badge.setPointerCapture(e.pointerId);
    });
    badge.addEventListener("pointermove", function (e) {
      if (!drag) return;
      x = drag.x + e.clientX - drag.px;
      y = drag.y + e.clientY - drag.py;
      move();
    });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach(function (type) {
      badge.addEventListener(type, function () { drag = null; });
    });
    badge.addEventListener("keydown", function (e) {
      var step = e.shiftKey ? 20 : 5;
      var dirs = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
      if (!dirs[e.key]) return;
      e.preventDefault();
      x += dirs[e.key][0];
      y += dirs[e.key][1];
      move();
    });
    resetters.push(function () {
      x = 0; y = 0;
      badge.style.setProperty("--x", "0px");
      badge.style.setProperty("--y", "0px");
    });
    new ResizeObserver(function () { if (x || y) move(); }).observe(panel);
  });

  // Panels tilt a few degrees toward the mouse (not over a badge, not while a button is held, not when paused)
  panels.forEach(function (panel) {
    panel.addEventListener("pointermove", function (e) {
      if (paused || reduced.matches || e.pointerType !== "mouse" || e.buttons || e.target.closest("li")) return;
      var r = panel.getBoundingClientRect();
      panel.style.setProperty("--rx", (-(e.clientY - r.top - r.height / 2) / r.height * 5) + "deg");
      panel.style.setProperty("--ry", ((e.clientX - r.left - r.width / 2) / r.width * 5) + "deg");
    });
    var clearTilt = function () {
      panel.style.setProperty("--rx", "0deg");
      panel.style.setProperty("--ry", "0deg");
    };
    panel.addEventListener("pointerleave", clearTilt);
    resetters.push(clearTilt);
  });

  var resetBtn = document.getElementById("te-reset");
  if (resetBtn) resetBtn.addEventListener("click", function () { resetters.forEach(function (fn) { fn(); }); });

  var pauseBtn = document.getElementById("te-pause");
  if (pauseBtn) {
    pauseBtn.addEventListener("click", function () {
      paused = !paused;
      root.classList.toggle("is-paused", paused);
      pauseBtn.setAttribute("aria-pressed", String(paused));
      pauseBtn.textContent = paused ? "Resume effects" : "Pause effects";
      if (paused) panels.forEach(function (panel) {
        panel.style.setProperty("--rx", "0deg");
        panel.style.setProperty("--ry", "0deg");
      });
    });
  }

  // Idle CSS animation runs only while the section is on screen
  var onScreen = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      onScreen = entries[0].isIntersecting;
      root.classList.toggle("is-live", onScreen);
    }, { threshold: 0.02 }).observe(root);
  } else {
    root.classList.add("is-live");
  }

  // Network canvas behind the AI Stack panel
  var canvas = root.querySelector(".te-network");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    var width = 0, height = 0, visible = true, lastFrame = 0;
    var points = [];
    for (var i = 0; i < 22; i++) points.push({ x: 0.45 + (i * 0.137 % 0.52), y: i * 0.381 % 1, phase: i });

    var draw = function (time) {
      time = time || 0;
      ctx.clearRect(0, 0, width, height);
      var nodes = points.map(function (p) {
        return { x: p.x * width + Math.sin(time * 0.0003 + p.phase) * 10, y: p.y * height + Math.cos(time * 0.0004 + p.phase) * 10 };
      });
      ctx.strokeStyle = "#ed8cff";
      ctx.fillStyle = "#ffe5ff";
      nodes.forEach(function (p, idx) {
        nodes.slice(idx + 1).forEach(function (q) {
          if (Math.hypot(p.x - q.x, p.y - q.y) < 140) {
            ctx.globalAlpha = 0.3;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        });
        ctx.globalAlpha = 0.8;
        ctx.beginPath(); ctx.arc(p.x, p.y, idx % 4 === 0 ? 4 : 2, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    new ResizeObserver(function () {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      var ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    }).observe(canvas);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }).observe(canvas);
    }

    var animate = function (time) {
      if (time - lastFrame > 33 && visible && !paused && !document.hidden && !reduced.matches) {
        draw(time);
        lastFrame = time;
      }
      window.requestAnimationFrame(animate);
    };
    window.requestAnimationFrame(animate);
  }
})();
