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
    // ObjectManager accepts the same options as the clusterer.
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

  objectManager.objects.options.set({
    iconLayout: 'default#imageWithContent',
    iconImageHref: './img/content/map/icon-placemark.svg',
    iconImageSize: [32, 40],
    iconImageOffset: [-17, -40],
    hideIconOnBalloonOpen: false,
  });

  function setDefaultColor(objectId) {
    objectManager.objects.setObjectOptions(objectId, {
      iconLayout: 'default#imageWithContent',
      iconImageHref: './img/content/map/icon-placemark.svg',
      iconImageSize: [32, 40],
      iconImageOffset: [-17, -40],
      hideIconOnBalloonOpen: false,
    });
  }

  function setActiveColor(objectId) {
    objectManager.objects.setObjectOptions(objectId, {
      iconLayout: 'default#imageWithContent',
      iconImageHref: './img/content/map/icon-placemark-active.svg',
      iconImageSize: [32, 40],
      iconImageOffset: [-17, -40],
      hideIconOnBalloonOpen: false,
    });
  }

  function setDefaultClusterColor(objectId) {
    objectManager.clusters.setClusterOptions(objectId, {
      clusterIconImageHref: './img/content/map/icon-cluster.svg',
      clusterIconContentLayout: ymaps.templateLayoutFactory.createClass('<div style="color: #f39d23; font-weight: 500; font-size: 18px; line-height: 18px;">{{ properties.geoObjects.length }}</div>'),
    });
  }

  function setActiveClusterColor(objectId) {
    objectManager.clusters.setClusterOptions(objectId, {
      clusterIconImageHref: './img/content/map/icon-cluster-active.svg',
      clusterIconContentLayout: ymaps.templateLayoutFactory.createClass('<div style="color: #07352E; font-weight: 500; font-size: 18px; line-height: 18px;">{{ properties.geoObjects.length }}</div>'),
    });
  }

  function setDefaultMarkState() {
    objectManager.objects.setObjectOptions(activeObject, setDefaultColor(activeObject));
    activeObject = false;
    renderPopup();
  }

  let activeObject;

  function onObjectClick(e) {
    let objectId;
    // if event is triggered (after popup close)
    if (e.originalEvent.target) {
      objectId = e.originalEvent.target.id;
      objectManager.objects.setObjectOptions(activeObject, setDefaultColor(activeObject));
      activeObject = false;
      return;
    } else {
      objectId = e.get('objectId');
    }
    const objectGeometry = objectManager.objects.getById(objectId).geometry.type;
    if (objectGeometry === 'Point') {
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

  function onClusterMouseEvent(e) {
    const objectId = e.get('objectId');
    if (e.get('type') === 'mouseenter') {
      setActiveClusterColor(objectId);
    } else {
      setDefaultClusterColor(objectId);
    }
  }

  function onObjectMouseEvent(e) {
    const objectId = e.get('objectId');
    if (objectManager.objects.getById(objectId).geometry.type !== 'Point' || activeObject === objectId) {
      return;
    }
    if (e.get('type') === 'mouseenter') {
      objectManager.objects.setObjectOptions(objectId, setActiveColor(objectId));
    } else {
      objectManager.objects.setObjectOptions(objectId, setDefaultColor(objectId));
    }
  }

  objectManager.objects.events.add(['click'], onObjectClick);
  objectManager.objects.events.add(['mouseenter', 'mouseleave'], onObjectMouseEvent);
  objectManager.clusters.events.add(['click'], onClusterClick);
  objectManager.clusters.events.add(['mouseenter', 'mouseleave'], onClusterMouseEvent);
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
