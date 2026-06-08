const revealTargets = document.querySelectorAll(".reveal, [data-reveal]");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

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

revealTargets.forEach((target) => revealObserver.observe(target));

const setActiveNav = () => {
  const current = sections
    .filter((section) => section.getBoundingClientRect().top < window.innerHeight * 0.38)
    .pop();

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", current && link.hash === `#${current.id}`);
  });
};

setActiveNav();
window.addEventListener("scroll", setActiveNav, { passive: true });
