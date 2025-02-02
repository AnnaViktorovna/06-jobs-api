const express = require("express");
const router = express.Router();

const {
    getAllServices,
    createService,
    updateService,
    deleteService,
    getService,
} = require("../controllers/services");

// router.route("/").post(createService).get(getAllServices);
router.route("/:id").get((req, res) => {
    console.log("Requested ID:", req.params.id);
    getService(req, res);
}).patch(updateService).delete(deleteService);

module.exports = router;