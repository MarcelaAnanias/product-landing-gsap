gsap.registerPlugin(ScrollTrigger);

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
});

images[0].onload = render;

/* Piscar dos 3 chevrons */
gsap.to(".scroll-indicator", {
  opacity: 0.45,
  duration: 0.9,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});

/* Animações de entrada */
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

gsap.fromTo(heroCTA,
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

/* Timeline principal do scroll */
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
  ease: "none"
}, 0.08);

tl.to(canvas, {
  opacity: 1,
  duration: 0.1,
  ease: "none"
}, 0.08);

tl.to(cloud, {
  opacity: 0,
  duration: 0.05,
  ease: "none"
}, 0.28);

tl.to(logo, {
  opacity: 0,
  y: -20,
  duration: 0.18,
  ease: "none"
}, 0.08);

tl.to(heroTitle, {
  opacity: 0,
  y: -30,
  duration: 0.12,
  ease: "none"
}, 0.08);

tl.to(heroSubtitle, {
  opacity: 0,
  y: -20,
  duration: 0.12,
  ease: "none"
}, 0.08);

tl.to(heroCTA, {
  opacity: 0,
  y: 20,
  duration: 0.12,
  ease: "none",
}, 0.08);

tl.to(heroCenterCopy, {
  opacity: 0,
  y: 20,
  duration: 0.12,
  ease: "none"
}, 0.08);

tl.to(buyButton, {
  opacity: 0,
  y: 20,
  duration: 0.12,
  ease: "none"
}, 0.08);

tl.to(imageSequence, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  duration: 0.72,
  onUpdate: render
}, 0.18);