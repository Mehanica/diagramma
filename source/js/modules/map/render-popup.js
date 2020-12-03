const popup = document.querySelector('.contacts__map-popup');
const popupAddress = popup.querySelector('.contacts__map-popup-address span');
const popupCloseBtn = popup.querySelector('.contacts__map-popup-btn');

const closePopup = function () {
  popup.classList.remove('contacts__map-popup--active');
};

const renderPopup = (manager, object) => {

  if (!popup) {
    return;
  }

  if (!object || object.type === 'Cluster' || object.geometry.type !== 'Point') {
    closePopup();
    return;
  }

  let timeoutNeeded;

  if (popup.classList.contains('contacts__map-popup--active')) {
    closePopup();
    timeoutNeeded = true;
  }

  const refreshPopup = () => {
    popupAddress.innerText = object.properties.data.address;
    popup.classList.add('contacts__map-popup--active');
  };

  if (timeoutNeeded) {
    setTimeout(() => {
      refreshPopup();
    }, 300);
  } else {
    refreshPopup();
  }

  popupCloseBtn.addEventListener('click', () => {
    manager.objects.events.fire(['click'], {
      coordPosition: object.geometry.coordinates,
      target: object,
    });
    closePopup();
  });

  window.addEventListener('keydown', (evt) => {
    popup.classList.remove('contacts__map-popup--active');
    if (evt.keyCode === 27 && popup.classList.contains('contacts__map-popup--active')) {
      evt.preventDefault();
      manager.objects.events.fire(['click'], {
        coordPosition: object.geometry.coordinates,
        target: object,
      });
      closePopup();
    }
  });

};

export {renderPopup};
