document.documentElement.classList.add("js");

// Reveal sections as they scroll into view
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Testimonial slider
const slides = [...document.querySelectorAll(".slide")];
let i = 0;
const show = (n) => {
  i = (n + slides.length) % slides.length;
  slides.forEach((s, idx) => s.classList.toggle("on", idx === i));
};
document.getElementById("next").addEventListener("click", () => show(i + 1));
document.getElementById("prev").addEventListener("click", () => show(i - 1));
setInterval(() => show(i + 1), 6000);

// Only one FAQ open at a time
const faqs = document.querySelectorAll("details");
faqs.forEach((d) => d.addEventListener("toggle", () => {
  if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
}));