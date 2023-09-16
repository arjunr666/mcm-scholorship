const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  isAlpha,
  isEmail,
  isMobilePhone,
  isStrongPassword,
} = require("validator");

const Schema = mongoose.Schema;

const facultySchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter first name"],
      minlength: [2, "First name should atleast be 2 characters"],
      maxlength: [50, "First name should not exceed 50 characters"],
      validate: [isAlpha, "First name should not contain numbers"],
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: [true, "Please enter last name"],
      minlength: [1, "Last name cannot be empty"],
      maxlength: [50, "Last shout not exceed 50 characters"],
      validate: [isAlpha, "Last name should not contain numbers"],
    },
    employeeNumber: {
      type: Number,
      required: [true, "Please enter an employee number"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      minlength: [5, "Email should be atleast 6 characters"],
      maxlength: [50, "Email should not exceed 50 characters"],
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a passowrd"],
      minlength: [10, "Password should be atleast 10 characters"],
      maxlength: [25, "Password should not exceed 25 characters"],
    },
    phone: {
      type: Number,
      minlength: [10, "Password should be atleast 10 number"],
      maxlength: [10, "Password should not exceed 10 number"],
      required: [true, "Please enter a phone number"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["faculty", "hod", "coordinator", "advisor", "admin"],
    },
    department: {
      type: String,
      required: [true, "Please select a department"],
      enum: [
        "cs",
        "ms",
        "eee",
        "c",
        "mca",
        "chem",
        "mtech",
        "mplan",
        "arch",
        "march",
      ],
    },
  },
  { timestamps: true }
);

//hash password before storing to mongodb
facultySchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

facultySchema.statics.login = async function (employeeNumber, password) {
  const faculty = await this.findOne({ employeeNumber });

  if (faculty) {
    const auth = await bcrypt.compare(faculty.password, password);

    if (auth) {
      return faculty;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect employee number");
};

const User = mongoose.model("User", facultySchema);

module.exports = User;
