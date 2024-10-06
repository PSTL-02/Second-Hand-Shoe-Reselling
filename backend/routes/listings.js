const express = require('express')
const router = express.Router();
const { upload } = require('../config/cloudinary');  // Import the Cloudinary config

// Import Controllers
const {
    getListings,
    getListing,
    createListing,
    deleteListing,
    updateListing
} = require('../controllers/listingController');

// router variable + http method to create a route
router.get('/', getListings);
router.get('/:id', getListing); 
router.post('/', upload.single('listing_img'), createListing);
router.post('/', createListing);
router.delete('/:id', deleteListing);
router.patch('/:id', updateListing);

module.exports = router;