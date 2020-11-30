import {setupModal} from '../utils/modal';
import {initRecipesSlider} from './slider/init-recipes-slider';

const modals = document.querySelectorAll('.modal');
const modalRecipes = document.querySelector('.modal--recipes');
const modalRecipesBtns = document.querySelectorAll('[data-modal="recipes"]');

// аргументы setupModal(modal, closeCallback, modalBtns, openCallback, noPrevDefault, preventScrollLock)
// возможна инициализация только с первыми аргументом,
// если вам нужно открывать модалку в другом месте под какими-нибудь условиями

const initModals = () => {
  // фикс для редких случаев, когда модалка появляется при загрузке страницы
  window.addEventListener('load', () => {
    if (modals.length) {
      modals.forEach((el) => {
        setTimeout(() => {
          el.classList.remove('modal--preload');
        }, 100);
      });
    }
  });

  if (modalRecipes && modalRecipesBtns.length) {
    setupModal(modalRecipes, false, modalRecipesBtns, initRecipesSlider, false);
  }
};

export {initModals};
