const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isAlpha , isEmail , isStrongPassword } = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: {
		type: String,
		required: [true,"Please enter first name"],
		minlength: [3, "First name should atleast be 2 characters"],
		maxlength: [25, "First name should not exceed 25 characters"],
		validate: [isAlpha,"First name should not contain numbers"],
	},	
	lastName: {
		type: String,
		required: [true,"Please enter last name"],
		minlength: [1,"Last name cannot be empty"],
		maxlength: [50,"Last shout not exceed 50 characters"],
		validate: [isAlpha,"Last name should not contain numbers"]
	},
	email: {
		type: String,
		required: [true, "Please enter an email"],
		unique: true,
		minlength: [5,"Email should be atleast 6 characters"]
		maxlength: [50,"Email should not exceed 50 characters"]
		validate: [isEmail,"Please enter a valid email"],
	},
	password: {
		type: String,
		required: [true, "Please enter a passowrd"],
		minlength:[10,"Password should be atleast 10 characters"],
		maxlength: [25,"Password should not exceed 25 characters"],
		validate: [isStrongPassword,"Please enter a strong password"]
	},
	phone: {
		type: Number,
		required: true,
		unique: true,
		minlength: [10,"Phone number should be atleast 10 digits"],
		maxlength:[10, "Phone number should not exceed 10 digits"],
		validate: [isMobilePhone,"Please enter a valid phone number"]
	},
	role: {
		type: String,
		enum: ["student","hod","advisor","admin"],
		default: "student",
	}
}, { timestamps: true} );

//hash password before storing to mongodb
userSchema.pre("save", async function(next){
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password,salt);
	next();
});

const User = mongoose.model("User",userSchema);

module.exports = User;                                                     
