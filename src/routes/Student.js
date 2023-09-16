const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const studentController = require("../controllers/Student");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.fieldname + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/student/register/1", studentController.getApplicationFormOne);
router.post("/student/register/1", studentController.postApplicationFormOne);
router.get("/student/register/2/:id", studentController.getApplicationFormTwo);
// router.post("/student/register/2/:id", studentController.postApplicationFormTwo);

router.post(
  "/student/register/2/:id",
  upload.fields([
    { name: "applicant-photo", dest: __dirname + "/uploads/" },
    { name: "kerala-entrance-rank-list", dest: __dirname + "/uploads/" },
    { name: "bank-account-pass-book", dest: __dirname + "/uploads/" },
  ]),
  (req, res) => {
    const id = String(req.params.id);

    // console.log(req.files);
    console.log(req.body);

    // try {
    //   application.updateOne({ _id: id }, {});
    // } catch (err) {}
    res.status(200).json({ status: "files received!" });
  }
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
