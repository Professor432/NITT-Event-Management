const express = require("express");

const router = express.Router();

const {
    getDepartments,
    getDepartmentById,
    createDepartment
} = require("../controllers/departmentController");

router.get("/", getDepartments);
router.get("/:id", getDepartmentById);
router.post("/", createDepartment);

module.exports = router;