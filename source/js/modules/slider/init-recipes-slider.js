const sliderElementSelector = '.js-recipes-slider';
const sliderElement = document.querySelector(sliderElementSelector);
let btnNext;
let btnPrev;
let myNewSwiper;

// eslint-disable-next-line no-undef
const initSwiper = (slider) => new Swiper(slider, {
  slidesPerView: 1,
  speed: 600,
  effect: 'fade',
  observer: true,
  observeParents: true,
  autoHeight: true,
  navigation: {
    nextEl: btnNext,
    prevEl: btnPrev,
  },
});

const initRecipesSlider = (eventTrigger) => {

  if (!sliderElement) {
    return;
  }

  btnNext = sliderElement.closest('.modal__content').querySelector('.swiper-button-next');
  btnPrev = sliderElement.closest('.modal__content').querySelector('.swiper-button-prev');
  myNewSwiper = initSwiper(sliderElement);

  myNewSwiper.on('slideChange', () => {
    if (document.activeElement.closest(sliderElementSelector)) {
      document.activeElement.blur();
    }
  });

  if (eventTrigger) {
    myNewSwiper.slideTo(eventTrigger.dataset.slider, 0);
  }
};

export {initRecipesSlider};


