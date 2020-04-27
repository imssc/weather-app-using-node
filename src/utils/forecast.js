const request = require('request');

module.exports = (location, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    location
  )}&APPID=b1737d0f1e47e20c052a864480b8ad64&units=metric`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find the coordinates', undefined);
    } else {
      callback(undefined, `It is currently ${body.main.temp} degrees out.`);
    }
  });
};
