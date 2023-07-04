const { validationMiddleware } = require("../../../../application/middlewares/validation");
const { Router } = require("express");
const { DanfeController } = require("../controllers/danfe.controller");
const { DacteController } = require("../controllers/dacte.controller");

const router = Router();

const danfeController = new DanfeController();
const dacteController = new DacteController();

router.use("/api/danfe", danfeController.handle);
router.use("/api/dacte", dacteController.handle);

module.exports = { router };
