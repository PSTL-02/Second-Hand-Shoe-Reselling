const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure cloudinary with the credentials form the env file:
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// set up storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Shoes" ,// name of the folder in Cloudinary
        format: async (req, file) => 'png', // Format of the uploaded image
        public_id: (req, file) => file.originalname.split('.')[0], // File name in Cloudinary
    }
});

// Multer middleware configured with Cloudinary storage
const upload = multer({ storage });

module.exports = { upload, cloudinary };
