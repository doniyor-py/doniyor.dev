// Progressive enhancement only — every page works without this file.
(function () {
  var doc = document.documentElement;
  var header = document.querySelector(".site-header");
  var mq = function (q) { return window.matchMedia(q).matches; };

  // Theme toggle. The inline <head> script has already applied the saved/system theme.
  var toggle = document.querySelector(".theme-toggle");
  function label() {
    if (toggle) toggle.setAttribute("aria-label", doc.dataset.theme === "light" ? "Switch to dark theme" : "Switch to light theme");
  }
  label();
  if (toggle) toggle.addEventListener("click", function () {
    var next = doc.dataset.theme === "light" ? "dark" : "light";
    doc.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    document.querySelector('meta[name="color-scheme"]').content = next;
    document.querySelector('meta[name="theme-color"]').content = next === "light" ? "#f5f5f0" : "#151312";
    label();
  });

  // Mobile menu.
  var navBtn = document.querySelector(".nav-toggle");
  function setOpen(open) {
    header.classList.toggle("is-open", open);
    navBtn.setAttribute("aria-expanded", open);
    navBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (navBtn) {
    navBtn.addEventListener("click", function () { setOpen(!header.classList.contains("is-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  // Header background + scroll progress bar.
  var ticking = false;
  function onScroll() {
    var max = doc.scrollHeight - window.innerHeight;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    header.style.setProperty("--progress", max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    ticking = false;
  }
  if (header) {
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
  }

  // Cursor glow + card spotlight: desktop, fine pointer, motion allowed.
  if (mq("(pointer: fine) and (min-width: 64rem)") && !mq("(prefers-reduced-motion: reduce)")) {
    var glow = document.createElement("div");
    glow.className = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);
    var x = 0, y = 0, queued = false;
    document.addEventListener("pointermove", function (e) {
      x = e.clientX; y = e.clientY;
      var card = e.target.closest && e.target.closest(".pcard");
      if (card) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", x - r.left + "px");
        card.style.setProperty("--my", y - r.top + "px");
      }
      if (!queued) {
        queued = true;
        requestAnimationFrame(function () {
          glow.style.transform = "translate3d(" + (x - 350) + "px," + (y - 350) + "px,0)";
          glow.classList.add("is-on");
          queued = false;
        });
      }
    }, { passive: true });
    doc.addEventListener("mouseleave", function () { glow.classList.remove("is-on"); });
  }

  // /contact/: turn the spelled-out email into a mailto link and copy button,
  // so the address never appears as a plain mailto in the HTML source.
  var holder = document.querySelector("[data-email-user]");
  if (!holder) return;
  var address = holder.getAttribute("data-email-user") + "@" + holder.getAttribute("data-email-domain");
  var link = document.createElement("a");
  link.href = "mailto:" + address;
  link.textContent = address;
  holder.textContent = "";
  holder.appendChild(link);

  var copyBtn = document.getElementById("copy-email");
  var status = document.getElementById("copy-status");
  if (!copyBtn || !navigator.clipboard) return;
  copyBtn.hidden = false;
  copyBtn.addEventListener("click", function () {
    navigator.clipboard.writeText(address).then(
      function () { if (status) status.textContent = "Email address copied."; },
      function () { if (status) status.textContent = "Couldn't copy — please select the address above."; }
    );
  });
})();
