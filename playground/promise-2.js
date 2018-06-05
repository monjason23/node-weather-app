const request = require("request");
const API_KEY = "AIzaSyAdVhVMydvmETQZGPRJwBocwxvh7iRZqb0";

var geocodeAddress = address => {
  return new Promise((resolve, reject) => {
    var e_address = encodeURIComponent(address);
    request(
      {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${e_address}&key=${API_KEY}`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject(error);
        } else if (body.status === "ZERO_RESULTS") {
          reject("No results");
        } else if (body.status === "OK") {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          });
        }
      }
    );
  });
};

geocodeAddress("manila").then(
  location => {
    console.log(JSON.stringify(location, null, 2));
  },
  err => {
    console.log(error);
  }
);
