var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', { weather: null, error: null })
})

app.post('/', function (req, res) {
  //var city = req.body.city;
  // var url = `https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=${apiKey}`
  // var url = 'https://api.openweathermap.org/data/2.5/find?q='+city+'&units=metric&appid='+apiKey;
  
  //var location = JSON.parse(req.body.location);
  var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + location.centroide.lat + '&lon=' + location.centroide.lon +'&units=metric&appid='+apiKey;
  request(url, function (err, response, data) {
    if(err){
      res.render('index', {weather: null, error: err});
    } else {
      //console.log(data)
      var weatherData = JSON.parse(data)
      console.log(weatherData);
      if(weatherData.cod != 200){
        res.render('index', {weather: null, error: 'Error, no existen datos'});
      } else {
        var temp = weatherData.main.temp;
        var name = location.nombre;
        var text = 'La temperatura en ' + name + ' es de: ' + temp + '°C'
        res.render('detail', {weather: text, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
