const express = require('express');
const router = express.Router();
const { permissionController, roleController } = require('../controllers/roleAndPermissionController');

// Permission routes
router.post('/create-permission', permissionController.create); // Create a new permission
router.get('/all-permissions', permissionController.getAll); // Get all permissions

// Role routes
router.post('/create-role', roleController.create); // Create a new role
router.get('/role-with-permission/:roleId', roleController.getRoleWithPermissions); // Get a role with its permissions
router.put('/update-role-permissions/:roleId/permissions', roleController.updatePermissions); // Update role permissions
router.post('/roles/add-permission', roleController.addPermission); // Add a permission to a role

module.exports = router;
