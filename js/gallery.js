const galleryItems = Array.from(document.querySelectorAll("[data-lightbox]"));
const lightbox = document.querySelector("[data-lightbox-modal]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const lightboxPrev = document.querySelector("[data-lightbox-prev]");
const lightboxNext = document.querySelector("[data-lightbox-next]");
let activeGalleryIndex = 0;

const setLightboxImage = (index) => {
  if (!lightboxImage || galleryItems.length === 0) return;
  activeGalleryIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[activeGalleryIndex];
  const image = item.querySelector("img");
  lightboxImage.setAttribute("src", item.dataset.lightbox || "");
  lightboxImage.setAttribute("alt", image?.getAttribute("alt") || "Snorkeling Gili gallery image");
};

const openLightbox = (index) => {
  if (!lightbox) return;
  setLightboxImage(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-menu-open");
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-menu-open");
};

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index));
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxPrev?.addEventListener("click", () => setLightboxImage(activeGalleryIndex - 1));
lightboxNext?.addEventListener("click", () => setLightboxImage(activeGalleryIndex + 1));

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox?.classList.contains("is-open")) return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    setLightboxImage(activeGalleryIndex - 1);
  }

  if (event.key === "ArrowRight") {
    setLightboxImage(activeGalleryIndex + 1);
  }
});
