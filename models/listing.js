const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Reviews = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String },
  image: {
    // type: String,
    // set: function (url) {
    //   return url === ""
    //     ? "https://images.unsplash.com/photo-1550778323-71868c7dea39?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //     : url;
    // },
    url: String,
    filename: String,
  },
  price: { type: Number },
  location: { type: String },
  country: { type: String },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    // Delete all reviews whose IDs are stored in the 'reviews' array of the deleted listing
    await Reviews.deleteMany({ _id: { $in: listing.reviews } });
  }
});

//Give name singular here because in database it will make plural.
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
