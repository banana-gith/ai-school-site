const header = document.querySelector(".site-header");

const setHeaderState = () => {
  header?.setAttribute("data-elevated", window.scrollY > 10 ? "true" : "false");
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const gallery = document.querySelector("[data-gallery]");
const dotsRoot = document.querySelector("[data-gallery-dots]");
const prevButton = document.querySelector("[data-gallery-prev]");
const nextButton = document.querySelector("[data-gallery-next]");

if (gallery && dotsRoot) {
  const cards = Array.from(gallery.querySelectorAll(".case-card"));
  const dots = cards.map((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `事例${index + 1}へ移動`);
    button.addEventListener("click", () => {
      gallery.scrollTo({ left: cards[index].offsetLeft - gallery.offsetLeft, behavior: "smooth" });
      dots.forEach((dot, dotIndex) => {
        dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
      });
    });
    dotsRoot.appendChild(button);
    return button;
  });

  const setActiveDot = () => {
    const galleryLeft = gallery.getBoundingClientRect().left;
    let activeIndex = 0;
    let nearest = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - galleryLeft);
      if (distance < nearest) {
        nearest = distance;
        activeIndex = index;
      }
    });

    dots.forEach((dot, index) => {
      dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
    });
  };

  const moveGallery = (direction) => {
    const cardWidth = cards[0]?.getBoundingClientRect().width || 320;
    gallery.scrollBy({ left: direction * (cardWidth + 18), behavior: "smooth" });
  };

  prevButton?.addEventListener("click", () => moveGallery(-1));
  nextButton?.addEventListener("click", () => moveGallery(1));
  gallery.addEventListener("scroll", setActiveDot, { passive: true });
  window.addEventListener("resize", setActiveDot);
  setActiveDot();
}
