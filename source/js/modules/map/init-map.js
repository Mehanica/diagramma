/* eslint-disable no-undef */
import {getData} from './contacts-data';
import {getGeoJSON} from './convert-to-GeoJSON';
import {renderPopup} from './render-popup';

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
    clusterize: true,
    // ObjectManager принимает те же опции, что и кластеризатор.
    clusterDisableClickZoom: false,

    clusterIconLayout: 'default#imageWithContent',
    clusterIconImageHref: './img/content/map/icon-cluster.svg',
    clusterIconImageSize: [38, 38],
    clusterIconImageOffset: [-19, -19],
    clusterIconRadius: 1,
    clusterIconContentSize: [38, 38],
    clusterIconContentOffset: [0, 10],
    clusterIconContentLayout: ymaps.templateLayoutFactory.createClass('<div style="color: #f39d23; font-weight: 500; font-size: 18px; line-height: 18px;">{{ properties.geoObjects.length }}</div>'),
  });


  const data = getData();
  const geoJSON = getGeoJSON(data);


  objectManager.add(geoJSON);
  // Задаем опции для коллекции одиночных объектов (опция применится для меток).

  objectManager.objects.options.set({
    // Указываем тип макета
    iconLayout: 'default#imageWithContent',
    // Добавляем своё изображение иконки метки
    iconImageHref: '../img/content/map/icon-placemark.svg',
    // Указываем размеры метки
    iconImageSize: [32, 40],
    // Изменяем положение левого верхнего угла иконки относительно её точки привязки
    iconImageOffset: [-17, -40],
    // Не скрывать метку при открытии балуна
    hideIconOnBalloonOpen: false,
  });

  function setDefaultColor(objectId) {
    objectManager.objects.setObjectOptions(objectId, {
      iconLayout: 'default#imageWithContent',
      iconImageHref: '../img/content/map/icon-placemark.svg',
      iconImageSize: [32, 40],
      iconImageOffset: [-17, -40],
      hideIconOnBalloonOpen: false,
    });
  }

  function setActiveColor(objectId) {
    objectManager.objects.setObjectOptions(objectId, {
      iconLayout: 'default#imageWithContent',
      iconImageHref: '../img/content/map/icon-placemark-active.svg',
      iconImageSize: [32, 40],
      iconImageOffset: [-17, -40],
      hideIconOnBalloonOpen: false,
    });
  }

  function setDefaultMarkState() {
    objectManager.objects.setObjectOptions(activeObject, setDefaultColor(activeObject));
    activeObject = false;
    renderPopup();
  }

  let activeObject;
  // window.activeObject = activeObject;

  function onObjectClick(e) {
    let objectId;
    // Если событие искусственно вызвано (при закрытии баллуна по кнопке)
    if (e.originalEvent.target) {
      objectId = e.originalEvent.target.id;
      objectManager.objects.setObjectOptions(activeObject, setDefaultColor(activeObject));
      activeObject = false;
      return;
    } else {
      objectId = e.get('objectId');
    }
    const objectGeometry = objectManager.objects.getById(objectId).geometry.type;
    // Если событие произошло на метке, изменяем цвет ее иконки.
    if (objectGeometry === 'Point') {
      // Если уже есть активная кнопка, сбрасываем ее состояние.
      if (activeObject) {
        if (activeObject === objectId) {
          return;
        }
        objectManager.objects.setObjectOptions(activeObject, setDefaultColor(activeObject));
      }
      activeObject = objectId;
      objectManager.objects.setObjectOptions(objectId, setActiveColor(objectId));
      renderPopup(objectManager, objectManager.objects.getById(objectId));
    }
  }

  function onClusterClick(e) {
    const objectId = e.get('objectId');
    renderPopup(objectManager, objectManager.clusters.getById(objectId));
  }

  objectManager.objects.events.add(['click'], onObjectClick);
  objectManager.clusters.events.add(['click'], onClusterClick);
  myMap.events.add(['wheel'], setDefaultMarkState);
  myMap.events.add(['multitouchstart'], setDefaultMarkState);

  myMap.geoObjects.add(objectManager);
}

const initMap = () => {
  if (contactsMap) {
    ymaps.ready(init);
  }
};

export {initMap};
