/* eslint-disable no-undef */
const contactsMap = document.querySelector('#map');

function init() {
  const myMap = new ymaps.Map('map', {
    center: [55.687086, 37.529789],
    zoom: 10,
    controls: [],
  },
  {suppressMapOpenBlock: true});

  // myMap.behaviors.disable('drag');
  myMap.behaviors.disable('scrollZoom');
  myMap.controls.add('zoomControl');
  myMap.controls.add('typeSelector');

  // const addresses = ['Москва, Строителей улица, дом 15', 'Москва, Рябиновая улица, дом 53'];

  // Отрисовываем точки
  // Второй аргумент -- одномерный массив с адресами
  // window.mapRenderPlacemarks.renderPlacemarks(myMap, addresses);
}

const initMap = () => {
  if (contactsMap) {
    ymaps.ready(init);
  }
};

export {initMap};
