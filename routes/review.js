const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");

const {
  validateReview,
  isLoggedIn,
  isReviewOwner,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//Reviews post(add) Route
router.post(
  //   "/listings/:id/reviews",
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//Reviews Delete Route
router.delete(
  //   "/listings/:id/reviews/:reviewId",
  "/:reviewId",
  isLoggedIn,
  isReviewOwner,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
