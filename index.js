const express = require('express');
const axios = require('axios');
const { response } = require('express');
require('dotenv').config();

const app = express();

const API_KEY = process.env.API_KEY;
const port = 3000;

app.get('/', function(req, res) {
  const address = req.query.address; 
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`

  axios.get(url).then(response => {
      const data = response.data;
      const cityName = data.name;
      const temperature = data.main.temp;
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      const msg = `City Name: ${cityName}<br>Temperature: ${temperature}&deg;C<br>Sunset Time: ${sunsetTime}`;

      res.send(msg);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error has been occurred');
    })
});

app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
})
