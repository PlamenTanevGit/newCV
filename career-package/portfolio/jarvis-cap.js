// JARVIS capabilities: pointer glow and tilt for the six cards (ported from
// Documents/Codex/2026-10-06/writ/outputs/jarvis-glowing-capabilities.html).
// Progressive enhancement: without this script the cards are static and fully readable. With it, each card follows the
// mouse with a soft glow and a slight tilt, becomes a keyboard stop (focus shows the glow), and "Pause tilt" stops the tilt.
(function () {
  "use strict";

  var root = document.querySelector(".jc");
  if (!root) return;

  var cards = Array.prototype.slice.call(root.querySelectorAll(".jc-card"));
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  var button = document.getElementById("jc-motion");
  var paused = false;

  function clear(card) {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  }

  cards.forEach(function (card) {
    var frame = 0;
    var latest = null;
    card.tabIndex = 0;

    card.addEventListener("pointermove", function (event) {
      if (event.pointerType !== "mouse") return;
      latest = { x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = 0;
        var r = card.getBoundingClientRect();
        var x = (latest.x - r.left) / r.width;
        var y = (latest.y - r.top) / r.height;
        card.style.setProperty("--mx", x * 100 + "%");
        card.style.setProperty("--my", y * 100 + "%");
        if (!paused && !reduced.matches) {
          card.style.setProperty("--rx", (0.5 - y) * 7 + "deg");
          card.style.setProperty("--ry", (x - 0.5) * 7 + "deg");
        }
      });
    });
    card.addEventListener("pointerleave", function () {
      cancelAnimationFrame(frame);
      frame = 0;
      clear(card);
    });
    card.addEventListener("focus", function () {
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "50%");
    });
    card.addEventListener("blur", function () { clear(card); });
  });

  if (button) {
    button.parentNode.hidden = false;
    button.addEventListener("click", function () {
      paused = !paused;
      button.setAttribute("aria-pressed", String(paused));
      button.textContent = paused ? "Resume tilt" : "Pause tilt";
      cards.forEach(clear);
    });
  }
})();
