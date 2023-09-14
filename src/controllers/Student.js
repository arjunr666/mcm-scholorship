const multer = require("multer");
const path = require("path");
const Application = require("../models/Application");

// const handleErrors = (err) => {
//   console.log(err.message, err.code);

// let errors = { title: "", snippet: "", content: "", topic: "" };

// duplicate error

// if (err.code === 11000) {
//   errors.title = " that title is already created!";
//   return errors;
// }
// //validating errors
// if (err.message.includes("Blog validation failed")) {
//   Object.values(err.errors).forEach(({ properties }) => {
//     errors[properties.path] = properties.message;
//   });
// }
//   return errors;
// };



const getApplicationForm = (req, res) => {
  res.render("student/application", { title: "Registration" });
};

const postApplicationForm = async (req, res) => {
  const {
    fullName,
    contactNumber,
    category,
    gender,
    dateOfBirth,
    hostellerOrDaysScholar,
    hostelName,
    semester,
    branch,
    yearOfAdmission,
    residentialAddress,
    hostelAddress,
    plusTwoInstitutionAddress,
    rankFirstChance,
    rankSecondChance,
    rankThirdChance,
    gpaS1,
    gpaS2,
    gpaS3,
    gpaS4,
    gpaS5,
    gpaS6,
    gpaS7,
    monthAndYearS1,
    monthAndYearS2,
    monthAndYearS3,
    monthAndYearS4,
    monthAndYearS5,
    monthAndYearS6,
    monthAndYearS7,
    noOfBackPapersS1,
    noOfBackPapersS2,
    noOfBackPapersS3,
    noOfBackPapersS4,
    noOfBackPapersS5,
    noOfBackPapersS6,
    noOfBackPapersS7,
    nameOfFather,
    nameOfMother,
    ageOfFather,
    ageOfMother,
    annualIncomeOfFather,
    annualIncomeOfMother,
    otherIncomeSource,
    totalIncomeOfFamily,
    isBankLoan,
    isOtherSources,
    nameOfAvailingScholorship,
    semesterFees,
    examFees,
    hostelFees,
    bookOrStationaryFees,
    otherExpenses,
    branchName,
    accountHolderName,
    accountNumber,
    ifscCode
  } = req.body;

  const file = req.file;

  console.log(file);

  try {
    const application = await Application.create({
      fullName: fullName,
      phone: contactNumber,
      category: category,
      gender: gender,
      dob: dateOfBirth,
      isHosteller: hostellerOrDaysScholar,
      hostelName: hostelName,
      semester: semester,
      branch: branch,
      yearOfAdmission: yearOfAdmission,
      residentialAddress: residentialAddress,
      hostelAddress: hostelAddress,
      plusTwoInstitutionAddress: plusTwoInstitutionAddress,
      entranceRankInChanceOne: rankFirstChance,
      entranceRankInChanceTwo: rankSecondChance,
      entranceRankInChanceThree: rankThirdChance,
      cgpaBySemester: [
        {
          semester: 1,
          cgpa: gpaS1,
          monthAndYear: monthAndYearS1,
          noOfBackPapers: noOfBackPapersS1,
        },
        {
          semester: 2,
          cgpa: gpaS2,
          monthAndYear: monthAndYearS2,
          noOfBackPapers: noOfBackPapersS2,
        },
        {
          semester: 3,
          cgpa: gpaS3,
          monthAndYear: monthAndYearS3,
          noOfBackPapers: noOfBackPapersS3,
        },
        {
          semester: 4,
          cgpa: gpaS4,
          monthAndYear: monthAndYearS4,
          noOfBackPapers: noOfBackPapersS4,
        },
        {
          semester: 5,
          cgpa: gpaS5,
          monthAndYear: monthAndYearS5,
          noOfBackPapers: noOfBackPapersS5,
        },
        {
          semester: 6,
          cgpa: gpaS6,
          monthAndYear: monthAndYearS6,
          noOfBackPapers: noOfBackPapersS6,
        },
        {
          semester: 7,
          cgpa: gpaS7,
          monthAndYear: monthAndYearS7,
          noOfBackPapers: noOfBackPapersS7,
        },
      ],

      incomeDetailsOfFamily: [
        {
          relationWithStudent: "Father",
          name: nameOfFather,
          age: ageOfFather,
          annualIncome: annualIncomeOfFather,
        },
        {
          relationWithStudent: "Mother",
          name: nameOfMother,
          age: ageOfMother,
          annualIncome: annualIncomeOfMother,
        },
      ],
      anyOtherIncomeSources: otherIncomeSource,
      totalIncomeOfFamily: totalIncomeOfFamily,
      receiptOfAnyBankLoan: isBankLoan,
      receiptOfAnyOtherFinancialAssistance: isOtherSources,
      nameOfScholarship: nameOfAvailingScholorship,
      expectedExpenses: {
        expectedSemFee: semesterFees,
        expectedExamFee: examFees,
        expectedHostelFee: hostelFees,
        bookStationariesFee: bookOrStationaryFees,
        otherExpences: otherExpenses,
      },
      bankAccountDetails: {
        nameOfBranch: branchName,
        nameOfAccountHolder: accountHolderName,
        accountNumber: accountNumber,
        ifsc: ifscCode,
      },

      bankPassbook: selectedApplicantPhoto,
      incomeCertificate: selectedKeralaEntranceRankList,
      entraceRanklist: selectedBankAccountPassBook,
    });

    res.redirect(`/student/register/confirm-application/${application._id}`);
  } catch (err) {
    // const errors = handleErrors(err);
    console.log(err);
    res.status(400).json({ err });
  }

  console.log(
    fullName,
    contactNumber,
    category,
    gender,
    dateOfBirth,
    hostellerOrDaysScholar,
    hostelName,
    semester,
    branch,
    yearOfAdmission,
    residentialAddress,
    hostelAddress,
    plusTwoInstitutionAddress,
    rankFirstChance,
    rankSecondChance,
    rankThirdChance,
    gpaS1,
    gpaS2,
    gpaS3,
    gpaS4,
    gpaS5,
    gpaS6,
    gpaS7,
    monthAndYearS1,
    monthAndYearS2,
    monthAndYearS3,
    monthAndYearS4,
    monthAndYearS5,
    monthAndYearS6,
    monthAndYearS7,
    noOfBackPapersS1,
    noOfBackPapersS2,
    noOfBackPapersS3,
    noOfBackPapersS4,
    noOfBackPapersS5,
    noOfBackPapersS6,
    noOfBackPapersS7,
    nameOfFather,
    nameOfMother,
    ageOfFather,
    ageOfMother,
    annualIncomeOfFather,
    annualIncomeOfMother,
    otherIncomeSource,
    totalIncomeOfFamily,
    isBankLoan,
    isOtherSources,
    nameOfAvailingScholorship,
    semesterFees,
    examFees,
    hostelFees,
    bookOrStationaryFees,
    otherExpenses,
    branchName,
    accountHolderName,
    accountNumber,
    ifscCode,
    selectedApplicantPhoto,
    selectedKeralaEntranceRankList,
    selectedBankAccountPassBook
  );
};

const getApplicationConfirmation = (req, res) => {};
const postApplicationConfirmation = (req, res) => {};
const getApplicationUpdate = (req, res) => {};
const postApplicationUpdate = (req, res) => {};
const printApplication = (req, res) => {};

module.exports = {
  getApplicationForm,
  postApplicationForm,
  getApplicationConfirmation,
  postApplicationConfirmation,
  getApplicationUpdate,
  postApplicationUpdate,
  printApplication,
};
