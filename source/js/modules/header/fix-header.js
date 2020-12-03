const header = document.querySelector('header');
const toggleHeaderState = () => {
  if (window.scrollY > 0) {
    header.classList.add('header--bg-filled');
  } else {
    header.classList.remove('header--bg-filled');
  }
};
const fixHeader = () => {
  if (header) {
    document.addEventListener('scroll', toggleHeaderState);
  }
};
export {fixHeader};
