const diagramBlock = document.querySelector('.diagram');

const setAnimation = () => {
  if (!diagramBlock) {
    return;
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      diagramBlock.classList.add('show');
    }, 800);
  });
}

export {setAnimation};
