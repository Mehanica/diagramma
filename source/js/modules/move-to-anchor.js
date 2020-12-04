import MoveTo from '../vendor/moveto.js';
import {closeMenu} from './init-menu.js';


export default () => {
  const burgerBtn = document.querySelector('.header__toggle');

  const triggerList = document.querySelectorAll('.js-trigger');
  if (!triggerList.length) {
    return;
  }

  triggerList.forEach(function (trigger) {
    const moveTo = new MoveTo({
      tolerance: 100,
    });
    trigger.addEventListener('click', () => {
      if (burgerBtn) {
        if (burgerBtn.ariaPressed === 'true') {
          console.log('hi');
          closeMenu();
          moveTo.registerTrigger(trigger);
        }
      }
    });
    moveTo.registerTrigger(trigger);
  });
};

