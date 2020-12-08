import MoveTo from '../../vendor/moveto.js';

const sliderElementSelector = '.js-recipes-slider';
const sliderElement = document.querySelector(sliderElementSelector);
const breakpoint = window.matchMedia('(max-width: 767px)');
const modal = document.querySelector('.modal--recipes');
let btnNext;
let btnPrev;
let myNewSwiper;
let autoHeight;

// eslint-disable-next-line no-undef
const initSwiper = (slider) => new Swiper(slider, {
  slidesPerView: 1,
  speed: 600,
  effect: 'fade',
  observer: true,
  observeParents: true,
  autoHeight: autoHeight,
  loop: true,
  navigation: {
    nextEl: btnNext,
    prevEl: btnPrev,
  },
});

const moveTo = new MoveTo({
  tolerance: 4,
  container: modal,
});

const initRecipesSlider = (index) => {
  if (!sliderElement) {
    return;
  }

  if (breakpoint.matches) {
    autoHeight = true;
  }

  btnNext = sliderElement.closest('.modal__content').querySelector('.swiper-button-next');
  btnPrev = sliderElement.closest('.modal__content').querySelector('.swiper-button-prev');

  if (myNewSwiper) {
    myNewSwiper.destroy(true, true);
  }

  myNewSwiper = initSwiper(sliderElement);

  myNewSwiper.on('slideChange', () => {
    if (document.activeElement.closest(sliderElementSelector)) {
      document.activeElement.blur();
    }

    if (breakpoint.matches) {
      moveTo.move(sliderElement);
    }
  });

  if (index) {
    myNewSwiper.slideToLoop(+index, 0);
  }
};

export {initRecipesSlider};


