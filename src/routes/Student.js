const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const studentController = require("../controllers/Student");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.get("/student/register", studentController.getApplicationForm);
router.post(
  "/student/register",
  upload.fields([
    { name: "applicant-photo", maxCount: 1 },
    { name: "kerala-entrance-rank-list", maxCount: 1 },
    { name: "bank-account-pass-book", maxCount: 1 },
  ]),
  studentController.postApplicationForm
);
router.get(
  "/student/register/confirm-application/:id",
  studentController.getApplicationConfirmation
);
router.post(
  "/student/register/confirm-application",
  studentController.postApplicationConfirmation
);
router.get(
  "/student/register/update-application/:id",
  studentController.getApplicationUpdate
);
router.post(
  "/student/register/update-application",
  studentController.postApplicationUpdate
);
router.get(
  "/student/register/print-application/:id",
  studentController.printApplication
);

module.exports = router;
