const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: {
		type: String,
		required: [true,"Please enter first name"],
	},
	lastName: {
		type: String,
		required: [true,"Please enter last name"],
	},
	email: {
		type: String,
		required: [true, "Please enter an email"],
		unique: true,
		validate: [isEmail,"Please enter a valid email"],
	},
	password: {
		type: String,
		required: [true, "Please enter a passowrd"],
		minlength:[8,"Minimum password length is 8 characters"],
		maxlength: [25, "Maximum password length is 25 characters"]
	},
	phone: {
		type: Number,
		required: true,
		unique: true,
		minlength: [10,"Phone number should contain 10 digits"],
		maxlength:[10, "Phone number should contain 10 digits"]
	},
	role: {
		type: String,
		required: [true, "Please select a role"],

	}
}, { timestamps: true} );

const User = mongoose.model("User",userSchema);

module.exports = User;
