const express = require("express")
const UserController = require("../Controllers/User");
const { verifyAccessToken } = require("../helpers/jwt");
const  validate  = require("../Middleware/validate");
const schemas = require("../validations/User");

const router = express.Router();

router.route("/").post(validate(schemas.createValidations),UserController.register);
router.route("/login").post(UserController.login);
router.route("/reset-password").post(validate(schemas.resetSendPasswordLinkToMailValidations),UserController.sendPasswordLinkToEmail);
router.route("/reset-password/:id/:token").post(validate(schemas.resetPasswordValidations),UserController.resetPassword);
router.route("/:id").patch(verifyAccessToken,UserController.update);
router.route("/:id").delete(UserController.delete);
router.route("/me").get(verifyAccessToken,UserController.me);
router.route("/update-profile-image").post(verifyAccessToken,UserController.profileImageUpload);
router.route("/check-token").post(UserController.checkToken);
// router.route("/profile-image-delete").delete(verifyAccessToken,UserController.profileImageDelete);

module.exports = router;