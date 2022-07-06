const express = require("express")
const ProductController = require("../Controllers/Product");
const { verifyAccessToken } = require("../helpers/jwt");
const  validate  = require("../Middleware/validate");
// const schemas = require("../validations/Supplier");

const router = express.Router();

router.route("/").post(verifyAccessToken,ProductController.create);
router.route("/").get(verifyAccessToken,ProductController.getList);
router.route("/:id").delete(verifyAccessToken,ProductController.delete);
router.route("/:id").patch(verifyAccessToken,ProductController.update);


module.exports = router;