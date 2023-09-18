const express = require("express");
const router = express.Router();

const coordinatorController = require("../controllers/Coordinator");

router.get("/coordinator", coordinatorController.index);
router.get("/coordinator/applications/", coordinatorController.getStudentList);
router.get(
  "/coordinator/applications/:id",
  coordinatorController.showStudentDetail
);
router.get(
  "/coordinator/applications/approve/:id",
  coordinatorController.approveStudent
);
router.get(
  "/coordinator/applications/reject/:id",
  coordinatorController.rejectStudent
);

module.exports = router;
