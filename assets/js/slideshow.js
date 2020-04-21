// YouTube image slider video tutorial: https://www.youtube.com/watch?v=KcdBOoK3Pfw&list=PLDyQo7g0_nsXlSfuoBpG5Fgz0Qe3IvWnA&index=3&pbjreload=1
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const messages = document.querySelectorAll('span');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// counter to navigate images
let counter = 1;
let prevMsg;
let currMsg;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)';

// Button Listeners
nextBtn.addEventListener('click', () => {
  // fallback if next btn where clicked rapidly which wont trigger
  // transitionend when it reached the end of carousel loop
  if (counter >= carouselImages.length - 1) return;

  carouselSlide.style.transition = 'transform 0.4s ease-in-out';
  counter += 1;
  carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)';

  // cycle through messages forward
  if (counter === 1) {
    currMsg = 0;
    prevMsg = carouselImages.length - 3;
  } else if (counter === carouselImages.length - 1) {
    currMsg = 0;
    prevMsg = counter - 2;
  } else {
    currMsg = counter - 1;
    prevMsg = counter - 2;
  }

  console.log(currMsg);
  console.log(prevMsg);
  console.log('c:' + counter + '\n');
  messages[currMsg].style.visibility = 'visible';
  messages[currMsg].style.opacity = '1';
  messages[prevMsg].style.visibility = 'hidden';
  messages[prevMsg].style.opacity = '0';
});

prevBtn.addEventListener('click', () => {
  // fallback if next btn where clicked rapidly which wont trigger
  // transitionend when it reached the end of carousel loop
  if (counter <= 0) return;

  carouselSlide.style.transition = 'transform 0.4s ease-in-out';
  counter -= 1;
  carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)';

  // cycle through messages backward
  if (counter === 0) {
    currMsg = carouselImages.length - 3;
    prevMsg = 0;
  } else if (counter === carouselImages.length - 1) {
    currMsg = carouselImages.length - 3;
    prevMsg = 0;
  } else {
    currMsg = counter - 1 ;
    prevMsg = counter;
  }

  console.log(currMsg);
  console.log(prevMsg);
  console.log('c:' + counter + '\n');
  messages[currMsg].style.visibility = 'visible';
  messages[currMsg].style.opacity = '1';
  messages[prevMsg].style.visibility = 'hidden';
  messages[prevMsg].style.opacity = '0';
});

carouselSlide.addEventListener('transitionend', () => {
  if (carouselImages[counter].id === 'last-clone') {
    carouselSlide.style.transition = 'none';
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)';
  }

  if (carouselImages[counter].id === 'first-clone') {
    carouselSlide.style.transition = 'none';
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)';
  }
});
