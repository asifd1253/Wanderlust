const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")

  //Index Route (All Listings)
  .get(wrapAsync(listingController.index))

  //create new listing
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//New Route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

router
  .route("/:id")

  //show Listing
  .get(wrapAsync(listingController.showListing))

  //Update(save) after editing Listing
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )

  //Delete Listing
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Request Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
