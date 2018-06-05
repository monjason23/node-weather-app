const request = require("request");
const API_KEY = "AIzaSyAdVhVMydvmETQZGPRJwBocwxvh7iRZqb0";

const geocodeAddress = (address, callback) => {
  if (typeof callback !== "function") {
    console.log("Second argument should be a callback!");
  }

  const encodedAddress = encodeURIComponent(address);

  request(
    {
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect");
      } else if (body.status === "ZERO_RESULTS") {
        callback("Unable to find address");
      } else if (body.status === "OK") {
        callback(null, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
        console.log("Address: ", body.results[0].formatted_address);
        console.log("Latitude: ", body.results[0].geometry.location.lat);
        console.log("Longitude: ", body.results[0].geometry.location.lng);
      }
    }
  );
};

module.exports = {
  geocodeAddress
};
