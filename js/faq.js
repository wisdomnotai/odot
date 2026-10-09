// Keeps only one FAQ answer open at a time.
export function initFaq() {
  const items = document.querySelectorAll("details");
  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      items.forEach((other) => { if (other !== item) other.open = false; });
    });
  });
}