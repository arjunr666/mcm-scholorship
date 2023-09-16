const express = require("express");

const router = express.Router();

const adminController = require("../controllers/Admin");
const { requireAuth } = require("../middleware/Auth");

router.get("/admin", adminController.adminIndex);

router.get("/admin/faculties/view-faculties", adminController.viewFaculties);

router.get(
  "/admin/faculties/view-faculties/search/:empNo",
  adminController.searchFaculty
);

router.get(
  "/admin/faculties/view-faculties/:empNo",
  adminController.viewFaculty
);

router.post(
  "/admin/faculties/view-faculties/reset-password/:empNo",
  adminController.resetPassword
);

router.get(
  "/admin/faculties/create-faculty",
  adminController.createFacultyGet
);

router.post(
  "/admin/faculties/create-faculty",
  adminController.createFacultyPost
);

module.exports = router;
