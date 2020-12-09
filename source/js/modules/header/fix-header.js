const header = document.querySelector('header');

const toggleHeaderState = () => {
  if (window.pageYOffset > 0) {
    header.classList.add('header--bg-colored');
  } else {
    header.classList.remove('header--bg-colored');
  }
};
const fixHeader = () => {
  if (header) {
    document.addEventListener('scroll', toggleHeaderState);
  }
};

export {fixHeader};
