const request = require("request");
const API_KEY = "e2263eeaeb9e4c9a70a07696fb0bb7b1";

const getWeather = (lat, long, callback) => {
  if (typeof callback !== "function") {
    console.log("Must be function!");
    return;
  }
  request(
    {
      url: `https://api.darksky.net/forecast/${API_KEY}/${lat},${long}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(null, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else callback("Unable to fetch weather");
    }
  );
};

module.exports = {
  getWeather
};
