const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listeningController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listeningController.index))
    .post(isLoggedIn,  upload.single('listing[image]'), validateListing, wrapAsync(listeningController.createListing));
// new route
router.get("/new", isLoggedIn, listeningController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listeningController.showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listeningController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listeningController.destroyListing));

// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listeningController.renderEditForm));

module.exports = router;