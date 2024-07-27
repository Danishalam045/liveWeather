const express = require("express");
const bodyparser = require("body-parser");
const http = require("http");

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/weather", (req, res) => {
  const cityname = req.body.City;
  const url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&appid=40d273e8a667ed3d117d08f5eed93fc6&lang=hi&units=metric";

  http.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weatheraData = JSON.parse(data);

    const weatherdescription = weatheraData.weather[0].main;
    // const weatherdescription=weatheraData.weather[0].description;
      const temp = weatheraData.main.temp;
      const icon = weatheraData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<p>The weather is currently in " + weatherdescription + " </ p > "
      );
      res.write(
        "<h1>The temperature in " +
          cityname +
          " is " +
          temp +
          " degree celcius.</h1>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3001, (req, res) => {
  console.log(`Server is working on port ${3001}`);
});
