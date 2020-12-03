const header = document.querySelector('header');
const breakpointLg = window.matchMedia('(min-width:1024px)');
const breakpointSm = window.matchMedia('(max-width:767px)');
const HEADER_HEIGHT_DIFFERENCE = {
  md: 78,
  sm: 62,
};

let lastScrollTop = 0;
let difference;


const setInitialHeaderState = () => {
  // if (document.querySelector('.wrapper').offsetTop <= 0) {
  //   header.classList.add('header--fixed');
  // }
};

const toggleHeaderState = () => {
  let scrollstart = window.pageYOffset;

  const stickyTop = header.offsetTop;
  const hasVScroll = document.body.offsetHeight - difference > document.documentElement.clientHeight;
  // Desktop
  if (window.innerWidth >= 1024) {
    if (window.scrollY <= header.offsetHeight) {
      header.classList.remove('header--hidden');
      header.classList.remove('header--fixed');
      header.style = "background-color: transparent";

    } else {
      if (window.scrollY < window.innerHeight) {
        if (window.scrollY < window.innerHeight / 2) {
          header.classList.remove('header--hidden');
          header.classList.remove('header--fixed');
          header.style = "background-color: transparent";
        } else {
          // Down
          if (scrollstart - lastScrollTop > 0) {
            header.classList.add('header--no-animation');
          }
          header.classList.add('header--fixed');
          header.classList.add('header--hidden');
          header.style = "background-color: #07352e";
          setTimeout(() => {
            header.classList.remove('header--no-animation');
          }, 300);
        }
      } else {
        header.classList.remove('header--no-animation');
        header.classList.add('header--fixed');
        header.style = "background-color: #07352e";
        header.classList.remove('header--hidden');
      }
    }
    // Tablet & mobile
  } else {
    if (breakpointSm.matches) {
      difference = HEADER_HEIGHT_DIFFERENCE.sm;
    } else {
      difference = HEADER_HEIGHT_DIFFERENCE.md;
    }

    const documentScrollHandler = () => {
      if (window.scrollY > stickyTop) {
        header.style = "background-color: #07352e";
        header.classList.add('header--fixed');
      } else {
        header.style = "background-color: transparent";
        header.classList.remove('header--fixed');
      }
    }

    // Проверяю есть ли скролл на странице
    if (hasVScroll) {
      document.addEventListener('scroll', documentScrollHandler);
    } else {
      document.removeEventListener('scroll', documentScrollHandler);
    }

    header.classList.add('header--hidden');
    header.classList.add('header--fixed');
    header.classList.remove('header--hidden');
  }

  lastScrollTop = scrollstart <= 0 ? 0 : scrollstart;
};

const fixHeader = () => {
  if (header) {

    setInitialHeaderState();

    const onResize = () => {
      if (breakpointLg.matches) {
        toggleHeaderState();
      }
    };

    breakpointLg.addListener(onResize);
    window.addEventListener('load', setScrollListener);
  }
};
const setScrollListener = () => {
  document.addEventListener('scroll', toggleHeaderState);
};

export {fixHeader};
