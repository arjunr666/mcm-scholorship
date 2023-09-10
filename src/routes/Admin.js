const express = require("express");

const router = express.Router();

const facultyController = require("../controllers/Admin");
const { requireAuth } = require("../middleware/Auth");

router.get("/admin", requireAuth,facultyController.adminIndex);

router.get("/admin/faculties/view-faculties",requireAuth, facultyController.viewFaculties);

router.get("/admin/faculties/view-faculties/search/:empNo",requireAuth, facultyController.searchFaculty);

router.get("/admin/faculties/view-faculties/:empNo",requireAuth, facultyController.viewFaculty);

router.post("/admin/faculties/view-faculties/reset-password/:empNo",requireAuth, facultyController.resetPassword);

router.get("/admin/faculties/create-faculty",requireAuth, facultyController.createFacultyGet);

router.post("/admin/faculties/create-faculty",requireAuth, facultyController.createFacultyPost);


module.exports = router;