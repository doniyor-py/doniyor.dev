(function initScrollReveal() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduce.matches) return;

  document.documentElement.classList.add("js-motion");

  const sections = document.querySelectorAll(".section-reveal");
  if (!("IntersectionObserver" in window)) {
    sections.forEach((el) => el.classList.add("section-reveal--visible"));
    return;
  }

  if (!sections.length) return;

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("section-reveal--visible");
        obs.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
  );

  sections.forEach((el) => io.observe(el));
})();

const toTopBtn = document.getElementById("toTopBtn");

const toggleToTopButton = () => {
  if (!toTopBtn) return;
  if (window.scrollY > 350) {
    toTopBtn.classList.add("show");
    return;
  }
  toTopBtn.classList.remove("show");
};

window.addEventListener("scroll", toggleToTopButton);

if (toTopBtn) {
  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("portfolio-contact-form");
  if (!form) return;

  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set("contact", "sent");
  nextUrl.hash = "contact-form";
  const nextInput = document.createElement("input");
  nextInput.type = "hidden";
  nextInput.name = "_next";
  nextInput.value = nextUrl.toString();
  form.appendChild(nextInput);

  const params = new URLSearchParams(window.location.search);
  if (params.get("contact") === "sent") {
    const banner = document.getElementById("contact-form-success");
    if (banner) {
      banner.hidden = false;
      banner.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
});
