const Role = require('../model/roleSchema');
const Permission = require('../model/permissionSchema');

// Permission Controller
const permissionController = {
    create: async (req, res) => {
        try {
            const { module, permission } = req.body;
            const per = new Permission({ module, permission });
            await per.save();
            res.status(201).json(per);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const permissions = await Permission.find();
            res.status(200).json(permissions);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
};

// Role Controller
const roleController = {
    create: async (req, res) => {
        try {
            const { name } = req.body;
            const role = new Role({ name });
            await role.save();
            res.status(201).json(role);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getRoles: async (req, res) => {
        try {
            const roles = await Role.find().populate('permissions');
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({
                message: 'Server error', error
            })
        }
    },

    addPermission: async (req, res) => {
        try {
            const { roleId, permissionId } = req.body;
            const role = await Role.findById(roleId);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            if (!role.permissions.includes(permissionId)) {
                role.permissions.push(permissionId);
                await role.save();
            }
            res.status(200).json(role);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getRoleWithPermissions: async (req, res) => {
        try {
            const role = await Role.findById(req.params.roleId).populate('permissions');
            console.log(role)
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    },


    updatePermissions: async (req, res) => {
        try {
            const { permissions } = req.body;
            const role = await Role.findByIdAndUpdate(req.params.roleId, { permissions }, { new: true }).populate('permissions');
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    },
    deleteRole: async (req, res) => {
        try {
            const role = await Role.findByIdAndDelete(req.params.roleId);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json({ message: 'Role deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
};


module.exports = { permissionController, roleController };
