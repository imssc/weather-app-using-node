const request = require('request');

module.exports = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaW1zc2MiLCJhIjoiY2s3b3Q4c3o2MGJnNDNnbzIxbjdhbDE2ZiJ9.dTtBfEOFn8NNzf4R96wqzw`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to the location service`, undefined);
    } else if (body.features.length === 0) {
      callback(
        `Unable to find the location! Try again with another location`,
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        logitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};
