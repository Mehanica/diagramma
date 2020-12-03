const header = document.querySelector('header');
let lastScrollTop = 0;
const breakpointLg = window.matchMedia('(min-width:0px)');

const setInitialHeaderState = () => {
  // if (document.querySelector('.wrapper').offsetTop <= 0) {
  //   header.classList.add('header--fixed');
  // }
};

const toggleHeaderState = () => {
  let scrollstart = window.pageYOffset;
  // Desktop
  if (window.innerWidth >= 0) {
    if (window.scrollY <= header.offsetHeight) {
      header.classList.remove('header--hidden');
      header.classList.remove('header--fixed');

    } else {
      if (window.scrollY < window.innerHeight) {
        if (window.scrollY < window.innerHeight / 2) {
          header.classList.remove('header--hidden');
          header.classList.remove('header--fixed');
        } else {
          // Down
          if (scrollstart - lastScrollTop > 0) {
            header.classList.add('header--no-animation');
          }
          header.classList.add('header--fixed');
          header.classList.add('header--hidden');
          setTimeout(() => {
            header.classList.remove('header--no-animation');
          }, 300);
        }
      } else {
        header.classList.remove('header--no-animation');
        header.classList.add('header--fixed');
        header.classList.remove('header--hidden');
      }
    }
    // Tablet & mobile
  } else {
    header.classList.add('header--hidden');
    header.classList.add('header--fixed');
    header.classList.remove('header--hidden');
  }

  lastScrollTop = scrollstart <= 0 ? 0 : scrollstart;
};

// const fixHeader = () => {
//   if (header) {

//     setInitialHeaderState();

//     const onResize = () => {
//       if (breakpointLg.matches) {
//         toggleHeaderState();
//       }
//     };

//     breakpointLg.addListener(onResize);
//     window.addEventListener('load', setScrollListener);
//   }
// };
// const setScrollListener = () => {
//   document.addEventListener('scroll', toggleHeaderState);
// };

// export {fixHeader};
