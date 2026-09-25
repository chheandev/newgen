// ===============================
// NEW GEN — MAIN JAVASCRIPT
// ===============================


// LOADING SCREEN
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hide");
  }, 1700);
});


// MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");

  if (mobileMenu.classList.contains("show")) {
    menuBtn.textContent = "×";
  } else {
    menuBtn.textContent = "☰";
  }
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
    menuBtn.textContent = "☰";
  });
});


// DARK MODE
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("newgen-theme", "dark");
  } else {
    localStorage.setItem("newgen-theme", "light");
  }
});

if (localStorage.getItem("newgen-theme") === "dark") {
  document.body.classList.add("dark");
}


// SCROLL REVEAL
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});


// ALBUM FILTERS
const filters = document.querySelectorAll(".filter");
const albumCards = document.querySelectorAll(".album-card");

filters.forEach(filter => {

  filter.addEventListener("click", () => {

    filters.forEach(item => {
      item.classList.remove("active");
    });

    filter.classList.add("active");

    const selected = filter.dataset.filter;

    albumCards.forEach(card => {

      const category = card.dataset.category;

      if (selected === "all" || category === selected) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }

    });

  });

});


// FULLSCREEN ALBUM VIEWER
const viewer = document.getElementById("viewer");
const viewerImage = document.getElementById("viewerImage");
const viewerClose = document.getElementById("viewerClose");
const viewerPrev = document.getElementById("viewerPrev");
const viewerNext = document.getElementById("viewerNext");
const viewerCounter = document.getElementById("viewerCounter");

const images = [
  "images/photo_2026-09-25_11-03-48.jpg",
  "images/photo_2026-09-25_11-03-54.jpg",
  "images/photo_2026-09-25_11-03-58.jpg",
  "images/photo_2026-09-25_11-03-59.jpg",
  "images/photo_2026-09-25_11-04-01.jpg",
  "images/photo_2026-09-25_11-04-04.jpg"
];

let currentImage = 0;


// OPEN VIEWER
albumCards.forEach((card, index) => {

  card.addEventListener("click", () => {

    currentImage = index;

    viewerImage.src = images[currentImage];

    updateViewerCounter();

    viewer.classList.add("show");

    document.body.style.overflow = "hidden";
  });

});


// UPDATE COUNTER
function updateViewerCounter() {

  const number = String(currentImage + 1).padStart(2, "0");

  viewerCounter.textContent = `${number} / 06`;
}


// NEXT
function nextImage() {

  currentImage++;

  if (currentImage >= images.length) {
    currentImage = 0;
  }

  viewerImage.src = images[currentImage];

  updateViewerCounter();
}


// PREVIOUS
function previousImage() {

  currentImage--;

  if (currentImage < 0) {
    currentImage = images.length - 1;
  }

  viewerImage.src = images[currentImage];

  updateViewerCounter();
}


viewerNext.addEventListener("click", nextImage);

viewerPrev.addEventListener("click", previousImage);


// CLOSE VIEWER
function closeViewer() {

  viewer.classList.remove("show");

  document.body.style.overflow = "";
}

viewerClose.addEventListener("click", closeViewer);


// CLICK BACKGROUND TO CLOSE
viewer.addEventListener("click", event => {

  if (event.target === viewer) {
    closeViewer();
  }

});


// KEYBOARD CONTROLS
document.addEventListener("keydown", event => {

  if (!viewer.classList.contains("show")) return;

  if (event.key === "Escape") {
    closeViewer();
  }

  if (event.key === "ArrowRight") {
    nextImage();
  }

  if (event.key === "ArrowLeft") {
    previousImage();
  }

});


// HERO PARALLAX
const hero = document.querySelector(".hero");
const heroBg = document.querySelector(".hero-bg");

hero.addEventListener("mousemove", event => {

  const x = (event.clientX / window.innerWidth - 0.5) * 12;
  const y = (event.clientY / window.innerHeight - 0.5) * 12;

  heroBg.style.transform =
    `scale(1.04) translate(${x}px, ${y}px)`;

});

hero.addEventListener("mouseleave", () => {

  heroBg.style.transform = "scale(1.04)";

});


// PRELOAD IMAGES
images.forEach(src => {

  const img = new Image();

  img.src = src;

});


// SMOOTH NAVIGATION
document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", event => {

    const target = document.querySelector(
      link.getAttribute("href")
    );

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth"
    });

  });

});
