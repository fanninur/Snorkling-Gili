const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const revealElements = document.querySelectorAll(".reveal");

const updateHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMenu = () => {
  if (!menu || !menuToggle || !header) return;
  menu.classList.remove("is-open");
  menuToggle.classList.remove("is-open");
  header.classList.remove("is-menu-open");
  document.body.classList.remove("is-menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
};

const toggleMenu = () => {
  if (!menu || !menuToggle || !header) return;
  const isOpen = menu.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", isOpen);
  header.classList.toggle("is-menu-open", isOpen);
  document.body.classList.toggle("is-menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
};

window.addEventListener("scroll", updateHeaderState, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 1100) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

menuToggle?.addEventListener("click", toggleMenu);

menu?.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.closest("a")) {
    closeMenu();
  }
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

updateHeaderState();
