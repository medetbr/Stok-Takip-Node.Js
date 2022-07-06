const express = require("express")
const AccountController = require("../Controllers/Account");
const { verifyAccessToken } = require("../helpers/jwt");
const  validate  = require("../Middleware/validate");
// const schemas = require("../validations/Supplier");

const router = express.Router();

router.route("/").post(verifyAccessToken,AccountController.create);
router.route("/").get(verifyAccessToken,AccountController.getList);
router.route("/:id").delete(verifyAccessToken,AccountController.delete);
router.route("/:id").get(verifyAccessToken,AccountController.getAccountDetail);
router.route("/:id").patch(verifyAccessToken,AccountController.update);


module.exports = router;