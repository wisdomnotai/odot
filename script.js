document.documentElement.classList.add("js");

const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((el) => io.observe(el));
}

// Testimonial slider
const slides = [...document.querySelectorAll(".slide")];
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

if (slides.length) {
  let i = 0;
  const show = (n) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((slide, idx) => slide.classList.toggle("on", idx === i));
  };

  nextButton?.addEventListener("click", () => show(i + 1));
  prevButton?.addEventListener("click", () => show(i - 1));
  setInterval(() => show(i + 1), 6000);
}

// Only one FAQ open at a time
const faqs = document.querySelectorAll("details");
faqs.forEach((d) => d.addEventListener("toggle", () => {
  if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
}));