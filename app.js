const express = require('express');
const https = require('https');

const app = express();

app.get('/', function(req, res) {
  const query = 'Denpasar';
  const apiKey = 'b7c426e756e06d8c74abb24006978ef5';
  const unit = 'metric';
  const url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + query + '&units=' + unit + '&appid=' + apiKey;

  https.get(url, 'JSON', function(response) {
    console.log(response.statusCode);
    var data;

    // let stockData = ''; // initializa an empty variable for the data.

    response.on('data', function(chunk){
      // console.log(data);
      if (!data) {
        data = chunk;
      } else {
        data += chunk;
      }
    });
  //     // stockData += data; // this fuction get called about  4 times.
  //

   response.on('end', function(){
     // res.json(JSON.parse(stockData)); // and when its done show it in the browser.
     const weatherData = JSON.parse(data);
     const temp = weatherData.list[0].main.temp
     const weatherDescription = weatherData.list[0].weather[0].description
     res.write('<p>The weather is currently ' + weatherDescription + '</p>');
     res.write('The temperature in Bali is ' + temp + ' degrees Celcius');
     res.send();
   });
  });
});

app.listen(3010, function() {
  console.log('server 3010 is up and running');
});
