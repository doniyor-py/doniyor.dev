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
