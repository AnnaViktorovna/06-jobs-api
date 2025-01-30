const express = require("express");
const router = express.Router();

const {
    getAllServices,
    getServiceByIdById,
    createService,
    updateService,
    deleteService,
} = require("../controllers/services");

router.route("/").post(createService).get(getAllServices);
router
    .route("/:id")
    .get(getServiceByIdById)
    .patch(updateService)
    .delete(deleteService);

module.exports = router;