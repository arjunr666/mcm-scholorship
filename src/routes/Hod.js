const express = require("express");
const router = express.Router();

const hodController = require("../controllers/Hod");

router.get("/hod", hodController.index);
router.get("/hod/applications/", hodController.getStudentList);
router.get("/hod/applications/:id", hodController.showStudentDetail);
router.get("/hod/applications/approve/:id", hodController.approveStudent);
router.get("/hod/applications/reject/:id", hodController.rejectStudent);

module.exports = router;
