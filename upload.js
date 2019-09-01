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

async function takePhoto() {
	try {
		const pic = await cam.raspistill('--vflip --width 640 --height 480 --nopreview --exposure auto --output -');
		return pic;
	} catch (error) {
		console.error(`error in pi camera capture - ${error}`);
	}
}

async function upload(file) {
	try {
		const cloud = await cloudinary.uploader.upload(file, { public_id: `${id}`, folder: `raspberrypi` });
		return cloud;
	} catch (error) {
		console.error(`error in upload - ${error}`);
	}
}

module.exports = (async function () {
	const photoTaken = await takePhoto();
	const photouploaded = await upload(photoTaken);
	return (photouploaded);
});




