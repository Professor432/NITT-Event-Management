const { Department } = require("../models/models");

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();

        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch departments",
            error: error.message
        });
    }
};


const getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);

        if (!department) {
            return res.status(404).json({
                message: "Department not found"
            });
        }

        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch department",
            error: error.message
        });
    }
};


const createDepartment = async (req, res) => {
    try {
        const department = await Department.create(req.body);

        res.status(201).json(department);
    } catch (error) {
        res.status(400).json({
            message: "Failed to create department",
            error: error.message
        });
    }
};


module.exports = {
    getDepartments,
    getDepartmentById,
    createDepartment
};