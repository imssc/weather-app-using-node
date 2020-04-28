const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

const port = process.env.PORT || 3000;

//Define the paths for the Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine & views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
  res.render('index', { title: 'Weather', name: 'Shiva Shankar' });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Shiva Shankar',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Me',
    name: 'Shiva Shankar',
    helptext: 'Hello there this is the best site for coding',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address',
    });
  }

  geocode(req.query.address, (error, { location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(location, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('/products/', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Shiva Shankar',
    message: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Shiva Shankar',
    message: 'Page not found',
  });
});

app.listen(port, () => {
  console.log('Listening at port....' + port);
});
