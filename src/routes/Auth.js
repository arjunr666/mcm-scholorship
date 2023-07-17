const express = require("express");
const router = express.Router();
const authController = require("../controllers/Auth");

router.get("/auth/signup", authController.signupGet);
router.post("/auth/signup", authController.signupPost);
router.get("/auth/signin", authController.signinGet);
router.post("/auth/signin", authController.signinPost);
router.get("/auth/logout",authController.logout);

module.exports = router;
