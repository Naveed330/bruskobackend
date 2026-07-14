import Role from "../../Modals/roleModal/RoleModal.js";

export const createRole = async (req, res) => {
    try {
        const { role } = req.body;

        if (!role || role.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Role is required.",
            });
        }

        const existingRole = await Role.findOne({
            role: role.trim(),
        });

        if (existingRole) {
            return res.status(409).json({
                success: false,
                message: "Role already exists.",
            });
        }

        const newRole = await Role.create({
            role: role.trim(),
        });

        return res.status(201).json({
            success: true,
            message: "Role created successfully.",
            data: newRole,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Roles
export const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find().populate("role").sort({ updatedAt: -1 });

        return res.status(200).json({
            success: true,
            totalRoles: roles.length,
            data: roles,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Delete Modal
export const deleteRole = async (req, res) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);

        if (!deletedRole) {
            return res.status(404).json({
                success: false,
                message: "Role not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Role deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


//  Update Role

export const updateRole = async (req, res) => {
    try {
        const { role } = req.body;

        if (!role || role.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Role is required.",
            });
        }

        const existingRole = await Role.findOne({
            role: role.trim(),
            _id: { $ne: req.params.id },
        });

        if (existingRole) {
            return res.status(409).json({
                success: false,
                message: "Role already exists.",
            });
        }

        const updatedRole = await Role.findByIdAndUpdate(
            req.params.id,
            {
                role: role.trim(),
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedRole) {
            return res.status(404).json({
                success: false,
                message: "Role not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Role updated successfully.",
            data: updatedRole,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};