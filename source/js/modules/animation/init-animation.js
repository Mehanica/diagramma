const screens = document.querySelectorAll('[data-animate]');

let elTop;
let windowHeight;

const returnAnimatePoint = (el) => {
  elTop = el.getBoundingClientRect().top;
  windowHeight = window.innerHeight;
  return windowHeight / 1.5 - elTop;
};

const trackingScreenBlock = () => {
  screens.forEach((screen) => {
    if (returnAnimatePoint(screen) > 0 && !screen.classList.contains('show')) {
      screen.classList.add('show');
    }
  });
};

const initAnimation = () => {
  if (screens.length) {
    trackingScreenBlock();
    window.addEventListener('scroll', trackingScreenBlock);
    window.addEventListener('orientationchange', trackingScreenBlock);
  }
};

export {initAnimation};
