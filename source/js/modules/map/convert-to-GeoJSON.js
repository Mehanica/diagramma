const getGeoJSON = (object) => {
  const geoJSON = {
    'type': 'FeatureCollection',
    'features': [],
  };
  object.ADDRESS.forEach((customer) => {
    const newObject = {};

    newObject.type = 'Feature';
    newObject.id = +customer.CustomerID;

    newObject.geometry = {};
    newObject.geometry.type = 'Point';
    newObject.geometry.coordinates = [];
    newObject.geometry.coordinates.push(customer.Latitude);
    newObject.geometry.coordinates.push(customer.Longitude);

    newObject.properties = {};
    newObject.properties.data = {};
    newObject.properties.data.address = `${customer.Address}, ${customer.City}, ${customer['Post code']}`;

    geoJSON.features.push(newObject);
  });

  return geoJSON;
};


export {getGeoJSON};
