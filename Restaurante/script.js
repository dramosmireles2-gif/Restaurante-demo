const revealItems = document.querySelectorAll(
  ".feature-strip article, .menu-card, .story-panel, .story-stats article, .experience-card, .gallery-card, .detail-card, .photo-card, .reservation-section"
);

revealItems.forEach((item) => item.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item) => observer.observe(item));
