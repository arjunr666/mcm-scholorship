const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  isAlpha,
  isEmail,
  isMobilePhone,
  isStrongPassword,
} = require("validator");

const Schema = mongoose.Schema;

const scholorshipSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Please enter the full name"],
    minlength: [5,"Full name should  atleast be 5 characters"],
    maxlength: [100, "Full name should not exceed 100 characters"],
    validate: [isAlpha, "Full name should not contain numbers"],
  },
  phone: {
    type: String,
    required: [true, "Please enter a phone number"],
    validate: [isMobilePhone, "Please enter a valid phone number"],
  },
  category: {
    type: String,
    required: [ true , "Please select a category"],
    enum: [
      "General",
      "SC/ST",
      "OBC",
      "Others"
    ],
  },
  gender: {
    type: String,
    required: [true, "Please select a gender"],
  },
  dob: {
    type: Date,
    required: [true, "Please enter date of birth"],
  }
  
});

const Scholorship = mongoose.model("Scholorship", scholorshipSchema);

module.exports = Scholorship;
