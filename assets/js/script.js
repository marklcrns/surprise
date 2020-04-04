
// Youtube Tutorials
// Animated Clouds Effect - https://www.youtube.com/watch?v=hF-QBhDG-wE

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// adjust canvas to window height and width
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
canvas.width = screenWidth;
canvas.height = screenHeight;

let particleArray = [];
const colors = [
  'rgba(255, 255, 255, 0.7)',
  'rgba(0, 120, 255, 0.5)',
  'rgba(0, 180, 255, 0.7)',
  'rgba(200, 100, 100, 0.6)',
];

const maxSize = 20;
const minSize = 0;
const mouseRadius = 50;

// mouse position
const mouse = {
  x: null,
  y: null,
};
window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});
// create constructor function for particle
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  // add draw method to particle prototype
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // add update method to particle prototype
  update() {
    if (this.x + this.size * 2 > canvas.width
      || this.x - this.size * 2 < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y + this.size * 2 > canvas.height
      || this.y - this.size * 2 < 0) {
      this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    // mouse interactivity
    if (mouse.x - this.x < mouseRadius
      && mouse.x - this.x > -mouseRadius
      && mouse.y - this.y < mouseRadius
      && mouse.y - this.y > -mouseRadius) {
      if (this.size < maxSize) {
        this.size += 3;
      }
    } else if (this.size > minSize) {
      this.size -= 0.05;
    }
    if (this.size < 0) {
      this.size = 0;
    }
    this.draw();
  }
}

// create particle array
function init() {
  particleArray = [];
  for (let i = 0; i < 2000; i += 1) {
    const size = 0;
    // generate random particle location
    const x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
    const y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
    // generate random particle direction
    const directionX = (Math.random() * 0.2) - 0.1;
    const directionY = (Math.random() * 0.2) - 0.1;
    // get random colors from colors dictionary
    const color = colors[Math.floor(Math.random() * colors.length)];

    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}
// animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < particleArray.length; i += 1) {
    particleArray[i].update();
  }
}

init();
animate();

// resize canvas on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// remove mouse position periodically for when to lose focus
setInterval(() => {
  mouse.x = undefined;
  mouse.y = undefined;
}, 1000);
