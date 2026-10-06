// Minimal progressive enhancement. The page works fully without JavaScript.
(function () {
  "use strict";

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Close the mobile menu on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && links && links.classList.contains("open")) {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });

  // Respect reduced motion: show the first frame of the hero video instead of looping it
  var heroVideo = document.querySelector(".portfolio-hero-video");
  if (heroVideo && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroVideo.removeAttribute("autoplay");
    heroVideo.pause();
  }

  // AI tool cards: start the entrance once, and pause idle animation while off screen
  var aiSection = document.querySelector(".ai-stack-section");
  if (aiSection) {
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          aiSection.classList.toggle("ai-live", entry.isIntersecting);
          if (entry.isIntersecting) aiSection.classList.add("in-view");
        });
      }, { threshold: 0.15 }).observe(aiSection);
    } else {
      aiSection.classList.add("in-view", "ai-live");
    }
  }

  // JARVIS console: the robot render reacts to the command modules and follows the pointer
  var jarvisSection = document.querySelector(".jarvis-section");
  var jarvisStage = jarvisSection && jarvisSection.querySelector(".jarvis-stage");
  var jarvisRobot = jarvisStage && jarvisStage.querySelector(".jarvis-robot");
  if (jarvisRobot) {
    // command -> [mode label, assistant state]
    var JARVIS_MOODS = {
      chat: ["friendly", "listening"],
      analyze: ["focused", "analyzing"],
      automate: ["processing", "thinking"],
      create: ["inspired", "responding"]
    };
    var modeValue = jarvisStage.querySelector(".jarvis-mode-value");
    var stateItems = Array.prototype.slice.call(jarvisStage.querySelectorAll(".jv-states li"));
    var commandButtons = Array.prototype.slice.call(jarvisStage.querySelectorAll(".jarvis-command"));
    var activeCommand = null;
    var releaseTimer = null;
    var pingTimer = null;
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var setActiveCommand = function (command, button) {
      window.clearTimeout(releaseTimer);
      activeCommand = command;
      Object.keys(JARVIS_MOODS).forEach(function (name) {
        jarvisStage.classList.toggle("is-" + name, name === command);
      });
      jarvisStage.classList.toggle("is-idle", !command);
      commandButtons.forEach(function (b) { b.classList.toggle("is-active", b === button); });
      stateItems.forEach(function (li) {
        li.classList.toggle("is-on", !!command && li.getAttribute("data-state") === JARVIS_MOODS[command][1]);
      });
      if (modeValue) modeValue.textContent = command ? JARVIS_MOODS[command][0].toUpperCase() : "IDLE";
    };

    var release = function (button) {
      // Ignore a late release for a card that is no longer the active one
      if (activeCommand === button.getAttribute("data-command")) setActiveCommand(null, null);
    };

    commandButtons.forEach(function (button) {
      var command = button.getAttribute("data-command");
      button.addEventListener("pointerenter", function (e) {
        if (e.pointerType !== "touch") setActiveCommand(command, button);
      });
      button.addEventListener("pointerleave", function (e) {
        if (e.pointerType !== "touch" && !button.matches(":focus-visible")) release(button);
      });
      button.addEventListener("focus", function () { setActiveCommand(command, button); });
      button.addEventListener("blur", function () {
        if (!button.matches(":hover")) release(button);
      });
      // Click / tap: acknowledge with a nod. Touch has no hover, so let go after a moment.
      button.addEventListener("click", function (e) {
        setActiveCommand(command, button);
        jarvisStage.classList.remove("is-ping");
        void jarvisStage.offsetWidth;
        jarvisStage.classList.add("is-ping");
        window.clearTimeout(pingTimer);
        pingTimer = window.setTimeout(function () { jarvisStage.classList.remove("is-ping"); }, 800);
        if (e.pointerType === "touch") {
          releaseTimer = window.setTimeout(function () { release(button); }, 2600);
        }
      });
    });

    // Pointer parallax: the head turns a few degrees toward the pointer (mouse and pen only)
    if (!reduceMotion) {
      var parallaxFrame = 0;
      var parallaxEvent = null;
      var applyParallax = function () {
        parallaxFrame = 0;
        var r = jarvisRobot.getBoundingClientRect();
        var nx = (parallaxEvent.clientX - (r.left + r.width / 2)) / (r.width * 0.9);
        var ny = (parallaxEvent.clientY - (r.top + r.height * 0.4)) / (r.height * 0.9);
        jarvisRobot.style.setProperty("--px", Math.max(-1, Math.min(1, nx)).toFixed(3));
        jarvisRobot.style.setProperty("--py", Math.max(-1, Math.min(1, ny)).toFixed(3));
      };
      jarvisStage.addEventListener("pointermove", function (e) {
        if (e.pointerType === "touch") return;
        parallaxEvent = e;
        if (!parallaxFrame) parallaxFrame = window.requestAnimationFrame(applyParallax);
      });
      jarvisStage.addEventListener("pointerleave", function () {
        if (parallaxFrame) { window.cancelAnimationFrame(parallaxFrame); parallaxFrame = 0; }
        jarvisRobot.style.setProperty("--px", "0");
        jarvisRobot.style.setProperty("--py", "0");
      });
    }

    // Pause the idle loops while the section is off screen
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { jarvisSection.classList.toggle("jarvis-live", entry.isIntersecting); });
      }, { threshold: 0.05 }).observe(jarvisSection);
    } else {
      jarvisSection.classList.add("jarvis-live");
    }
  }

  // Expertise cards: pause the idle loops off screen, and tilt a card a few degrees toward the pointer
  var expertiseSection = document.querySelector(".expertise-section");
  if (expertiseSection) {
    var expertiseCards = Array.prototype.slice.call(expertiseSection.querySelectorAll(".expertise-card"));

    if ("IntersectionObserver" in window) {
      var expertiseObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { entry.target.classList.toggle("is-live", entry.isIntersecting); });
      }, { threshold: 0.05 });
      expertiseObserver.observe(expertiseSection);
      expertiseCards.forEach(function (card) { expertiseObserver.observe(card); });
    } else {
      expertiseSection.classList.add("is-live");
      expertiseCards.forEach(function (card) { card.classList.add("is-live"); });
    }

    // Mouse and pen only, and not when reduced motion is requested.
    // The card's wrapper is the measuring box: it stays put while the card lifts and tilts,
    // so the pointer position (and the hover itself) cannot feed back and flicker at the edges.
    if (!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
      var MAX_TILT = 5; // degrees
      expertiseCards.forEach(function (card) {
        var slot = card.parentNode;
        var tiltFrame = 0;
        var tiltEvent = null;
        var applyTilt = function () {
          tiltFrame = 0;
          var r = slot.getBoundingClientRect();
          var nx = (tiltEvent.clientX - r.left) / r.width - 0.5;
          var ny = (tiltEvent.clientY - r.top) / r.height - 0.5;
          card.style.setProperty("--tilt-y", (nx * 2 * MAX_TILT).toFixed(2) + "deg");
          card.style.setProperty("--tilt-x", (-ny * 2 * MAX_TILT).toFixed(2) + "deg");
        };
        slot.addEventListener("pointermove", function (e) {
          if (e.pointerType === "touch") return;
          tiltEvent = e;
          card.classList.add("is-tilting");
          if (!tiltFrame) tiltFrame = window.requestAnimationFrame(applyTilt);
        });
        slot.addEventListener("pointerleave", function () {
          if (tiltFrame) { window.cancelAnimationFrame(tiltFrame); tiltFrame = 0; }
          card.classList.remove("is-tilting");
          card.style.removeProperty("--tilt-x");
          card.style.removeProperty("--tilt-y");
        });
      });
    }
  }

  // Tools: decorative energy streaks around each panel's ring (the tool names are plain text without JavaScript)
  Array.prototype.forEach.call(document.querySelectorAll("#tools .te-energy"), function (ring) {
    for (var i = 0; i < 90; i++) {
      var streak = document.createElement("i");
      streak.style.setProperty("--angle", (i * 137.508) + "deg");
      streak.style.setProperty("--length", (15 + (i * 17 % 65)) + "px");
      streak.style.setProperty("--radius", (150 + (i * 13 % 65)) + "px");
      streak.style.setProperty("--opacity", String(0.25 + (i % 7) / 10));
      ring.appendChild(streak);
    }
  });

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Highlight the current section in the navigation
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[href^='#']"));
  var sections = navAnchors
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navAnchors.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();
