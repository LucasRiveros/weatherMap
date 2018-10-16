var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var apikey = '6568c5ad8384e98b24c263cea110ddce';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', { weather: null, error: null })
})

app.post('/', function (req, res) {
  var lat = req.body.lat;
  var lng = req.body.lng;

  var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng +'&units=metric&appid='+apikey;
  request(url, function (err, response, data) {
    if(err){
      res.render('detail', {weather: null, error: err});
    } else {
      var weatherData = JSON.parse(data)
      console.log(weatherData);
      if(weatherData.cod != 200){
        res.render('detail', {weather: null, error: 'Error, no existen datos'});
      } else {
        var temp = weatherData.main.temp;
        var name = weatherData.name;
        var text = 'La temperatura en ' + name + ' es de: ' + temp + '°C'
        res.render('detail', {weather: text, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
