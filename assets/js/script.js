// Youtube Tutorials
// Animated Clouds Effect - https://www.youtube.com/watch?v=hF-QBhDG-wE

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

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
  // console.log(mouse);  // DELETE THIS
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
    c.beginPath();
    c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  // add update method to particle prototype
  update() {
    // restriction
    const restrictRadius = 30;
    const restrict = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };

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
      // do not shrink circle within restrict radius
      if (this.x - restrict.x < restrictRadius
      && this.x - restrict.x > -restrictRadius
      && this.y - restrict.y < restrictRadius
      && this.y - restrict.y > -restrictRadius) {
        this.size = 5;
      }
      this.size -= 0.5;
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
  for (let i = 0; i < 3000; i += 1) {
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
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // TODO: LINE
  const canvasMaxWidth = screenWidth;
  const canvasMaxHeight = screenHeight;
  const canvasMinWidth = 1;
  const canvasMinHeight = 1;
  const canvasLowerBound = canvasMaxHeight - canvasMinHeight;
  const canvasUpperBound = canvasMinHeight;
  const canvasLeftBound = canvasMinWidth;
  const canvasRightBound = canvasMaxWidth - canvasMinWidth;
  const canvasXRange = canvasMaxWidth - canvasMinWidth + 1;
  const canvasYRange = canvasMaxHeight - canvasMinHeight + 1;
  const canvasXCenter = canvasMaxWidth / 2;
  const canvasYCenter = canvasMaxHeight / 2;
  const gridLines = 30;
  const gridSpacing = canvasXRange / gridLines;

  // ====================CENTER GRIDS==================== //
  c.beginPath();
  c.moveTo(canvasXCenter, canvasLowerBound);
  c.lineTo(canvasXCenter, canvasUpperBound);
  c.moveTo(canvasLeftBound, canvasYCenter);
  c.lineTo(canvasRightBound, canvasYCenter);
  c.strokeStyle = '#ff0';
  c.stroke();
  c.closePath();

  // //====================VERTICAL GRID==================== //
  c.beginPath();
  for (let i = 0; i < gridLines; i += 1) {
    // From left to right, draw vertical grid in upward stroke
    const startXPosition = canvasLeftBound + gridSpacing + gridSpacing * i;
    const startYPosition = canvasLowerBound;
    const endXPosition = canvasLeftBound + gridSpacing + gridSpacing * i;
    const endYPosition = canvasUpperBound;
    c.moveTo(startXPosition, startYPosition);
    c.lineTo(endXPosition, endYPosition);
  }

  // ====================HORIZONTAL GRID==================== //
  // Center horizontal grid
  const hGridLines = canvasYRange / gridSpacing;
  const hGridLinesRange = hGridLines * gridSpacing;
  // horizontal padding for centering
  const offset = (canvasYRange - hGridLinesRange) / 2;

  for (let i = 0; i <= hGridLines; i += 1) {
    const startXPosition = canvasLeftBound;
    const startYPosition = canvasUpperBound + offset + gridSpacing * i;
    const endXPosition = canvasRightBound;
    const endYPosition = canvasUpperBound + offset + gridSpacing * i;
    c.moveTo(startXPosition, startYPosition);
    c.lineTo(endXPosition, endYPosition);
  }

  c.strokeStyle = '#000000';
  c.stroke();
  c.closePath();


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
