// Testimonial slider: prev/next buttons plus auto-advance.
export function initSlider() {
  const root = document.querySelector("[data-slider]");
  if (!root) return;

  const slides = [...root.querySelectorAll(".slide")];
  let current = 0;

  function show(index) {
    current = (index + slides.length) % slides.length; // wraps around
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
  }

  document.querySelector("[data-slider-next]").addEventListener("click", () => show(current + 1));
  document.querySelector("[data-slider-prev]").addEventListener("click", () => show(current - 1));
  setInterval(() => show(current + 1), 6000);
}