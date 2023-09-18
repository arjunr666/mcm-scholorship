const express = require("express");
const multer = require("multer");
const router = express.Router();

const studentController = require("../controllers/Student");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads");
  },
  filename: (req, file, cb) => {
    //console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.fieldname + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/student/register/1", studentController.getApplicationFormOne);
router.post("/student/register/1", studentController.postApplicationFormOne);
router.get("/student/register/2/:id", studentController.getApplicationFormTwo);

router.post(
  "/student/register/2/",
  upload.fields([
    { name: "applicant_photo", dest: __dirname + "/uploads/" },
    { name: "kerala_entrance_rank_list", dest: __dirname + "/uploads/" },
    { name: "bank_account_pass_book", dest: __dirname + "/uploads/" },
    { name: "income_certificate", dest: __dirname + "/uploads/" },
  ]),
  studentController.postApplicationFormTwo
);

router.get(
  "/student/register/3/confirm-application/:id",
  studentController.getApplicationConfirmation
);
// router.post(
//   "/student/register/3/confirm-application",
//   studentController.postApplicationConfirmation
// );
router.get(
  "/student/register/update-application/:id",
  studentController.getApplicationUpdate
);
router.post(
  "/student/register/update-application",
  studentController.postApplicationUpdate
);
router.get(
  "/student/register/print-application",
  studentController.printApplication
);

module.exports = router;
