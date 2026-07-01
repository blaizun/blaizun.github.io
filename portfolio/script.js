// Back-home glass hover effect (matches the rest of the site)
const backHomeBtn = document.getElementById("backHomeBtn");
const glassOverlay = document.getElementById("glassOverlay");

backHomeBtn?.addEventListener("mouseenter", () => {
    glassOverlay.classList.add("active");
});
backHomeBtn?.addEventListener("mouseleave", () => {
    glassOverlay.classList.remove("active");
});

// Scroll-reveal for gallery items
const items = Array.from(document.querySelectorAll(".portfolio-item"));

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
);

items.forEach((item) => revealObserver.observe(item));

// Safety net: guarantee the gallery is visible even if the observer
// never fires (e.g. slow first paint, reduced-motion setups)
setTimeout(() => {
    items.forEach((item) => item.classList.add("in-view"));
}, 1000);

// Category filtering
const filterButtons = document.querySelectorAll(".filter-pill");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        items.forEach((item) => {
            const matches = filter === "all" || item.dataset.category === filter;
            item.classList.toggle("is-hidden", !matches);

            // Re-trigger the reveal animation for items coming back into view
            if (matches && !item.classList.contains("in-view")) {
                revealObserver.observe(item);
            }
        });
    });
});

// Lightbox — only opens for items that contain a real <img>
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

items.forEach((item) => {
    item.addEventListener("click", () => {
        const img = item.querySelector("img");
        if (!img) return;

        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modal.classList.add("active");
    });
});

function closeModal() {
    modal.classList.remove("active");
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});
