/* Анимация настраивается в разметке для каждого элемента через задание ему data-атрибутов:

  - movement -- число, которое передастся аргументом в функцию transform;
  - rotate -- булево значение, будет ли элемент вращаться (если не задано -- false);
  - rotate-acw -- булево значение, вращение против часовой стрелки (при скролле вниз) (если не задано -- false);
  - only-rotate -- булево значение, будет ли элемент двигаться, или только вращаться (если не задано -- false);
  - rotate-divisor -- число, модификатор значения movement для вращения (значение по умолчанию задано в переменной DEFAULT_ROTATE_DIVISOR); */

const parallaxNodes = document.querySelectorAll('.js-parallax');
const DEFAULT_ROTATE_DIVISOR = 4;

let windowHeight;

const calculateParallax = (el, movement, offsetTop, rotate, rotateACW, rotateDivisor, onlyRotate) => {
  const part = windowHeight / movement;
  let currentMovement;

  if (offsetTop >= windowHeight - part) {
    el.style.transform = null;
  } else {
    const currentRotation = Math.trunc(Math.abs(offsetTop - windowHeight) / part);
    if (onlyRotate) {
      currentMovement = 0;
    } else {
      currentMovement = Math.trunc(Math.abs(offsetTop - windowHeight) / part);
    }

    if (rotate) {
      if (!rotateACW) {
        el.style.transform = `translateY(${currentMovement}px) rotate(${currentRotation / rotateDivisor}deg)`;
      } else {
        el.style.transform = `translateY(${currentMovement}px) rotate(-${currentRotation / rotateDivisor}deg)`;
      }
    } else {
      el.style.transform = `translateY(${currentMovement}px)`;
    }
  }
};

const initParallax = () => {
  windowHeight = window.innerHeight;

  parallaxNodes.forEach((el) => {
    const offsetTop = el.getBoundingClientRect().top;

    const movement = +el.dataset.movement;
    const rotate = Boolean(el.dataset.rotate);
    const rotateACW = Boolean(el.dataset.rotateAcw);
    const onlyRotate = Boolean(el.dataset.onlyRotate);
    let rotateDivisor;

    if (el.dataset.rotateDivisor) {
      rotateDivisor = +el.dataset.rotateDivisor;
    } else {
      rotateDivisor = DEFAULT_ROTATE_DIVISOR;
    }

    if (offsetTop < windowHeight && offsetTop >= 0) {
      calculateParallax(el, movement, offsetTop, rotate, rotateACW, rotateDivisor, onlyRotate);
    }
  });
};

const backgroundParallax = () => {
  if (parallaxNodes.length) {
    initParallax();
    window.addEventListener('scroll', initParallax);
    window.addEventListener('orientationchange', initParallax);
  }
};

export {backgroundParallax};
