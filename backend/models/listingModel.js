const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    listing_title: {
        type: String,
        required: true
    },
    user_id: {  // ID of the seller who created the listing
        type: String,
        required: true
    },
    listing_img: {
        type: String,
        default: null,
    },
    shoe_size: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        },
    ]
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
