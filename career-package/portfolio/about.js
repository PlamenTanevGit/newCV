// About: interactive AI-powered QA workflow (ported from Documents/Codex/2026-10-06/writ/outputs/ai-qa-interactive-workflow.html).
// Progressive enhancement: the nine workflow cards are static, positioned markup in index.html and readable without
// this script. With it: every card gets a drag handle (pointer, or arrow keys when focused), the connectors between
// cards are drawn as animated SVG paths that follow the cards as they move, the title's second line reacts to hover,
// and two buttons reset the layout or pause the flow. The flow animation also pauses while the section is off screen.
(function () {
  "use strict";

  var root = document.getElementById("about");
  var board = root && root.querySelector(".qf-board");
  var svg = root && root.querySelector(".qf-links");
  if (!root || !board || !svg || !window.ResizeObserver) return;

  var SVG_NS = "http://www.w3.org/2000/svg";
  var COLORS = { lime: "#c3ef55", blue: "#4dc4ff", green: "#7de584" };
  var EDGES = [["requirements", "generation"], ["generation", "defects"], ["defects", "manual"], ["generation", "api"],
               ["manual", "database"], ["api", "database"], ["database", "automation"], ["automation", "evidence"],
               ["evidence", "pipeline"], ["pipeline", "api"]];
  var nodes = {};
  var drag = null;

  var controls = root.querySelector(".qf-controls");
  if (controls) controls.hidden = false;

  function svgEl(name, attrs) {
    var el = document.createElementNS(SVG_NS, name);
    Object.keys(attrs).forEach(function (key) { el.setAttribute(key, attrs[key]); });
    return el;
  }

  // Arrowheads, one per colour
  var defs = svgEl("defs", {});
  Object.keys(COLORS).forEach(function (name) {
    var marker = svgEl("marker", { id: "qf-arrow-" + name, viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 5, markerHeight: 5, orient: "auto-start-reverse" });
    marker.appendChild(svgEl("path", { d: "M1 1L9 5L1 9", fill: "none", stroke: COLORS[name], "stroke-width": 2 }));
    defs.appendChild(marker);
  });
  svg.appendChild(defs);

  // Cards: read the design position from the markup, add a drag handle
  Array.prototype.forEach.call(board.querySelectorAll(".qf-node"), function (el) {
    var id = el.getAttribute("data-id");
    var state = {
      el: el, id: id, x: 0, y: 0, moved: false,
      dx: parseFloat(el.getAttribute("data-x")), dy: parseFloat(el.getAttribute("data-y")),
      dw: parseFloat(el.getAttribute("data-w")), dh: parseFloat(el.getAttribute("data-h")),
      color: el.classList.contains("qf-node--green") ? "green" : el.classList.contains("qf-node--blue") ? "blue" : "lime"
    };
    nodes[id] = state;

    var label = el.querySelector("h3").textContent;
    var grip = document.createElement("button");
    grip.className = "qf-grip";
    grip.type = "button";
    grip.textContent = "⠿";
    grip.setAttribute("aria-label", "Move " + label + ". Use arrow keys.");
    el.insertBefore(grip, el.firstChild);

    grip.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      e.preventDefault();
      grip.focus({ preventScroll: true });
      drag = { state: state, px: e.clientX, py: e.clientY, x: state.x, y: state.y };
      grip.setPointerCapture(e.pointerId);
      el.style.zIndex = "3";
    });
    grip.addEventListener("pointermove", function (e) {
      if (!drag || drag.state !== state) return;
      state.x = drag.x + e.clientX - drag.px;
      state.y = drag.y + e.clientY - drag.py;
      state.moved = true;
      place(state);
      renderLinks();
    });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach(function (type) {
      grip.addEventListener(type, function () {
        if (drag && drag.state === state) drag = null;
        el.style.zIndex = "";
      });
    });
    grip.addEventListener("keydown", function (e) {
      var amount = e.shiftKey ? 20 : 5;
      var deltas = { ArrowLeft: [-amount, 0], ArrowRight: [amount, 0], ArrowUp: [0, -amount], ArrowDown: [0, amount] };
      if (!deltas[e.key]) return;
      e.preventDefault();
      state.x += deltas[e.key][0];
      state.y += deltas[e.key][1];
      state.moved = true;
      place(state);
      renderLinks();
    });
  });

  // Connectors: a faint base line and a flowing dashed line, coloured by the card they point to
  var paths = EDGES.filter(function (edge) { return nodes[edge[0]] && nodes[edge[1]]; }).map(function (edge) {
    var color = nodes[edge[1]].color;
    var value = COLORS[color];
    var base = svgEl("path", { "class": "qf-link-base", stroke: value, "marker-end": "url(#qf-arrow-" + color + ")" });
    var flow = svgEl("path", { "class": "qf-link-flow", stroke: value, style: "color:" + value });
    svg.appendChild(base);
    svg.appendChild(flow);
    return { from: nodes[edge[0]], to: nodes[edge[1]], base: base, flow: flow };
  });

  function place(s) {
    s.x = Math.max(0, Math.min(board.clientWidth - s.el.offsetWidth, s.x));
    s.y = Math.max(0, Math.min(board.clientHeight - s.el.offsetHeight, s.y));
    s.el.style.left = s.x + "px";
    s.el.style.top = s.y + "px";
  }

  function renderLinks() {
    paths.forEach(function (p) {
      var a = p.from, b = p.to;
      var aw = a.el.offsetWidth, ah = a.el.offsetHeight, bw = b.el.offsetWidth, bh = b.el.offsetHeight;
      var sx, sy, tx, ty, d, mid;
      if (Math.abs(a.y - b.y) < 80) {
        // same row: leave from the side facing the target
        var right = b.x > a.x;
        sx = a.x + (right ? aw : 0); sy = a.y + ah / 2;
        tx = b.x + (right ? 0 : bw); ty = b.y + bh / 2;
        mid = (sx + tx) / 2;
        d = "M" + sx + "," + sy + " C" + mid + "," + sy + " " + mid + "," + ty + " " + tx + "," + ty;
      } else {
        // different rows: leave from the bottom (or top) edge
        var below = b.y > a.y;
        sx = a.x + aw / 2; sy = a.y + (below ? ah : 0);
        tx = b.x + bw / 2; ty = b.y + (below ? 0 : bh);
        mid = (sy + ty) / 2;
        d = "M" + sx + "," + sy + " C" + sx + "," + mid + " " + tx + "," + mid + " " + tx + "," + ty;
      }
      p.base.setAttribute("d", d);
      p.flow.setAttribute("d", d);
    });
  }

  function layout() {
    Object.keys(nodes).forEach(function (id) {
      var s = nodes[id];
      s.el.style.width = s.dw * board.clientWidth + "px";
      s.el.style.height = s.dh + "px";
      if (!s.moved) { s.x = s.dx * board.clientWidth; s.y = s.dy; }
      place(s);
    });
    renderLinks();
  }
  new ResizeObserver(layout).observe(board);

  var resetBtn = document.getElementById("qf-reset");
  if (resetBtn) resetBtn.addEventListener("click", function () {
    Object.keys(nodes).forEach(function (id) { nodes[id].moved = false; });
    layout();
  });

  var pauseBtn = document.getElementById("qf-pause");
  if (pauseBtn) pauseBtn.addEventListener("click", function () {
    var paused = root.classList.toggle("is-paused");
    pauseBtn.setAttribute("aria-pressed", String(paused));
    pauseBtn.textContent = paused ? "Resume flow" : "Pause flow";
  });

  // Title: the second line reacts to hover, letter by letter, while the heading keeps its whole accessible name
  var title = root.querySelector("#qf-moving-title");
  if (title) {
    var text = title.textContent;
    title.setAttribute("aria-label", text);
    while (title.firstChild) title.removeChild(title.firstChild);
    Array.prototype.forEach.call(text, function (ch) {
      var letter = document.createElement("span");
      letter.className = "qf-letter";
      letter.setAttribute("aria-hidden", "true");
      letter.textContent = ch === " " ? " " : ch;
      title.appendChild(letter);
    });
  }

  // The flowing dashes run only while the section is on screen
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      root.classList.toggle("is-live", entries[0].isIntersecting);
    }, { threshold: 0.02 }).observe(root);
  } else {
    root.classList.add("is-live");
  }
})();
