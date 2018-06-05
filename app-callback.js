const yargs = require("yargs");
const fs = require("fs");

const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      string: true,
      describe: "Address to fetch weather for"
    }
  })
  .help()
  .alias("help", "h").argv;

console.log(argv);

geocode.geocodeAddress(argv.address, (errorMsg, result) => {
  if (errorMsg) {
    console.log(errorMsg);
  } else {
    console.log(result.address);
    weather.getWeather(
      result.latitude,
      result.longitude,
      (errorMsg, weatherResult) => {
        if (errorMsg) {
          console.log(errorMsg);
        } else {
          console.log(
            "Temperature is ",
            weatherResult.temperature,
            " but is actually ",
            weatherResult.apparentTemperature
          );
        }
      }
    );
  }
});
