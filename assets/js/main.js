/* =========================================================
   Lemuel Ajewole - Portfolio
   1. Helpers   2. Theme   3. Mobile menu   4. Scroll progress + to-top
   5. Active nav   6. Reveal on scroll   7. Hero (spotlight + typed code)
   8. Project card tilt   9. Contact form   10. Footer year
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. Helpers ---------- */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var root = document.documentElement;

  /* ---------- 2. Theme (saved, defaults to system preference) ---------- */
  var themeBtn = $("#themeBtn");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (!themeBtn) return;
    var next = theme === "dark" ? "light" : "dark";
    themeBtn.setAttribute("aria-label", "Switch to " + next + " theme");
    $("span", themeBtn).textContent = (next === "light" ? "Light" : "Dark") + " theme";
    $("i", themeBtn).className = "bi " + (next === "light" ? "bi-sun" : "bi-moon-stars");
  }

  applyTheme(root.getAttribute("data-theme") || "dark");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked: ignore */ }
    });
  }

  /* ---------- 3. Mobile menu ---------- */
  var menuBtn = $("#menuBtn");
  var scrim = $("#scrim");
  var sidebar = $("#sidebar");

  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    $("i", menuBtn).className = "bi " + (open ? "bi-x-lg" : "bi-list");
  }

  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", function () {
      setMenu(!document.body.classList.contains("menu-open"));
    });
    if (scrim) scrim.addEventListener("click", function () { setMenu(false); });
    $$(".nav a", sidebar).forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1200) setMenu(false);
    });
  }

  /* ---------- 4. Scroll progress + back-to-top ---------- */
  var progressBar = $("#progressBar");
  var toTop = $("#toTop");
  var ticking = false;

  function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var y = window.scrollY || window.pageYOffset;
    if (progressBar) progressBar.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
    if (toTop) toTop.classList.toggle("show", y > 600);
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- 5. Active nav link ---------- */
  var navLinks = $$(".nav a");
  var sections = $$("main section[id]");

  function setActive(id) {
    navLinks.forEach(function (a) {
      var on = a.getAttribute("href") === "#" + id;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- 6. Reveal on scroll ---------- */
  var revealEls = $$("[data-reveal]");

  // Stagger siblings that share a parent (resets every 4 items)
  var seen = [];
  revealEls.forEach(function (el) {
    var parent = el.parentElement;
    var idx = seen.indexOf(parent);
    if (idx === -1) { seen.push(parent); idx = seen.length - 1; parent.__n = 0; }
    el.style.setProperty("--i", String(parent.__n % 4));
    parent.__n++;
  });
  // Items inside a revealed group (skill chips, process steps) get their own order
  $$(".chips").forEach(function (list) {
    $$("li", list).forEach(function (li, i) { li.style.setProperty("--i", String(i)); });
  });
  $$(".process li").forEach(function (li, i) { li.style.setProperty("--i", String(i)); });

  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- 7. Hero: pointer spotlight + typed code ---------- */
  var hero = $(".hero");
  if (hero && finePointer && !reduceMotion) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", (e.clientX - r.left) + "px");
      hero.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  }

  var codeOut = $("#codeOut");
  if (codeOut && !reduceMotion) {
    // Read the highlighted markup that is already in the HTML, then type it out
    var segments = [];
    Array.prototype.forEach.call(codeOut.childNodes, function (node) {
      var text = node.textContent;
      if (text) segments.push({ cls: node.nodeType === 1 ? node.className : "", text: text });
    });

    codeOut.textContent = "";
    var caret = document.createElement("span");
    caret.className = "caret";
    codeOut.appendChild(caret);

    var si = 0, ci = 0, current = null;
    var typeNext = function () {
      if (si >= segments.length) return;
      var seg = segments[si];
      if (!current) {
        current = document.createElement("span");
        if (seg.cls) current.className = seg.cls;
        codeOut.insertBefore(current, caret);
      }
      var ch = seg.text.charAt(ci);
      current.textContent += ch;
      ci++;
      if (ci >= seg.text.length) { si++; ci = 0; current = null; }
      var delay = ch === "\n" ? 220 : ch === " " ? 12 : 26 + Math.random() * 38;
      window.setTimeout(typeNext, delay);
    };
    window.setTimeout(typeNext, 1100); // wait for the window to slide in
  }

  /* ---------- 8. Project card tilt (mouse only, very small) ---------- */
  if (finePointer && !reduceMotion) {
    $$(".project").forEach(function (card) {
      var img = $(".project-thumb img", card);
      if (!img) return;
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        img.style.setProperty("--rx", (-y * 5).toFixed(2) + "deg");
        img.style.setProperty("--ry", (x * 7).toFixed(2) + "deg");
      });
      card.addEventListener("pointerleave", function () {
        img.style.setProperty("--rx", "0deg");
        img.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* ---------- 9. Contact form (Formspree, no page reload) ---------- */
  var form = $("#contactForm");
  var status = $("#formStatus");
  var submitBtn = $("#submitBtn");

  if (form && status && submitBtn && window.fetch) {
    var label = $(".btn-label", submitBtn);
    var idleText = label.textContent;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";
      status.textContent = "";
      submitBtn.disabled = true;
      label.textContent = "Sending...";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          status.className = "form-status ok";
          status.textContent = "Message sent. Thank you, I will reply soon.";
        } else {
          throw new Error("Request failed");
        }
      }).catch(function () {
        status.className = "form-status err";
        status.textContent = "The message could not be sent. Please email me or message me on WhatsApp.";
      }).then(function () {
        submitBtn.disabled = false;
        label.textContent = idleText;
      });
    });
  }

  /* ---------- 10. Footer year ---------- */
  var year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
