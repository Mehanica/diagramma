import MoveTo from '../vendor/moveto.js';

export default () => {
  const triggerList = document.querySelectorAll('.js-trigger');
  if (!triggerList.length) {
    return;
  }

  triggerList.forEach(function (trigger) {
    const moveTo = new MoveTo({
      tolerance: 120,
    });
    moveTo.registerTrigger(trigger);
  });
};
