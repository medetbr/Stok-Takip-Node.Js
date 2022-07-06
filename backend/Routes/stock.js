const express = require("express")
const StockController = require("../Controllers/Stock");
const { verifyAccessToken } = require("../helpers/jwt");
const  validate  = require("../Middleware/validate");
// const schemas = require("../validations/Supplier");

const router = express.Router();

router.route("/").post(verifyAccessToken,StockController.create);
router.route("/:id").get(verifyAccessToken,StockController.getList);
router.route("/:id").delete(verifyAccessToken,StockController.delete);
router.route("/:id").patch(verifyAccessToken,StockController.update);


module.exports = router;