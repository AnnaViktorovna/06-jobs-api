const express = require("express");
const router = express.Router();

const {
    getAllServices,
    createService,
    updateService,
    deleteService,
    getService,
} = require("../controllers/services");

router.route("/").post(createService).get(getAllServices);
router
    .route("/:id")
    .get(getService)
    .patch(updateService)
    .delete(deleteService);

module.exports = router;