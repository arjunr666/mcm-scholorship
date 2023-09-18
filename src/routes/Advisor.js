const express = require("express");
const router = express.Router();

const advisorController = require("../controllers/Advisor");

router.get("/advisor", advisorController.index);
router.get(
  "/advisor/applications/",
  advisorController.getStudentList
);
router.get("/advisor/applications/:id", advisorController.showStudentDetail);
router.get(
  "/advisor/applications/approve/:id",
  advisorController.approveStudent
);
router.get("/advisor/applications/reject/:id", advisorController.rejectStudent);

module.exports = router;
