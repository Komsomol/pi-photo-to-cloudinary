require('dotenv').config();

const nanoid = require("nanoid");
const cloudinary = require('cloudinary').v2;
const cam = require('./takepic');
const id = nanoid();

cloudinary.config({
	cloud_name: process.env.NAME,
	api_key: process.env.KEY,
	api_secret: process.env.SECRET
});

// more args here
// https://www.raspberrypi.org/app/uploads/2013/07/RaspiCam-Documentation.pdf
// --output - sends to stdout
cam.raspistill('--vflip --width 640 --height 480 --nopreview --exposure auto --output -', (data) => {
	// console.log(data);
	cloudinary.uploader.upload(data,
		{
			public_id: `${id}.jpg`,
			folder: `raspberrypi`
		},
		(error, result) => {
			if (!error) {
				console.log(result);
			} else {
				console.log("Error", error);
			}
		}
	);

});

