const header = document.querySelector('.header');
const headerMenuToggle = document.querySelector('.header__toggle');
const mainMenu = document.querySelector('.header__menu-wrapper');
const breakpointLg = window.matchMedia('(min-width:768px)');


const openMenu = () => {
  headerMenuToggle.classList.add('header__toggle--active');
  headerMenuToggle.ariaPressed = 'true';
  mainMenu.classList.add('header__menu-wrapper--active');

  window.disableBodyScroll(mainMenu);

  document.addEventListener('keydown', (evt) => {
    onEscPress(evt);
  });
};

const closeMenu = () => {
  if (mainMenu && mainMenu.classList.contains('header__menu-wrapper--active')) {
    headerMenuToggle.classList.remove('header__toggle--active');
    headerMenuToggle.ariaPressed = 'false';
    mainMenu.classList.remove('header__menu-wrapper--active');

    window.enableBodyScroll(mainMenu);
  }
};

const onEscPress = (evt) => {
  const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

  if (isEscKey && headerMenuToggle.classList.contains('header__toggle--active')) {
    evt.preventDefault();
    closeMenu();
  }
};

const initMenu = () => {
  if (!header) {
    return;
  }

  headerMenuToggle.addEventListener('click', () => {
    document.activeElement.blur();

    if (headerMenuToggle.ariaPressed === 'true') {
      closeMenu();
    } else {
      openMenu();
    }
  });

  const closeMenuOnBreakpoiint = () => {
    closeMenu();
  };

  breakpointLg.addListener(closeMenuOnBreakpoiint);
};

export {initMenu};
