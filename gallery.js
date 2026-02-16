(() => {
  "use strict";

  // ---- Filter buttons ----
  const filterBtns = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".gallery-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      items.forEach((item) => {
        if (filter === "all" || item.dataset.category === filter) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  // ---- Lightbox ----
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  let currentIndex = -1;

  function getVisibleItems() {
    return Array.from(items).filter(
      (item) => !item.classList.contains("hidden")
    );
  }

  function openLightbox(index) {
    const visible = getVisibleItems();
    if (index < 0 || index >= visible.length) return;

    currentIndex = index;
    const item = visible[index];
    const img = item.querySelector("img");
    const caption = item.querySelector(".caption");

    // Use a larger version of the image for the lightbox
    lightboxImg.src = img.src.replace(/w=\d+/, "w=1200").replace(/h=\d+/, "h=900");
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : "";

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  function navigate(direction) {
    const visible = getVisibleItems();
    let next = currentIndex + direction;
    if (next < 0) next = visible.length - 1;
    if (next >= visible.length) next = 0;
    openLightbox(next);
  }

  // Open on click
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const visible = getVisibleItems();
      const index = visible.indexOf(item);
      if (index !== -1) openLightbox(index);
    });
  });

  // Close
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Navigate
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navigate(-1);
  });
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navigate(1);
  });

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
  });
})();
