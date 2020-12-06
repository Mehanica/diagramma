const popup = document.querySelector('.contacts__map-popup');
const popupAddress = document.querySelector('.contacts__map-popup-address span');
const popupCloseBtn = document.querySelector('.contacts__map-popup-btn');

const closePopup = function () {
  popup.classList.remove('contacts__map-popup--active');
};

const resetActive = (manager, object) => {
  manager.objects.events.fire(['click'], {
    coordPosition: object.geometry.coordinates,
    target: object,
  });
  closePopup();
};

const renderPopup = (manager, object) => {
  if (!popup) {
    return;
  }

  if (!object || object.type === 'Cluster' || object.geometry.type !== 'Point') {
    closePopup();
    return;
  }

  if (popup.classList.contains('contacts__map-popup--active')) {
    closePopup();
  }

  popupAddress.innerText = object.properties.data.address;
  popup.classList.add('contacts__map-popup--active');

  if (!popup.classList.contains('listeners-added')) {
    popupCloseBtn.addEventListener('click', () => {
      resetActive(manager, object);
    });

    window.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27 && popup.classList.contains('contacts__map-popup--active')) {
        evt.preventDefault();
        resetActive(manager, object);
      }
    });

    popup.classList.add('listeners-added');
  }
};

export {renderPopup};
