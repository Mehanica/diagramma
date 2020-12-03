/* eslint-disable no-undef */
import {getData} from './contacts-data';
import {getGeoJSON} from './convert-to-GeoJSON';

const contactsMap = document.querySelector('#map');

function init() {
  const myMap = new ymaps.Map('map', {
    center: [51.509865, -0.118092],
    zoom: 8,
    controls: [],
  },
  {
    suppressMapOpenBlock: true,
  });

  const objectManager = new ymaps.ObjectManager({
    // Чтобы метки начали кластеризоваться, выставляем опцию.
    clusterize: true,
    // ObjectManager принимает те же опции, что и кластеризатор.
    clusterDisableClickZoom: false,

    clusterIconLayout: 'default#imageWithContent',
    clusterIconImageHref: '../img/sprite/icon-cluster.svg',
    clusterIconImageSize: [38, 38],
    clusterIconImageOffset: [-19, -19],
    clusterIconRadius: 1,
    clusterIconContentSize: [38, 38],
    clusterIconContentOffset: [0, 10],
    clusterIconContentLayout: ymaps.templateLayoutFactory.createClass('<div style="color: #f39d23; font-weight: 500; font-size: 18px; line-height: 18px;">{{ properties.geoObjects.length }}</div>'),


  });

  const data = getData();
  const geoJSON = getGeoJSON(data);

  // console.log(geoJSON);
  // console.log({
  //   "type": "FeatureCollection",
  //   "features": [
  //     {
  //       "type": "Feature",
  //       "id": 0,
  //       "geometry": {
  //         "type": "Point",
  //         "coordinates": [55.831903, 37.411961]
  //       },
  //       "properties": {
  //         "balloonContent": "Магазин на углу",
  //         "data": {
  //           "organization": "shop",
  //           "open": "9am - 9pm"
  //         }
  //       }
  //     },
  //     {
  //       "type": "Feature",
  //       "id": 1,
  //       "geometry": {
  //         "type": "Point",
  //         "coordinates": [55.763338, 37.565466]
  //       },
  //       "properties": {
  //         "balloonContent": "Аптека",
  //          "data": {
  //           "organization": "pharmacy",
  //           "open": "8am - 10pm"
  //         }
  //       }
  //     }
  //   ]
  // });

  objectManager.add(geoJSON);
  // Задаем опции для коллекции одиночных объектов (опция применится для меток).
  objectManager.objects.options.set({
    // Указываем тип макета
    iconLayout: 'default#imageWithContent',
    // Добавляем своё изображение иконки метки
    iconImageHref: '../img/sprite/icon-placemark.svg',
    // Указываем размеры метки
    iconImageSize: [32, 40],
    // Изменяем положение левого верхнего угла иконки относительно её точки привязки
    iconImageOffset: [-17, -40],
    // Не скрывать метку при открытии балуна
    hideIconOnBalloonOpen: false,
  });

  myMap.geoObjects.add(objectManager);
}

const initMap = () => {
  if (contactsMap) {
    ymaps.ready(init);
  }

};

export {initMap};
