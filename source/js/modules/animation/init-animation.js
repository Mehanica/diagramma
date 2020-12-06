const screens = document.querySelectorAll('.animation-group');
const wrapper = document.querySelector('.page-landing');
const heroBlock = document.querySelector('.hero');
const productsBlock = document.querySelector('.products');

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

  window.addEventListener('load', () => {
    wrapper.classList.remove('page-landing--loading');

    if (heroBlock) {
      setTimeout(() => {
        heroBlock.classList.add('show');
      }, 200);
    }

    if (productsBlock) {
      setTimeout(() => {
        productsBlock.classList.add('show');
      }, 300);
    }
  });
};

export {initAnimation};
