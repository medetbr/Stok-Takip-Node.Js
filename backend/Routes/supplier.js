const express = require("express")
const SupplierController = require("../Controllers/Supplier");
const { verifyAccessToken } = require("../helpers/jwt");
const  validate  = require("../Middleware/validate");
const schemas = require("../validations/Supplier");

const router = express.Router();

router.route("/").post(verifyAccessToken,validate(schemas.createValidations),SupplierController.create);
router.route("/").get(verifyAccessToken,SupplierController.getList);
router.route("/:id").delete(verifyAccessToken,SupplierController.delete);
router.route("/:id").patch(verifyAccessToken,SupplierController.update);


module.exports = router;