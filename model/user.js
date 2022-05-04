//[SECTION] Dependencies and Modules
const mongoose = require("mongoose");

//[SECTION] Schema
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Email is Required"]
	},
	password: {
		type: String,
		required: [true, "Password is Required"]
	},
	isAdmin: {
		type: Boolean,
		required: false
	}

});

//[SECTION] Model
module.exports = mongoose.model("User, userSchema");

