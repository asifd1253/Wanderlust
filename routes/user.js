const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router
  .route("/signup")

  //render to signup form
  .get(userController.renderSignupForm)

  //signup new user
  .post(wrapAsync(userController.signup));

router
  .route("/login")

  //render to login form
  .get(userController.renderLoginForm)

  //after login successfull
  .post(
    savedRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

//redirect to listing after logout
router.get("/logout", userController.logout);

module.exports = router;
