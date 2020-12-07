import MoveTo from '../../vendor/moveto.js';
const map = document.querySelector('.contacts__map-wrapper');
// const nextBlock = document.querySelector('.contacts + *');

const moveTo = new MoveTo({
  tolerance: -20,
});

const showMap = () => {
  const difference = (map.offsetTop + map.offsetHeight) - (window.pageYOffset + window.innerHeight);
  if (difference > 0) {
    moveTo.move(difference);
  } else {
    return;
  }
};

export {showMap};

