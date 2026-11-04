(function () {
  const root = document.documentElement;
  root.classList.add("js");

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const progress = document.querySelector(".progress");
  const year = document.querySelector("[data-year]");
  const form = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");
  const hero = document.querySelector(".hero");

  if (year) year.textContent = String(new Date().getFullYear());

  const navLinks = nav ? [...nav.querySelectorAll("a[href^='#']")] : [];
  const sections = ["about", "work", "teaching", "education", "skills", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const spyTarget = {
    about: "about",
    work: "work",
    teaching: "teaching",
    education: "education",
    skills: "education",
    contact: "contact",
  };

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    root.classList.remove("nav-open");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      root.classList.toggle("nav-open", !open);
    });

    navLinks.forEach((link) => link.addEventListener("click", closeNav));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });
  }

  function onScroll() {
    const y = window.scrollY;
    if (header && hero) {
      header.classList.toggle("on-light", y > hero.offsetHeight - 72);
    }

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    }

    const mark = y + 140;
    let current = "";
    sections.forEach((section) => {
      if (section.offsetTop <= mark) current = section.id;
    });
    const key = spyTarget[current] || "";
    navLinks.forEach((link) => {
      const active = key && link.getAttribute("href") === `#${key}`;
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealNodes = [...document.querySelectorAll(".reveal")];

  function revealVisible() {
    const line = window.innerHeight * 0.92;
    revealNodes.forEach((node) => {
      if (node.classList.contains("is-in")) return;
      if (node.getBoundingClientRect().top < line) node.classList.add("is-in");
    });
  }

  if (reduce) {
    revealNodes.forEach((node) => node.classList.add("is-in"));
  } else {
    revealVisible();
    window.addEventListener("scroll", revealVisible, { passive: true });
    window.addEventListener("resize", revealVisible);
  }

  document.querySelectorAll("[data-copy]").forEach((button) => {
    const original = button.textContent;
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(button.getAttribute("data-copy"));
        button.textContent = "Copied";
      } catch (error) {
        button.textContent = "Select to copy";
      }
      window.setTimeout(() => {
        button.textContent = original;
      }, 1600);
    });
  });

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();
      const subject = encodeURIComponent(`Note from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:valupadasurevanth@gmail.com?subject=${subject}&body=${body}`;
      if (formStatus) {
        formStatus.textContent = "Your email app should open with this note ready to send.";
      }
    });
  }
})();
