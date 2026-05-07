gsap.registerPlugin(ScrollTrigger);

/* =========================
   HERO ELEMENTS
========================= */
const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");
const heroImage = document.getElementById("hero-image");
const cloud = document.getElementById("cloud-mask");
const logo = document.querySelector(".hero-logo");
const buyButton = document.querySelector(".buy-button");

const heroTitle = document.querySelector(".hero-title");
const heroSubtitle = document.querySelector(".hero-subtitle");
const heroCTA = document.querySelector(".hero-cta");
const heroCenterCopy = document.querySelector(".hero-center-copy");

/* =========================
   RAIL TITLES -> SPLIT CHARS
========================= */
document.querySelectorAll(".rail-title").forEach((title) => {
  const word = (title.dataset.word || title.textContent || "").trim();
  title.innerHTML = "";

  [...word].forEach((char) => {
    const span = document.createElement("span");
    span.classList.add("fx-char");
    span.textContent = char === " " ? "\u00A0" : char;
    title.appendChild(span);
  });

  const chars = title.querySelectorAll(".fx-char");

  const wordWeightsMap = {
    "air": [900, 900, 900],
    "force": [900, 900, 900, 900, 900],
    "edition": [800, 800, 800, 800, 700, 700, 700, 700],
    "limited": [600, 600, 600, 600, 600, 600, 600]
  };

  const weights = wordWeightsMap[word.toLowerCase()] || [];

  chars.forEach((char, index) => {
    const weight = weights[index] || 700;
    char.style.fontWeight = weight;

    if (weight >= 800) {
      char.style.transform = "scaleY(1.02)";
    } else if (weight <= 500) {
      char.style.transform = "scaleY(0.96)";
    } else {
      char.style.transform = "scaleY(1)";
    }
  });
});
/* =========================
   HERO IMAGE SEQUENCE
========================= */
const frameCount = 400;

const imageSequence = {
  frame: 0
};

const images = [];

function currentFrame(index) {
  return `./assets/img/frame_${String(index + 1).padStart(4, "0")}.jpg`;
}

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawImageCover(img) {
  const canvasRatio = canvas.width / canvas.height;
  const imageRatio = img.width / img.height;

  let drawWidth;
  let drawHeight;
  let offsetX;
  let offsetY;

  if (imageRatio > canvasRatio) {
    drawHeight = canvas.height;
    drawWidth = img.width * (canvas.height / img.height);
    offsetX = (canvas.width - drawWidth) / 2;
    offsetY = 0;
  } else {
    drawWidth = canvas.width;
    drawHeight = img.height * (canvas.width / img.width);
    offsetX = 0;
    offsetY = (canvas.height - drawHeight) / 2;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

function render() {
  const img = images[imageSequence.frame];
  if (!img || !img.complete) return;
  drawImageCover(img);
}

setCanvasSize();

window.addEventListener("resize", () => {
  setCanvasSize();
  render();
  ScrollTrigger.refresh();
});

images[0].onload = render;

/* =========================
   CHEVRONS BLINK
========================= */
gsap.to(".scroll-indicator", {
  opacity: 0.45,
  duration: 0.9,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});

/* =========================
   HERO ENTRANCE
========================= */
gsap.from(heroTitle, {
  y: 40,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from(heroSubtitle, {
  y: 20,
  opacity: 0,
  duration: 0.8,
  delay: 0.2,
  ease: "power3.out"
});

gsap.fromTo(
  heroCTA,
  {
    y: 20,
    opacity: 0
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: 0.4,
    ease: "power3.out"
  }
);

/* =========================
   HERO SCROLL TIMELINE
========================= */
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scroll-container",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.5
  }
});

tl.to(cloud, {
  opacity: 0.7,
  duration: 0.12,
  ease: "none"
}, 0);

tl.fromTo(cloud, {
  scale: 1,
  x: 0,
  y: 0
}, {
  scale: 1.8,
  x: 100,
  y: -50,
  duration: 0.25,
  ease: "power2.out"
}, 0);

tl.to(heroImage, {
  opacity: 0,
  duration: 0.1,
  ease: "none",
  immediateRender: false
}, 0.08);

tl.to(canvas, {
  opacity: 1,
  duration: 0.1,
  ease: "none",
  immediateRender: false
}, 0.08);

tl.to(cloud, {
  opacity: 0,
  duration: 0.05,
  ease: "none",
  immediateRender: false
}, 0.28);

tl.to(logo, {
  opacity: 1,
  y: -20,
  duration: 0.18,
  ease: "none",
  immediateRender: false
}, 0.08);

tl.to(heroTitle, {
  opacity: 0,
  y: -30,
  duration: 0.12,
  ease: "none",
  immediateRender: false
}, 0.08);

tl.to(heroSubtitle, {
  opacity: 0,
  y: -20,
  duration: 0.12,
  ease: "none",
  immediateRender: false
}, 0.08);

tl.to(heroCTA, {
  opacity: 0,
  y: 20,
  duration: 0.12,
  ease: "none",
  immediateRender: false
}, 0.08);

tl.to(heroCenterCopy, {
  opacity: 0,
  y: 20,
  duration: 0.12,
  ease: "none",
  immediateRender: false
}, 0.08);

tl.to(buyButton, {
  opacity: 0,
  y: 20,
  duration: 0.12,
  ease: "none",
  immediateRender: false
}, 0.08);

tl.to(imageSequence, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  duration: 0.72,
  onUpdate: render
}, 0.18);

/* =========================
   TAGLINES RAILS - SLOWER
========================= */
function setupRails() {
  gsap.utils.toArray(".rail").forEach((rail) => {
    const track = rail.querySelector(".rail-track");
    const firstGroup = rail.querySelector(".rail-group");

    if (!track || !firstGroup) return;

    const groupWidth = firstGroup.offsetWidth;
    const direction = rail.classList.contains("rail-left") ? -1 : 1;

    const fromX = direction === 1 ? 0 : -groupWidth * 0.35;
    const toX = direction === 1 ? -groupWidth * 0.35 : 0;

    gsap.set(track, { x: fromX });

    gsap.to(track, {
      x: toX,
      ease: "none",
      scrollTrigger: {
        trigger: ".taglines-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2
      }
    });
  });
}

gsap.utils.toArray(".product-card").forEach((card, index) => {
  gsap.from(card, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    delay: index * 0.08,
    ease: "power3.out",
    scrollTrigger: {
      trigger: card,
      start: "top 85%"
    }
  });
});

setupRails();