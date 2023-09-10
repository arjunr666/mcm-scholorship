const mongoose = require("mongoose");
const { isAlpha, isEmail, isMobilePhone } = require("validator");

const Schema = mongoose.Schema;

// const entranceRank = new mongoose.Schema({
//   chance: String,
//   rank: Number,
// });

const cgpa = new mongoose.Schema({
  semester: Number,
  cgpa: Number,
  monthAndYear: String,
  noOfBackPapers: Number,
});

const incomeDetails = new mongoose.Schema({
  relationWithStudent: String,
  name: String,
  age: Number,
  annualIncome: Number,
});

const expenses = new mongoose.Schema({
  expectedSemFee: {
    type: Number,
    required: true,
  },
  expectedExamFee: {
    type: Number,
    required: true,
  },
  expectedHostelFee: Number,
  bookStationariesFee: Number,
  otherExpences: Number,
});

const bankAccount = new mongoose.Schema({
  nameOfBranch: {
    type: String,
    required: true,
  },
  nameOfAccountHolder: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  ifsc: {
    type: Number,
    required: true,
  },
});

const applicationSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter the full name"],
      minlength: [5, "Full name should  atleast be 5 characters"],
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
      required: [true, "Please select a category"],
      enum: ["General", "SC/ST", "OBC", "Others"],
    },
    gender: {
      type: String,
      required: [true, "Please select a gender"],
    },
    dob: {
      type: Date,
      required: [true, "Please enter date of birth"],
    },
    hosteler: {
      type: Boolean,
      required: [true, "Please speccify hosteller / day scholor"],
    },
    hostelName: {
      type: String,
    },
    semester: {
      type: Number,
      required: [true, "Please enter current semster"],
    },
    branch: {
      type: String,
      required: [true, "Please select the branch name"],
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
    residentialAddress: {
      type: String,
      required: [true, "Please enter the address and phone number"],
      minlength: [
        25,
        "Residential address should contain atleast 25 characters",
      ],
      maxlength: [255, "Residential address should not exceed 255 characters"],
    },
    hostelAddress: {
      type: String,
      minlength: [25, "Hostel address should contain atleast 25 characters"],
      maxlength: [255, "Hostel address should not exceed 255 characters"],
    },
    previousInstitutionAddress: {
      type: String,
      required: [
        true,
        "Please enter the address of previous institution (plus two)",
      ],
      minlength: [
        25,
        "Institution address should contain atleast 25 characters",
      ],
      maxlength: [255, "Institution address should not exceed 255 characters"],
    },
    entranceRankInChanceOne: {
      type: Number,
      required: true,
    },
    entranceRankInChanceTwo: {
      type: Number,
    },
    entranceRankInChanceThree: {
      type: Number,
    },
    cgpaBySemester: [cgpa],
    incomeDetailsOfFamily: [incomeDetails],
    anyOtherIncomeSources: {
      type: Boolean,
      required: true,
    },
    totalIncomeOfFamily: {
      type: Number,
      required: True,
    },
    receiptOfAnyBankLoan: {
      type: Boolean,
      required: true,
    },
    receiptOfAnyOtherFinancialAssistance: {
      type: Boolean,
      required: true,
    },
    nameOfScholarship: {
      type: String,
    },
    expectedExpenses: expenses,
    bankAccountDetails: bankAccount,
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Scholarship;
