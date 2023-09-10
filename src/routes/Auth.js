const express = require("express");
const router = express.Router();
const authController = require("../controllers/Auth");

router.get("/auth/signin", authController.facultySigninGet);
router.post("/auth/signin", authController.facultySigninPost);
router.get("/auth/logout",authController.facultyLogoutGet);

module.exports = router;
