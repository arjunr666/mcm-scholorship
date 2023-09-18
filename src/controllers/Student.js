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
const getApplicationFormOne = (req, res) => {
  res.render("student/application1", { title: "Registration" });
};

const postApplicationFormOne = async (req, res) => {
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

    ifscCode,
  } = req.body;

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
    });
    res.status(200).json({ application: application._id });
  } catch (err) {
    // const errors = handleErrors(err);
    console.log(err);
    res.status(400).json({ err });
  }
};

const getApplicationFormTwo = (req, res) => {
  const id = String(req.params.id);

  res.render("student/application2", {
    title: "Registration",
    application: id,
  });
};

const postApplicationFormTwo = async (req, res) => {
  const { id } = req.body;

  // console.log(req.files);

  try {
    const application = await Application.updateOne(
      { _id: id },
      {
        $set: {
          applicantPhoto: {
            filename: req.files.applicant_photo[0].filename,
            originalName: req.files.applicant_photo[0].originalname,
            contentType: req.files.applicant_photo[0].mimetype,
          },
          bankPassbook: {
            filename: req.files.kerala_entrance_rank_list[0].filename,
            originalName: req.files.kerala_entrance_rank_list[0].originalname,
            contentType: req.files.kerala_entrance_rank_list[0].mimetype,
          },
          incomeCertificate: {
            filename: req.files.bank_account_pass_book[0].filename,
            originalName: req.files.bank_account_pass_book[0].originalname,
            contentType: req.files.bank_account_pass_book[0].mimetype,
          },
          entraceRanklist: {
            filename: req.files.income_certificate[0].filename,
            originalName: req.files.income_certificate[0].originalaame,
            contentType: req.files.income_certificate[0].mimetype,
          },
        },
      }
    );

    res.status(200).json({ application: id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const getApplicationConfirmation = async (req, res) => {
  const id = String(req.params.id);

  // console.log(id);
  const application = await Application.findById(id);
  console.log(application._id);
  res.render("student/confirmation", {
    title: "Confirmation",
    application: application,
  });
};
// const postApplicationConfirmation = async (req, res) => {
//   const { id } = req.body;

//   try {
//     const status = await Status.create({
//       application: id,
//       department: department
//     });

//     console.log(status);
//     res.status(200).json({ status: status._id });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ err });
//   }
// };
const getApplicationUpdate = (req, res) => {};
const postApplicationUpdate = (req, res) => {};

const printApplication = (req, res) => {
  // const doc = new PDFDocument();
  // doc.pipe(fs.createWriteStream("output.pdf"));
  // doc.fontSize(25).text("Some text with an embedded font!", 100, 100);
  // doc.end();
};

module.exports = {
  getApplicationFormOne,
  postApplicationFormOne,
  getApplicationFormTwo,

  postApplicationFormTwo,

  getApplicationConfirmation,
  // postApplicationConfirmation,
  getApplicationUpdate,
  postApplicationUpdate,
  printApplication,
};
