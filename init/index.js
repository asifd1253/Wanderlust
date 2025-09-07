require("dotenv").config(); // <-- Add this line at the top

const mongoose = require("mongoose");
const Listings = require("../models/listing.js");
const initData = require("./data.js");

// for to use mapbox
const mapToken = process.env.MAP_TOKEN;
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// const initDB = async () => {
//   await Listings.deleteMany({});

//   initData.data = initData.data.map((obj) => ({
//     ...obj,
//     owner: "68b29c42a361adcd3650d6ae",
//   }));
//   await Listings.insertMany(initData.data);
//   console.log("Successfull Initialized Data.");
// };

const initDB = async () => {
  await Listings.deleteMany({});

  for (let obj of initData.data) {
    // fetch coordinates for each location using Mapbox
    let geoData = await geocodingClient
      .forwardGeocode({
        query: obj.location,
        limit: 1,
      })
      .send();

    const listing = new Listings({
      ...obj,
      owner: "68b29c42a361adcd3650d6ae", // add owner
      geometry: geoData.body.features[0].geometry, // add geometry
    });

    await listing.save();
  }

  console.log("Successfully Initialized Data with owner and geometry.");
};

initDB();
