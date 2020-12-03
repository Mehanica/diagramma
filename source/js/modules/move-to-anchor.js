const mainMenu = document.querySelector('.header__menu-wrapper');
const headerMenuToggle = document.querySelector('.header__toggle');

const burgerBtn = document.querySelector('.header__toggle');

export default () => {
  const triggerList = document.querySelectorAll('.js-trigger');
  if (!triggerList.length) {
    return;
  }

  document.querySelector('body').addEventListener('click', function (evt) {
    if (evt.target.classList.contains('js-trigger')) {
      evt.preventDefault();
      const blockId = evt.target.getAttribute('href');
      if (burgerBtn) {
        if (burgerBtn.ariaPressed === 'true') {

          if (mainMenu && mainMenu.classList.contains('header__menu-wrapper--active')) {
            headerMenuToggle.classList.remove('header__toggle--active');
            headerMenuToggle.ariaPressed = 'false';
            mainMenu.classList.remove('header__menu-wrapper--active');

            window.enableBodyScroll(mainMenu);
          }

          document.querySelector(blockId).scrollIntoView({block: 'start', behavior: 'smooth'});
        } else {
          document.querySelector(blockId).scrollIntoView({block: 'center', behavior: 'smooth'});
        }
      }
    }
  });
};

