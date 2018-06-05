const yargs = require("yargs");
const fs = require("fs");
const axios = require("axios");

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

const encodedAddress = encodeURIComponent(argv.address);
const API_KEY = "AIzaSyAdVhVMydvmETQZGPRJwBocwxvh7iRZqb0";

var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`;

axios
  .get(geocodeURL)
  .then(res => {
    if (res.data.status === "ZERO_RESULTS") {
      throw new Error("Cannot find address");
    }
    var gLoc = res.data.results[0].geometry.location;
    var weatherURL = `https://api.darksky.net/forecast/e2263eeaeb9e4c9a70a07696fb0bb7b1/${
      gLoc.lat
    },${gLoc.lng}`;
    console.log(res.data.results[0].formatted_address);
    return axios.get(weatherURL);
  })
  .then(res => {
    var tData = res.data.currently;
    console.log(
      `It is currently ${tData.temperature}. It feels like ${
        tData.apparentTemperature
      } `
    );
  })
  .catch(err => {
    if (err.code === "ENOTFOUND") {
      console.log("Cant connect to API");
    } else console.log(err.message);
  });
